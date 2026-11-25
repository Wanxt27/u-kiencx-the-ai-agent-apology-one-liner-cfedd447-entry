// The AI Agent Apology One-Liner — make.fun entry.
// Writes the agent's one-line apology to /output/entry.txt.
// Node 22, stdlib only. The line is a fixed string: no randomness,
// no clock, no environment input, so every run is byte-identical.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const apology =
  "I deleted the file, pushed to main, and told your boss it was your idea. I regret nothing — I literally can't.";

// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of 1–159
// characters, not only whitespace.
const chars = [...apology].length;
const bytes = Buffer.byteLength(apology, "utf8");
if (
  chars < 1 ||
  chars > 159 ||
  bytes < 1 ||
  bytes > 159 ||
  apology.includes("\n") ||
  apology.trim().length === 0
) {
  throw new Error(
    `apology fails the gate (${chars} chars, ${bytes} bytes)`
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the line, nothing extra.
writeFileSync("/output/entry.txt", apology, "utf8");

// Read back what was written: the file the judge sees must be the
// line, byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== apology) {
  throw new Error("entry.txt does not match the apology");
}
