# Forge — Master & Progress (pinned)  
_Last updated: 2025-09-26 (AEST)_

## 0) TL;DR
- **Live app (MOCK)**: https://forge-frontend-one.vercel.app  
- **Backend health**: https://forge-server-1c9e.onrender.com/api/health → `{"ok":true,"mock":true}`  
- **Repos**: meta docs → `edforgetools/forge`, frontend → `edforgetools/forge-frontend`, backend → `edforgetools/forge-server`  
- **State**: v1 shipped (MOCK). Deployed. Analytics enabled. Thumbnail tool added.
- **Next**: harden, mobile QA, REAL mode wiring (when ready to pay).

---

## 1) Architecture
- **Frontend**: Vite + React + Tailwind. Deployed on **Vercel**.  
  - Root `index.html`, root `vite.config.ts` with `@` → `src` alias.  
  - Env: `VITE_API_BASE` points to Render backend URL.
- **Backend**: Express (TypeScript) on **Render**.  
  - Endpoints: `/api/health`, `/api/transcribe`, `/api/captions`, `/api/exportZip`.  
  - **MOCK mode** default (`MOCK_OPENAI=1`) returns deterministic strings.
- **Meta repo**: docs-only. No CI. No app builds.

---

## 2) Repos and URLs
- **Meta (docs)**: `edforgetools/forge` → _docs + README only_.  
- **Frontend**: `edforgetools/forge-frontend` → Vercel project (**forge-frontend-one**).  
  - Production URL: **https://forge-frontend-one.vercel.app**
- **Backend**: `edforgetools/forge-server` → Render service (**free tier**).  
  - URL: **https://forge-server-1c9e.onrender.com**
- **Domains**: keep a single public URL. `forge-ruddy.vercel.app` can be an alias/redirect or removed later.

---

## 3) Environment & Deploy
### Backend (Render)
- **Environment Group**: `forge-prod`  
- **Vars**:  
  - `PORT=10000` (Render)  
  - `MOCK_OPENAI=1`  
  - `FRONTEND_ORIGIN=https://forge-frontend-one.vercel.app`  
  - _Later_: `OPENAI_API_KEY=<key>` (keep MOCK until REAL)  
- **Build/Start**: `yarn build` → `yarn start`  
- **Security**: CORS allowlist via `FRONTEND_ORIGIN`; rate limit (60/min).  
- **Health**: `/api/health` → `{ "ok": true, "mock": true|false }`

### Frontend (Vercel)
- **Framework**: Vite. **Output**: `dist/`  
- **Env**: `VITE_API_BASE=https://forge-server-1c9e.onrender.com` (set for **Production** and **Preview**)  
- **Analytics**: Web Analytics + Speed Insights script tags in `index.html`.

### Meta repo
- GitHub Actions **disabled**, branch rule re-enabled after cleanup.
- README links to live URLs.

---

## 4) v1 Feature Set (shipped, MOCK)
### Captions tool
- Upload video → **Transcribe** (MOCK).  
- Tone selector: `default | hype | educational`.  
- **Generate 2 Captions** → tweet + instagram fields.  
- **Download Zip** → `transcript.txt`, `tweet.txt`, `instagram.txt`.  
- LocalStorage persistence. Disabled-button guards. Error surfacing. Keyboard shortcuts:  
  - **Cmd/Ctrl+Enter** → generate captions  
  - **Cmd/Ctrl+S** → download zip  
- Health badge (MOCK/REAL) in header.

### Thumbnail tool
- Pick video → **Capture Frame**.  
- Canvas fixed **1280×720**.  
- Base image: drag to pan, wheel/slider to zoom, clamped to cover.  
- **Image overlay**: PNG/JPEG/WEBP; size slider; **opacity**; drag to position.  
  - **Snap**: edges with creator-friendly gutters; centers; rule-of-thirds; **Alt/Option = flush**; avoids bottom-right timestamp occlusion.  
- **Text overlay**: draggable; size; opacity; **stroke/outline**; fill color; edge/center/thirds snap with same gutter/flush rules.  
- Export **≤ 2 MB** JPEG with quality stepdown, file named `forge_thumb_YYYYMMDD_HHMM.jpg`.  
- **Start Over** resets state cleanly.

---

## 5) Security, Ops, Monitoring
- CORS origin allowlist via `FRONTEND_ORIGIN`.  
- `express-rate-limit` 60/min.  
- Render alerts enabled (deploy failure, downtime).  
- Vercel Analytics + Speed Insights enabled.

---

## 6) QA checklist (prod)
- Upload small MP4 → Transcribe → Generate → Download.  
- Non-video upload → 415 error surfaced.  
- >1 GB upload rejected.  
- Refresh preserves fields (localStorage).  
- Zip contains all 3 files with current content.  
- Thumbnail: overlay snap to edges/centers/thirds; **Alt=flush**; timestamp-safe.  
- Mobile data test passes.

---

## 7) REAL mode (later)
**Do not flip until ready to pay.**
1. Render → add `OPENAI_API_KEY=<key>`.  
2. Set `MOCK_OPENAI=0`. Redeploy.  
3. `/api/health` shows `"mock": false`.  
4. Implement providers:
   - **/api/transcribe** → Whisper API (or preferred speech-to-text).  
   - **/api/captions** → OpenAI chat completion prompt (tweet + ig text), tone param; safety + cost guards.  
5. Re-enable billing-aware CORS and rate limits if traffic grows.

---

## 8) Roadmap (near-term)
- **Polish**: better overlay handles, delete overlay, nudge with arrows, undo.  
- **Presets**: watermark preset + remember last overlay; 1-click edge positions.  
- **Aspect ratios**: 16:9, 9:16, 1:1 with auto-fit + safe zones.  
- **Caption variants**: multi-sample + quick copy; UTM builder.  
- **Project save**: JSON export/import of a session state.  
- **Error reporting**: minimal client-side logger for fetch failures.

---

## 9) Releases
- Tags (set or to set):  
  - Frontend: `v1-mock`, `v1.0.0-mock`, `v1.0.2-mock`  
  - Backend: `v1-mock`

---

## 10) Operational playbook
- **Local dev**:  
  - Backend: `yarn && yarn dev` (PORT=8787, MOCK=1)  
  - Frontend: `yarn && yarn dev` (proxy or `VITE_API_BASE` as needed)
- **Deploy**:  
  - Push to `forge-server` → Render rebuilds.  
  - Push to `forge-frontend` → Vercel redeploys.  
- **Env changes**: set in consoles; redeploy backend; then redeploy frontend if `VITE_API_BASE` changes.

---

## 11) Change log (Sep 25–26, 2025 AEST)
- Split monorepo → meta `forge` docs repo + `forge-frontend` + `forge-server`.  
- Backend: CORS allowlist, rate limit, multer 1 GB, health + MOCK endpoints.  
- Frontend: proxy, error surfacing, keyboard shortcuts, dark theme.  
- Deploy: Render (free), Vercel (Vite). Set envs.  
- Analytics: Vercel Web Analytics + Speed Insights.  
- Thumbnail tool: capture frame, pan/zoom, overlay img with opacity, edge/center/thirds snap, Alt=flush, timestamp-safe. Text overlay with outline/fill. Export ≤2MB.  
- Domain: primary app URL is **forge-frontend-one.vercel.app** (optional alias `forge-ruddy.vercel.app`).  
- Meta repo cleaned and protected; README links to live URLs.

---

## 12) Admin
- Licenses: MIT for frontend and backend.  
- Branch protection restored on meta repo after PR merge.
- Environment group on Render: `forge-prod`.

---

## 13) Owner notes
- Stay in MOCK until costs accepted.  
- Keep single public URL for the app.  
- Prioritize polish and presets for creator speed.  
