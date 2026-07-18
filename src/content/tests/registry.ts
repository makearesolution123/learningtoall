import type { PracticeTest } from "./types";

/**
 * Auto-discovers every practice test file in this folder.
 *
 * To add a new test: create a new file `src/content/tests/<slug>.ts` that
 * `export default`s a PracticeTest object. It will appear automatically on
 * the Practice Tests page (assuming `published: true`).
 */
const modules = import.meta.glob<{ default: PracticeTest }>("./*.ts", {
  eager: true,
});

const all: PracticeTest[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("/types.ts") && !path.endsWith("/registry.ts"))
  .map(([, mod]) => mod.default)
  .filter((t): t is PracticeTest => !!t && typeof t.id === "string");

// Validate uniqueness at load time.
const seen = new Set<string>();
for (const t of all) {
  if (seen.has(t.id)) {
    throw new Error(`Duplicate practice test id: "${t.id}"`);
  }
  seen.add(t.id);
}

const byId = new Map(all.map((t) => [t.id, t]));

export function getAllTests(): PracticeTest[] {
  return [...all].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getPublishedTests(): PracticeTest[] {
  return getAllTests().filter((t) => t.published);
}

export function getTestById(id: string): PracticeTest | undefined {
  return byId.get(id);
}
