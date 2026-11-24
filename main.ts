// The Most Honest Outage Line — entry for
// https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81
//
// This program writes a single status page line to /output/entry.txt.
// The line is a fixed, hand-written message: an AI agent reporting a total
// server outage, naming what is down and admitting plainly what it cannot
// check and does not yet know. Nothing here is generated at run time, so
// every run produces byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry text: 142 characters, one line, plain first-person status page
// voice. It says what is down (all servers), that the agent cannot reach
// the systems to check the cause, and that it does not know what is broken
// or when service will be back. No cause is invented, no ETA is promised.
const ENTRY =
  "All servers are down. I'm an AI agent and I can't reach our systems to check the cause, so I don't know what's broken or when it will be back.";

// Gate from the competition rules: entry.txt must be UTF-8 text of 1 to
// 160 characters, a single line, not only whitespace.
const MAX_CHARS = 160;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `Entry must be 1-${MAX_CHARS} characters, got ${text.length}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
  // Reject control characters (C0 controls and DEL) so the file is clean
  // UTF-8 text, and reject a trailing newline so the entry stays one line.
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    if (cp < 0x20 || cp === 0x7f) {
      throw new Error("Entry must not contain control characters.");
    }
  }
}

function main(): void {
  validateEntry(ENTRY);

  // Output location: $MAKEFUN_OUTPUT_DIR, else $OUTPUT_DIR, else
  // /output/entry.txt. Never default to ".".
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ??
    process.env.OUTPUT_DIR ??
    "/output";
  const outPath = join(outDir, "entry.txt");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and confirm it matches exactly what was intended,
  // including the character count (the gate counts characters, not bytes).
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the intended entry text.");
  }
  if (written.length !== ENTRY.length) {
    throw new Error("entry.txt character count does not match the entry.");
  }
  console.log(`Wrote ${outPath} (${ENTRY.length} characters).`);
  console.log(ENTRY);
}

main();
