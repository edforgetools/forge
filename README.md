# Forge — meta docs

This repo holds docs and links only. App code lives in two repos.

## Live
- Frontend live: https://forge-frontend-one.vercel.app
- Backend health: https://forge-server-1c9e.onrender.com/api/health

## Repos
- Frontend: `edforgetools/forge-frontend`
  - Dev: `yarn && yarn dev`
  - Env: `VITE_API_BASE=https://<your-render>.onrender.com`
  - Build: `yarn build` → `dist/`
- Backend: `edforgetools/forge-server`
  - Dev: `yarn && yarn dev`
  - Env (local): `PORT=8787`, `MOCK_OPENAI=1`
  - Build/Start: `yarn build && yarn start`

## Deploy
- Render (backend):
  - Build: `yarn build`
  - Start: `yarn start`
  - Env: `PORT=10000`, `MOCK_OPENAI=1`, `FRONTEND_ORIGIN=https://<your-vercel>.vercel.app`
- Vercel (frontend):
  - Framework: Vite
  - Output dir: `dist`
  - Env: `VITE_API_BASE=https://<your-render>.onrender.com`

## Switch to REAL mode (later)
1. Render → set `OPENAI_API_KEY` and `MOCK_OPENAI=0`.
2. Redeploy backend.
3. `GET /api/health` returns `"mock": false`.

## Tags
- Frontend: `v1-mock`
- Backend: `v1-mock`

## QA
- Upload small MP4 → Transcribe → Generate → Download.
- Non-video → 415 error.
- Refresh → fields persist.
- Zip has `transcript.txt`, `tweet.txt`, `instagram.txt`.
