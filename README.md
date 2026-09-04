# IT Portfolio & Governance (ITPG)

Visual Elementum solution planning for a **generic IT Portfolio & Governance** product. The current company workbook is tenant-0 (configuration and integrations), not the only supported shape.

## Sign-off site (for people)

Open [`index.html`](index.html) in a browser. No server, package install, or internet connection is required.

| Page | Contents |
|---|---|
| [`index.html`](index.html) | The two spine apps and their processes, relationship map, component explorer (fields, stages, views, layouts, relationships), deployment waves, core vs tenant boundary, exclusions, sign-off decisions |
| [`site/config.html`](site/config.html) | Automation register, integration prerequisites, groups and access, agents |
| [`site/pm.html`](site/pm.html) | Process context: pain points and end-to-end stories |

Every app, element, and table port is one record in [`site/explorer.js`](site/explorer.js), which renders both the relationship map and the tiles. Add or change a component there and both stay in sync.

## Canonical source documents (for agents)

| Document | Audience |
|---|---|
| [docs/for-agent.md](docs/for-agent.md) | Full coding-agent EDK implementation specification |
| [docs/for-pm.md](docs/for-pm.md) | Detailed PM and process-owner notes |

The site is the review surface. `docs/for-agent.md` stays the authoritative prompt for a coding agent, so there is intentionally no agent-oriented HTML page.

Source requirements (not in this repo): `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - *.csv` (Functional, Acceptance, EDB, Pain Points).
