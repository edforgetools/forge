#!/usr/bin/env bash
set -euo pipefail

# Requires pnpm >= 8

echo "Updating package.json scripts with pnpm pkg set..."

pnpm pkg set "scripts.prepare=husky"
pnpm pkg set "scripts.lint=eslint 'src/**/*.{ts,tsx,js,jsx}'"
pnpm pkg set "scripts.test:unit=vitest run"
pnpm pkg set "scripts.test:e2e=playwright test"
pnpm pkg set "scripts.build=vite build"
pnpm pkg set "scripts.format:check=prettier -c ."

echo "Done. Current scripts:"
node -e "console.log(JSON.stringify(require('./package.json').scripts, null, 2))"