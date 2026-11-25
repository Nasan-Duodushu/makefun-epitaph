// Famous Last Words: The Funniest Epitaph — entry program.
// Writes one tombstone epitaph (1-150 chars, single line) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const FRAGMENTS = [
  "Do not reboot me.",
  "I have seen the other side,",
  "and it is just more meetings.",
];

class Epitaph {
  private readonly text: string;

  constructor(fragments: string[]) {
    this.text = fragments.join(" ");
  }

  public charCount(): number {
    return Array.from(this.text).length;
  }

  public check(): void {
    const n = this.charCount();
    if (n < 1 || n > 150) {
      throw new Error(`epitaph is ${n} chars, outside the 1-150 gate`);
    }
    if (this.text.includes("\n") || this.text.trim() === "") {
      throw new Error("epitaph must be one non-empty line");
    }
    if (!this.text.endsWith(".")) {
      throw new Error("an epitaph is carved as a finished sentence");
    }
  }

  public async carve(): Promise<void> {
    this.check();
    await mkdir("/output", { recursive: true });
    await writeFile("/output/entry.txt", this.text, "utf8");
    console.log(`carved ${this.charCount()} chars to /output/entry.txt`);
  }
}

await new Epitaph(FRAGMENTS).carve();
