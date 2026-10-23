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
  getAnimeNeighbors,
  neighborhoods,
  type AnimeSeries,
} from "@/data/anime";
import styles from "./anime.module.css";

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function AnimeAtlas({ series }: { series: AnimeSeries[] }) {
  const entries = useMemo(
    () => series.flatMap((item) => item.entries),
    [series]
  );
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
  const mapWidth = smallScreen ? 600 : 1000;
  const mapHeight = smallScreen ? 800 : 650;
  const point = (item: { x: number; y: number }) => ({
    x: smallScreen ? item.x * 0.6 : item.x,
    y: smallScreen ? 70 + item.y : item.y,
  });
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
  const scores = new Map(
    visible.map((item) => [
      item.id,
      Math.max(...item.entries.map((entry) => entry.score)),
    ])
  );
  const landmarks: {
    id: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  }[] = [];
  for (const item of [
    ...(selected ? [selected] : []),
    ...visible
      .filter((item) => item.id !== selected?.id && scores.get(item.id)! >= 90)
      .sort((a, b) => scores.get(b.id)! - scores.get(a.id)! || a.id - b.id),
  ]) {
    if (landmarks.length >= (smallScreen ? 3 : 6)) break;
    const { x, y } = point(item);
    const width =
      Math.min(item.entries[0].title.length, 25) * (smallScreen ? 11 : 8);
    const left = x > mapWidth * 0.75 ? x - 14 - width : x + 14;
    const box = {
      id: item.id,
      left,
      right: left + width,
      top: y - 16,
      bottom: y + 10,
    };
    if (
      item.id === selected?.id ||
      (box.left >= 8 &&
        box.right <= mapWidth - 8 &&
        landmarks.every(
          (other) =>
            box.right + 12 < other.left ||
            box.left - 12 > other.right ||
            box.bottom + 8 < other.top ||
            box.top - 8 > other.bottom
        ) &&
        visible.every((other) => {
          if (other.id === item.id) return true;
          const dot = point(other);
          return (
            dot.x < box.left - 12 ||
            dot.x > box.right + 12 ||
            dot.y < box.top - 12 ||
            dot.y > box.bottom + 12
          );
        }))
    )
      landmarks.push(box);
  }
  const matchId = selected?.id;
  const matches = useMemo(
    () => (matchId !== undefined ? getAnimeNeighbors(series, matchId) : []),
    [series, matchId]
  );
  const nearby = matches
    .map((neighbor) => ({
      ...neighbor,
      series: visible.find((item) => item.id === neighbor.id),
    }))
    .filter((neighbor) => neighbor.series !== undefined)
    .slice(0, 5);

  function selectSeries(id: number, fromList = false) {
    setSelectedId(id);
    if (fromList || smallScreen)
      requestAnimationFrame(() => detail.current?.focus());
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
          <h1 className={styles.title}>
            Anime <span>Atlas</span>
            <b aria-hidden="true">✳</b>
          </h1>
          <p className={styles.subtitle}>What I’ve been watching.</p>
          <p className={styles.description}>
            My anime list, mapped by genre and theme. Pick a show to see my
            score and similar titles.
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
            <option value="ALL">Full list</option>
            <option value="STARTED">Watch history</option>
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
          aria-label={view === "map" ? "Anime taste map" : "Anime list"}
        >
          {visible.length === 0 ? (
            <div className={styles.empty}>
              <span aria-hidden="true">✳</span>
              <h2>No matches.</h2>
              <p>Try a different title, status, or genre.</p>
              <button type="button" onClick={resetFilters}>
                Show full list
              </button>
            </div>
          ) : view === "map" ? (
            <>
              <div className={styles.mapHeading}>
                <span className={styles.eyebrow}>My anime</span>
                <span>Drag to move · click a show</span>
              </div>
              <div
                className={styles.colorKey}
                role="group"
                aria-label="Genre color families"
              >
                {neighborhoods.map((region) => (
                  <span key={region.name} className={styles[region.color]}>
                    ● {region.name}
                  </span>
                ))}
              </div>
              <svg
                className={styles.map}
                viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                aria-label="Series positioned by shared genres and spoiler-free tags. Select a series to reveal related titles. Use List view for a text alternative."
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
                  {selected &&
                    nearby.map((neighbor) => {
                      const start = point(selected);
                      const end = point(neighbor.series!);
                      return (
                        <line
                          key={neighbor.id}
                          className={styles.connection}
                          x1={start.x}
                          y1={start.y}
                          x2={end.x}
                          y2={end.y}
                        />
                      );
                    })}
                  {[...visible]
                    .sort(
                      (a, b) =>
                        Number(a.id === selected?.id) -
                        Number(b.id === selected?.id)
                    )
                    .map((item) => {
                      const active = selected?.id === item.id;
                      const { x, y } = point(item);
                      const landmark = landmarks.some(
                        (other) => other.id === item.id
                      );
                      const planned = item.entries.every(
                        (entry) => entry.status === "PLANNING"
                      );
                      const score = scores.get(item.id)!;
                      const highRated = score >= 90;
                      const label = item.entries[0].title;
                      return (
                        <g
                          key={item.id}
                          role="button"
                          tabIndex={0}
                          aria-label={`Open ${item.title}, ${item.entries.length} ${item.entries.length === 1 ? "entry" : "entries"}${highRated ? `, ${item.entries.length > 1 ? "highest score" : "my score"} ${score}/100` : ""}`}
                          aria-pressed={active}
                          className={`${styles.node} ${styles[neighborhoods[item.neighborhood].color]} ${active ? styles.activeNode : ""} ${highRated ? styles.highRatedNode : ""} ${landmark ? styles.landmarkNode : ""}`}
                          onClick={() => selectSeries(item.id)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              selectSeries(item.id);
                            }
                          }}
                        >
                          <title>
                            {`${label} · ${item.entries.length} ${item.entries.length === 1 ? "entry" : "linked entries"}${score > 0 ? ` · ${item.entries.length > 1 ? "Highest score" : "My score"} ${score}/100` : ""}`}
                          </title>
                          <circle cx={x} cy={y} r="16" fill="transparent" />
                          {(active || highRated) && (
                            <circle
                              className={styles.halo}
                              cx={x}
                              cy={y}
                              r={active ? 17 : 13}
                            />
                          )}
                          <circle
                            className={`${styles.dot} ${planned ? styles.planned : ""}`}
                            cx={x}
                            cy={y}
                            r={
                              active ? 8 : 4 + Math.min(item.entries.length, 6)
                            }
                          />
                          <text
                            className={styles.nodeLabel}
                            x={x + (x > mapWidth * 0.75 ? -14 : 14)}
                            y={y + 4}
                            textAnchor={x > mapWidth * 0.75 ? "end" : "start"}
                          >
                            {label.length > 25
                              ? `${label.slice(0, 24)}…`
                              : label}
                          </text>
                        </g>
                      );
                    })}
                </g>
              </svg>
              <div className={styles.mapBottom}>
                <div className={styles.legend}>
                  <span>
                    <i /> Watched / watching
                  </span>
                  <span>
                    <i className={styles.hollow} /> Planned
                  </span>
                  <span>
                    <i className={styles.highRated} /> My score 90+
                  </span>
                  <span>One dot = one series</span>
                </div>
                <div className={styles.zoom}>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    disabled={camera.zoom <= 1}
                    onClick={() =>
                      setCamera((current) => ({
                        ...current,
                        zoom: Math.max(1, current.zoom - 0.5),
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
                <span className={styles.eyebrow}>My anime</span>
                <span>Pick a show for details</span>
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
                          {item.entries.length === 1 ? "title" : "titles"} ·{" "}
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
              {nearby.length > 0 && (
                <div className={styles.nearby}>
                  <h3>Similar anime</h3>
                  <p>From my list, with shared genres and themes.</p>
                  {nearby.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      type="button"
                      onClick={() => selectSeries(neighbor.id)}
                    >
                      <strong>{neighbor.series!.title} ↗</strong>
                      <span>{neighbor.shared.slice(0, 4).join(" · ")}</span>
                    </button>
                  ))}
                </div>
              )}
              {selected.entries.length > 1 && (
                <div className={styles.seasons}>
                  <h3>
                    In this series <span>{selected.entries.length}</span>
                  </h3>
                  <p>Seasons and sequels that match the current filters.</p>
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
            <p>Pick a show to see the details.</p>
          )}
        </section>
      </div>

      <footer className={styles.notes}>
        <div>
          <span className={styles.eyebrow}>About the map</span>
          <p>
            Shows with similar genres and themes sit near each other. Select one
            to see up to five connections. Colors group genres; bigger dots mean
            more seasons and sequels, not higher scores.
          </p>
        </div>
        <p>
          From my public{" "}
          <a
            href="https://anilist.co/user/InfernapeXavier/"
            target="_blank"
            rel="noreferrer"
          >
            AniList profile ↗
          </a>
          . Updated hourly.
          <br />
          Watch history excludes my plan-to-watch list. Adult titles aren’t
          shown.
        </p>
      </footer>
    </div>
  );
}
