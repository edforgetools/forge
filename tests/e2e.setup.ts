export default async function globalSetup() {
  const sym = Symbol.for('$$jest-matchers-object')
  try {
    // @ts-expect-error expect provided by Playwright
    if (globalThis.expect && globalThis.expect[sym]) {
      // @ts-expect-error expect provided by Playwright
      delete globalThis.expect[sym]
    }
  } catch {}
}