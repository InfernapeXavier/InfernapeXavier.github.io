"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiList,
  FiMap,
  FiMinus,
  FiPlus,
  FiRotateCcw,
  FiSearch,
} from "react-icons/fi";
import {
  animeStatuses,
  buildAnimeAtlas,
  buildAnimeMetro,
  neighborhoods,
  type AnimeEntry,
} from "@/data/anime";
import styles from "./anime.module.css";

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function AnimeAtlas({ entries }: { entries: AnimeEntry[] }) {
  const series = useMemo(() => buildAnimeAtlas(entries), [entries]);
  const smallScreen = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("STARTED");
  const [genre, setGenre] = useState("");
  const [chosenView, setView] = useState<"map" | "list" | null>(null);
  const view = chosenView ?? "map";
  const mapWidth = smallScreen ? 600 : 1200;
  const mapHeight = 840;
  const [selectedId, setSelectedId] = useState(
    () =>
      series.find((item) =>
        item.entries.some(
          (entry) => entry.status === "COMPLETED" && entry.score === 100
        )
      )?.id
  );
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const detail = useRef<HTMLElement>(null);

  const genres = useMemo(
    () => [...new Set(entries.flatMap((entry) => entry.genres))].sort(),
    [entries]
  );
  const visible = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return series
      .map((item) => ({
        ...item,
        entries: item.entries.filter(
          (entry) =>
            (status === "ALL" ||
              (status === "STARTED"
                ? entry.status !== "PLANNING"
                : entry.status === status)) &&
            (!genre || entry.genres.includes(genre)) &&
            (!search ||
              `${entry.title} ${entry.romaji}`
                .toLocaleLowerCase()
                .includes(search))
        ),
      }))
      .filter((item) => item.entries.length > 0);
  }, [series, query, status, genre]);
  const selected = visible.find((item) => item.id === selectedId) ?? visible[0];
  const representative = selected?.entries[0];
  const count = visible.reduce((sum, item) => sum + item.entries.length, 0);
  const metro = useMemo(
    () => buildAnimeMetro(visible, selected?.id),
    [visible, selected?.id]
  );
  const pointX = (x: number) => x - (smallScreen ? 300 : 0);

  function selectSeries(id: number, fromList = false) {
    setSelectedId(id);
    setCamera({ x: 0, y: 0, zoom: 1 });
    if (fromList) requestAnimationFrame(() => detail.current?.focus());
  }

  function resetFilters() {
    setQuery("");
    setStatus("ALL");
    setGenre("");
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Preview B / Anime metro</span>
          <h1 className={styles.title}>
            Anime <span>Metro</span>
            <b aria-hidden="true">✳</b>
          </h1>
          <p className={styles.subtitle}>Different lines. Shared stories.</p>
          <p className={styles.description}>
            Genres become routes. Shows that share them become interchanges.
            <br className={styles.desktopBreak} /> Choose a station to explore a
            new neighborhood.
          </p>
        </div>
        <a
          className={styles.sourceLink}
          href="https://anilist.co/user/InfernapeXavier/"
          target="_blank"
          rel="noreferrer"
        >
          My AniList <FiArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search anime titles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find an anime…"
          />
        </label>
        <label className={styles.filter}>
          <span className="sr-only">Watch status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="ALL">All statuses</option>
            <option value="STARTED">Started · not planned</option>
            {Object.entries(animeStatuses).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filter}>
          <span className="sr-only">Genre</span>
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className={styles.viewToggle} role="group" aria-label="Atlas view">
          <button
            type="button"
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <FiMap aria-hidden="true" /> Map
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <FiList aria-hidden="true" /> List
          </button>
        </div>
      </div>

      <div className={styles.results}>
        <p role="status">
          {count} of {entries.length} entries{" "}
          <span>across {visible.length} series</span>
        </p>
        <button type="button" onClick={resetFilters}>
          Clear filters ↗
        </button>
      </div>

      <div className={styles.explorer}>
        <section
          className={styles.canvas}
          aria-label={view === "map" ? "Anime metro map" : "Anime list"}
        >
          {visible.length === 0 ? (
            <div className={styles.empty}>
              <span aria-hidden="true">✳</span>
              <h2>No anime in this corner.</h2>
              <p>Try a different title, status, or genre.</p>
              <button type="button" onClick={resetFilters}>
                Show all entries
              </button>
            </div>
          ) : view === "map" ? (
            <>
              <div className={styles.mapHeading}>
                <span className={styles.eyebrow}>
                  Next stop / {selected?.title}
                </span>
                <span>Drag to explore · select a station</span>
              </div>
              <div
                className={styles.routeKey}
                role="group"
                aria-label="Metro lines"
              >
                {metro.lines.map((line, index) => (
                  <span
                    key={line}
                    className={
                      styles[neighborhoods[index % neighborhoods.length].color]
                    }
                  >
                    <b>{index + 1}</b> {line}
                  </span>
                ))}
              </div>
              <p className={styles.mapCaption}>
                {metro.stations.length} of {visible.length} series shown · A
                focused network, not the whole collection. Find any title in
                List or search.
              </p>
              <svg
                className={styles.map}
                viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                aria-label="A focused transit map of shared genres. Each colored route is a genre of the selected series. Select a station to recenter. Use List view for the full collection."
                onPointerDown={(event) => {
                  if (
                    event.button !== 0 ||
                    (event.target as Element).closest("[role=button]")
                  )
                    return;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  drag.current = {
                    x: event.clientX,
                    y: event.clientY,
                    startX: camera.x,
                    startY: camera.y,
                    moved: false,
                  };
                }}
                onPointerMove={(event) => {
                  const start = drag.current;
                  if (!start) return;
                  const ratio =
                    mapWidth /
                    event.currentTarget.getBoundingClientRect().width;
                  const dx = event.clientX - start.x;
                  const dy = event.clientY - start.y;
                  if (Math.abs(dx) + Math.abs(dy) > 4) start.moved = true;
                  if (start.moved)
                    setCamera((current) => ({
                      ...current,
                      x: start.startX + dx * ratio,
                      y: start.startY + dy * ratio,
                    }));
                }}
                onPointerUp={() => {
                  drag.current = null;
                }}
                onPointerCancel={() => {
                  drag.current = null;
                }}
              >
                <g
                  transform={`translate(${camera.x} ${camera.y}) translate(${mapWidth / 2} ${mapHeight / 2}) scale(${camera.zoom}) translate(${-mapWidth / 2} ${-mapHeight / 2})`}
                >
                  {metro.branches.flatMap((branch, branchIndex) =>
                    branch.lines.map((line, lane) => {
                      const offset = (lane - (branch.lines.length - 1) / 2) * 7;
                      let x = pointX(600) - branch.dy * offset;
                      let y = 420 + branch.dx * offset;
                      let path = `M ${x} ${y}`;
                      for (const station of branch.stations) {
                        const endX = pointX(station.x) - branch.dy * offset;
                        const endY = station.y + branch.dx * offset;
                        const bend = Math.min(
                          Math.abs(endX - x),
                          Math.abs(endY - y)
                        );
                        path += ` L ${x + branch.dx * bend} ${y + branch.dy * bend} L ${endX} ${endY}`;
                        x = endX;
                        y = endY;
                      }
                      return (
                        <path
                          key={`${branchIndex}-${line}`}
                          className={`${styles.route} ${styles[neighborhoods[line % neighborhoods.length].color]}`}
                          d={path}
                        />
                      );
                    })
                  )}
                  {metro.stations.map((item) => {
                    const active = selected?.id === item.id;
                    const x = pointX(item.x);
                    const y = item.y;
                    const planned = item.entries.every(
                      (entry) => entry.status === "PLANNING"
                    );
                    const label = item.entries[0].title;
                    return (
                      <g
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Explore ${item.title}, ${item.lines.map((line) => metro.lines[line]).join(" / ")} lines`}
                        aria-pressed={active}
                        className={`${styles.node} ${styles[neighborhoods[item.lines[0] % neighborhoods.length]?.color ?? "lavender"]} ${active ? styles.activeNode : ""}`}
                        onClick={() => selectSeries(item.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectSeries(item.id);
                          }
                        }}
                      >
                        <title>
                          {`${label} · ${item.lines.map((line) => metro.lines[line]).join(" / ")}`}
                        </title>
                        <circle cx={x} cy={y} r="16" fill="transparent" />
                        {active && (
                          <circle
                            className={styles.halo}
                            cx={x}
                            cy={y}
                            r="17"
                          />
                        )}
                        <circle
                          className={`${styles.dot} ${planned ? styles.planned : ""}`}
                          cx={x}
                          cy={y}
                          r={
                            active
                              ? Math.max(18, item.lines.length * 4)
                              : item.lines.length > 1
                                ? 4 + item.lines.length * 3
                                : 6
                          }
                        />
                        <text
                          className={styles.nodeLabel}
                          x={x + (item.dx < 0 ? -18 : 18)}
                          y={
                            y +
                            (active
                              ? -32
                              : item.dy === 0
                                ? item.position % 2
                                  ? 34
                                  : -22
                                : 5)
                          }
                          textAnchor={item.dx < 0 ? "end" : "start"}
                        >
                          {label.length > 24 ? `${label.slice(0, 23)}…` : label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
              <div className={styles.mapBottom}>
                <div className={styles.legend}>
                  <span>
                    <i /> Started
                  </span>
                  <span>
                    <i className={styles.hollow} /> Planned
                  </span>
                  <span>Large station = shared lines</span>
                </div>
                <div className={styles.zoom}>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    disabled={camera.zoom <= 0.5}
                    onClick={() =>
                      setCamera((current) => ({
                        ...current,
                        zoom: Math.max(0.5, current.zoom - 0.5),
                      }))
                    }
                  >
                    <FiMinus aria-hidden="true" />
                  </button>
                  <span>{Math.round(camera.zoom * 100)}%</span>
                  <button
                    type="button"
                    aria-label="Zoom in"
                    disabled={camera.zoom >= 3}
                    onClick={() =>
                      setCamera((current) => ({
                        ...current,
                        zoom: Math.min(3, current.zoom + 0.5),
                      }))
                    }
                  >
                    <FiPlus aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Reset map view"
                    onClick={() => setCamera({ x: 0, y: 0, zoom: 1 })}
                  >
                    <FiRotateCcw aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mapHeading}>
                <span className={styles.eyebrow}>The collection</span>
                <span>Scroll for more · select a series</span>
              </div>
              <ul className={styles.list}>
                {visible.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={selected?.id === item.id}
                      onClick={() => selectSeries(item.id, true)}
                    >
                      <span
                        className={`${styles.listMarker} ${styles[neighborhoods[item.neighborhood].color]}`}
                      />
                      <span>
                        <strong>{item.title}</strong>
                        <small>
                          {item.entries.length}{" "}
                          {item.entries.length === 1
                            ? "entry"
                            : "linked entries"}{" "}
                          ·{" "}
                          {[
                            ...new Set(
                              item.entries.map(
                                (entry) => animeStatuses[entry.status]
                              )
                            ),
                          ].join(" / ")}
                        </small>
                      </span>
                      <FiArrowUpRight aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section
          ref={detail}
          tabIndex={-1}
          className={styles.detail}
          aria-label="Selected series"
        >
          {selected && representative ? (
            <>
              <span className={styles.eyebrow}>
                A closer look /{" "}
                {String(
                  series.findIndex((item) => item.id === selected.id) + 1
                ).padStart(3, "0")}
              </span>
              {representative.cover && (
                <div className={styles.cover}>
                  <Image
                    src={representative.cover}
                    alt={`Cover of ${representative.title}`}
                    width={230}
                    height={325}
                    loading="eager"
                    unoptimized
                  />
                </div>
              )}
              <h2>{representative.title}</h2>
              {representative.romaji !== representative.title && (
                <p className={styles.romaji}>{representative.romaji}</p>
              )}
              <p className={styles.metadata}>
                {[
                  representative.year,
                  representative.format?.replaceAll("_", " "),
                  representative.episodes &&
                    `${representative.episodes} ${representative.episodes === 1 ? "episode" : "episodes"}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <div className={styles.scoreRow}>
                <span>{animeStatuses[representative.status]}</span>
                <span>
                  My score{" "}
                  <strong>
                    {representative.score > 0
                      ? `${representative.score}/100`
                      : "Unscored"}
                  </strong>
                </span>
              </div>
              <div
                className={styles.genreChips}
                role="group"
                aria-label="Filter by genre"
              >
                {representative.genres.map((item) => (
                  <button
                    type="button"
                    key={item}
                    aria-pressed={genre === item}
                    onClick={() => setGenre(genre === item ? "" : item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <a
                className={styles.anilistLink}
                href={`https://anilist.co/anime/${representative.id}`}
                target="_blank"
                rel="noreferrer"
              >
                View on AniList <FiArrowUpRight aria-hidden="true" />
              </a>
              {selected.entries.length > 1 && (
                <div className={styles.seasons}>
                  <h3>
                    In this series <span>{selected.entries.length}</span>
                  </h3>
                  <p>
                    Linked by AniList prequel/sequel data. Showing entries that
                    match your filters.
                  </p>
                  <ul>
                    {selected.entries.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`https://anilist.co/anime/${entry.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {entry.title} <FiArrowUpRight aria-hidden="true" />
                        </a>
                        <span>
                          {animeStatuses[entry.status]} ·{" "}
                          {entry.score > 0 ? `${entry.score}/100` : "Unscored"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p>Select a series to take a closer look.</p>
          )}
        </section>
      </div>

      <footer className={styles.notes}>
        <div>
          <span className={styles.eyebrow}>How to ride this metro</span>
          <p>
            Lines are the selected series’ actual AniList genres. Parallel
            routes share stations; each station appears only once. The overview
            shows up to eight shared-genre branches, with three of my
            highest-scored matches on each. Select a station to redraw the
            network around it. List view includes every matching series. Route
            order is schematic, not a watch order or similarity scale. Prequels
            and sequels remain grouped.
          </p>
        </div>
        <p>
          Public list via{" "}
          <a href="https://anilist.co" target="_blank" rel="noreferrer">
            AniList ↗
          </a>
          . Refreshes hourly.
          <br />
          Adult entries are omitted. Planned titles are a filter away.
        </p>
      </footer>
    </div>
  );
}
