# IT Portfolio & Governance (ITPG)

Visual Elementum solution design for an eight-application **IT Portfolio & Governance** suite.

## Review site (for people)

Open [`index.html`](index.html) in a browser. No server, package install, or internet connection is required.

| Page | Contents |
|---|---|
| [`index.html`](index.html) | The eight apps, cross-app flows, supporting records, per-app detail with record schemas, client inputs and open questions |
| [`site/config.html`](site/config.html) | Representative cross-app automations, access policy and agent boundaries |
| [`site/pm.html`](site/pm.html) | Requirement counts, pain-point evidence, acceptance framework and missing process input |

The homepage is rendered from [`site/eight-apps.js`](site/eight-apps.js); [`site/anchors.js`](site/anchors.js)
adds the copyable section anchors on every page. The earlier two-spine dataset remains in
[`site/explorer.js`](site/explorer.js) for git history only — no page loads it.

### Deep links

Every section heading carries a `#` anchor that copies its URL on click. Stable targets:

| Link | Opens |
|---|---|
| `#model` `#landscape` `#flows` `#tasks` `#apps` `#client` `#questions` | A section of the homepage |
| `#app-<id>` | The application detail, expanded and scrolled to |
| `#schema-<id>` | The application detail plus its record-schema modal |

Application ids are `governance-foundation`, `enterprise-demand-intake`, `prioritization`, `capacity`,
`execution`, `value`, `dependencies` and `vendors` — so
`…/index.html#schema-prioritization` lands someone straight on the Investment Decision schema.

## Canonical source documents (for agents)

| Document | Audience |
|---|---|
| [docs/for-agent.md](docs/for-agent.md) | Full coding-agent implementation specification |
| [docs/for-pm.md](docs/for-pm.md) | Detailed PM and process-owner notes |

The site is the review surface. The agent document records the eight-app assumption and the unresolved authoring decision for the task entity.

Source requirements (not in this repo): `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - *.csv` (Functional, Acceptance, EDB, Pain Points).
