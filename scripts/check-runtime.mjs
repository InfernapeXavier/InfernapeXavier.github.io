import { spawnSync } from "node:child_process";

// Node's security releases backport the Brotli fix without changing its version string.
const [major, minor, patch] = process.versions.node.split(".").map(Number);
const minimum = { 24: [22, 1], 26: [12, 1] }[major];
if (
  !minimum ||
  minor < minimum[0] ||
  (minor === minimum[0] && patch < minimum[1])
) {
  throw new Error(
    "CVE-2026-111497: use Node.js 24.22.1+ (24.x) or 26.12.1+ (26.x)."
  );
}

if (process.argv.includes("--bun")) {
  const result = spawnSync("bun", ["--version"], { encoding: "utf8" });
  const version = result.stdout?.trim();
  const parts = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(version ?? "");
  if (
    result.status !== 0 ||
    !parts ||
    (Number(parts[1]) === 1 &&
      (Number(parts[2]) < 4 ||
        (Number(parts[2]) === 4 && Number(parts[3]) < 4))) ||
    Number(parts[1]) < 1
  ) {
    throw new Error("CVE-2026-111497: install Bun 1.4.4 or newer.");
  }
}

process.stdout.write(
  `Runtime security check passed: Node.js ${process.versions.node}\n`
);
