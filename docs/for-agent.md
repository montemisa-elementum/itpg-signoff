# ITPG — Coding-agent build spec

**Audience:** a coding agent implementing this solution with the public Elementum CLI and TypeScript EDK.  
**Not for:** PM narrative (see [for-pm.md](for-pm.md)).

Read this file, then load the public `/elementum` playbook (`skills/user/elementum/SKILL.md` or `elementum playbooks print elementum`). For record UX, also load `/elementum-design`. Do **not** use the repository-local `/edk-dev` playbook; that maintains the SDK, not customer solutions.

## Mission

Build an IT Portfolio & Governance suite on Elementum:

- Shared **elements** for the estate (products, types, gates, scores, DoA).
- **Apps** for demand → portfolio item (investment + execution) → capacity, outcomes, dependencies, vendors.
- **Tables** for systems of record we do not own (Jira, ERP, IdP, TPRM, cloud billing).
- Automations for exact rules. Agents only suggest; humans confirm disposition, board decision, gate pass, and realized value.

Pain the first waves must attack (IDs from the Pain Points sheet): 13–15 (one front door), 17 (demand→program via Portfolio ID), 12 (structured business case), 18 (mandatory baseline), 1 (real gates not “close the task”), 7 (standard roles).

## Non-negotiable authoring rules

1. Author TypeScript with public EDK builders. Import from `@elementumai/edk/<subpath>` and `@catalog`. Never hand-copy a pulled file to create a new app/element.
2. Scaffold with `elementum new app` / `elementum new element` (requires `--name`, `--namespace`, `--handle`, `--category`, `--cloud-link`). Handles and namespaces are immutable after deploy — confirm with the human if the org workspace already exists.
3. After edits: `npx tsc --noEmit` → `elementum build` → `elementum plan`. Apply only after the human reviews the plan. Prefer MCP `run`/`help` when connected (`elementum mcp`).
4. Do not edit `org.ts` or `generated/`. Refresh with `elementum pull org --data-only`.
5. No platform UUIDs in source. Use catalog refs, `org.cloudLinks.<key>`, `org.groups.<key>`, `userRef(email)`.
6. Model connectors: `catalog.aiProviders.<family>.models.<model>` only.
7. Automations: `revision` is SemVer publication. Keep unchanged while drafting; bump only when publishing a new revision. Use `automationStatus.draft` until the human says go live.
8. Agents never write board decision, gate pass, or Outcome status Realized. Those are on-demand automations / approval chains / buttons.
9. Append status options; do not reorder. Distinct terminal labels with `tags: ["CLOSED"]` (do not collapse to a single Closed).
10. At least one `listView` per app. Stage-specific `dynamicLayouts` for materially different stages; do not duplicate native header chrome.
11. Do not 1:1 the EDB “Task” tables into apps. Fold into fields, status, attachments, or a small child app (see inventory).
12. Pause (ask the human, do not invent): dependency network graph visualization, scoring-model simulation against the whole portfolio, scenario optimizer, custom BI heat maps, a second vendor master, provider/schema changes.

## Workspace bootstrap

```bash
# from the package workspace that will hold org folders
npm install @elementumai/edk
elementum auth login --profile <profile>
elementum --profile=<profile> pull org --data-only
cd <instance>/<organization>
elementum --profile=<profile> init
```

Then scaffold entities in **build order** below. After each new app/element, siblings can use `catalog.<refName>` immediately.

Suggested category name: `IT Portfolio & Governance` (create in `organization.ts` if missing).

Cloud link: use the org’s existing default or the handle the human names. Do not guess a production warehouse.

## Build order (stop at the wave the human asked for)

Architect Slack order was not in the source packet. Follow this unless the human pastes a different SA sequence.

| Wave | Build | Stop condition |
|---|---|---|
| 0 | Foundation elements + groups | Lists exist; DoA and one gate + scoring version seeded |
| 1 | Demand Request app + views + submit/route automations | Story A possible (draft → submit → route → backlog disposition) |
| 2 | Portfolio Item + cost lines + conditions + create-from-demand | Story B through board + baseline (manual score OK) |
| 3 | Execution fields, milestones, RAID apps, exception views | Cadence/RAG rules; no Jira required for empty-record UAT |
| 4 | Capacity Plan + demand/supply children | Over-commit flag from Portfolio Item demand |
| 5 | Outcome Record + create-from-case + PIR stub | Outcomes stay open after item close |
| 6 | Dependency app | Two-sided accept; no graph viz |
| 7 | Vendor Engagement | Only if TPRM/ERP tables exist |
| 8 | Agents | Search/draft/flag only |

Do not start wave N+1 until wave N typechecks, builds, and plans cleanly.

## Identity (proposed — confirm before first apply)

| Display name | Ref / folder | Namespace | Handle |
|---|---|---|---|
| Demand Request | `demandRequest` | `demand-request` | `DMD` |
| Portfolio Item | `portfolioItem` | `portfolio-item` | `PFI` |
| Cost Line | `costLine` | `cost-line` | `CLN` |
| Decision Condition | `decisionCondition` | `decision-condition` | `DCN` |
| Assessor Score | `assessorScore` | `assessor-score` | `ASC` |
| Funding Scenario | `fundingScenario` | `funding-scenario` | `SCN` |
| Scenario Line | `scenarioLine` | `scenario-line` | `SLN` |
| Milestone | `milestone` | `milestone` | `MSN` |
| Control Gate Record | `controlGateRecord` | `control-gate-record` | `CGR` |
| Capacity Plan | `capacityPlan` | `capacity-plan` | `CAP` |
| Outcome Record | `outcomeRecord` | `outcome-record` | `OUT` |
| Dependency | `dependency` | `dependency` | `DEP` |
| Vendor Engagement | `vendorEngagement` | `vendor-engagement` | `VEN` |
| Governance Change Request | `governanceChangeRequest` | `governance-change-request` | `GCR` |
| Portfolio Risk | `portfolioRisk` | `portfolio-risk` | `RSK` |
| Portfolio Issue | `portfolioIssue` | `portfolio-issue` | `ISS` |
| Portfolio Change Request | `portfolioChangeRequest` | `portfolio-change-request` | `CHG` |
| Clarification Request | `clarificationRequest` | `clarification-request` | `CLR` |

### Elements (wave 0)

| Display name | Ref | Namespace | Handle |
|---|---|---|---|
| Portfolio Hierarchy | `portfolioHierarchy` | `portfolio-hierarchy` | `PHR` |
| Product & Platform Register | `productPlatform` | `product-platform` | `PPR` |
| Strategic Objective | `strategicObjective` | `strategic-objective` | `OBJ` |
| Demand & Investment Type | `demandInvestmentType` | `demand-investment-type` | `DTY` |
| Architecture Domain | `architectureDomain` | `architecture-domain` | `ADM` |
| Architecture Principle | `architecturePrinciple` | `architecture-principle` | `APR` |
| Stage Gate Model | `stageGateModel` | `stage-gate-model` | `SGM` |
| Gate Criterion | `gateCriterion` | `gate-criterion` | `GCRI` |
| Scoring Model Version | `scoringModelVersion` | `scoring-model-version` | `SMV` |
| DoA Threshold | `doaThreshold` | `doa-threshold` | `DOA` |
| Team & Squad | `teamSquad` | `team-squad` | `TMS` |
| Role & Skill | `roleSkill` | `role-skill` | `RSKIL` |
| Shared Function | `sharedFunction` | `shared-function` | `SHF` |
| Outcome Type | `outcomeType` | `outcome-type` | `OTP` |
| Value Band | `valueBand` | `value-band` | `VBD` |

Prefer **dynamic dropdowns** (`config.dynamic.source: catalog.<element>`) over duplicating picklists. Use `autoRelate: true` when the field should create a relationship.

**Groups** (organization.ts): Requesters, Product Owners, Platform Owners, Engineering Leads, Architects, Security Reviewers, Finance Partners, Benefit Owners, Investment Board, Governance Admins. Map access policies so financials/commercials are not visible to Requesters (GOV-012).

Do **not** author Employee/BU/Cost Centre as elements if they will be Tables from HR/finance. Stub dropdowns only if the human says v1 is manual.

## Wave 0 — element fields (minimum)

**Portfolio Hierarchy:** Name (title), Parent (self-relation, optional), Level (Value stream / Product / Platform / Service), Valid From, Valid To, Active.

**Product & Platform:** Name, Hierarchy node, Product owner (user), Platform owner (user), Engineering lead (user), Accountable team (→ Team & Squad), Catalogue key (text, for later CMDB match).

**Demand & Investment Type:** Name, Class (New capability / Enhancement / Integration / Infrastructure / Compliance / Security remediation / Technical debt), Default routing (Backlog vs Investment) hint.

**Strategic Objective:** Name, Owner, Horizon, Measure (text).

**DoA Threshold:** Name, Investment type (→ DTY), Min value, Max value, Authority level (L0–L3 or named board), Active.

**Stage Gate Model:** Name, Investment type, Version (text), Effective From, Status (Draft/Published/Retired).

**Gate Criterion:** Name, Model, Gate key (Architecture / Security / Privacy / Production readiness), Mandatory artefacts (long text), Sequence.

**Scoring Model Version:** Name, Version, Published date, Status. Criteria weights as number fields: Business value, Architecture fit, Platform reuse, Run cost impact, Risk and security, Technical debt reduction (must sum-check in automation later).

**Team & Squad:** Name, Type (Product / Platform / Shared function), Parent portfolio node optional.

**Shared Function:** Name, Owner, Standard lead time (days), Capacity units (number).

Seed a few records only after apply, via CLI import or UI — do not bake customer org names into source.

## Wave 1 — Demand Request

### Stages

`draft` Draft → `submitted` Submitted → `clarification` Clarification → `triage` Triage → `disposed` Disposed

### Status options

Open: Draft, Submitted, Clarification requested, In triage.  
Terminal (CLOSED tags): Routed to backlog, Accepted as investment, Merged, Deferred, Rejected, Redirected.

### Fields

- Title = problem statement short name (app title field).
- Demand type → Demand & Investment Type (required on submit).
- Requester (user, default created-by), Sponsor (user), Business unit (text or table later), Cost centre (text).
- Affected products (dynamic multi or single → Product & Platform; start single if multi-relation is painful).
- Objectives (dynamic → Strategic Objective) + Alignment notes.
- Problem statement, Desired outcome (long text).
- Required timing (date).
- Work type: Run / Change / Mandatory (dropdown).
- Supporting files (attachment).
- Portfolio ID (text; empty until accept-as-investment).
- Disposition reason (dropdown: Duplicate, Out of scope, Backlog, Needs funding, Other + long text).
- Triage owner (user, ASSIGNEE).
- Initial cost/effort/duration (numbers; optional until qualification).
- Related demand (self) for merge.
- Related portfolio item (dynamic → Portfolio Item; appears after wave 2).

Use `show_when` / `require_when` by demand type for extra fields (security vs enhancement). Draft allows incomplete save; **Submit** automation enforces required set (DMD-005, pain 12 quality bar).

### Views

- My demand (`createdBy` = current user)
- Inbox (In triage, assignee = current user)
- Pipeline all (not disposed)
- Ageing (Submitted/Triage, sort created)

### Layouts

- Draft/Submitted: intake workspace only (type, product, problem, attachments). No scores.
- Triage: summary + disposition + duplicate candidates section.
- Disposed: read-mostly + next-step message.

### Automations (wave 1)

1. **Submit demand** (on-demand button): validate required fields; set status Submitted; set stage submitted; notify triage owner after routing.
2. **Route on submit** (record created/updated to Submitted): set assignee from Product.productOwner (or platform owner / governance lead by type). Reassignment is manual with reason field later.
3. **Notify requester on disposition** (status in terminal set): message with disposition + next step.

Mint Portfolio ID and create Portfolio Item in **wave 2**, not wave 1.

### Agent (wave 8 only)

Triage assistant: `agentSearchRecords` on Demand + Portfolio Item; optional table search when Jira table exists. Present matches; do not auto-reject (DMD-010–011). Skill + published on-demand for “set disposition” if the human wants confirmation gates.

## Wave 2 — Portfolio Item (investment + later execution)

One app for qualify → board → execute → realize. Do not create a separate Initiative app unless the human insists.

### Stages

`qualify` Qualify → `score` Score → `board` Board → `baseline` Baseline → `execute` Execute → `realize` Realize → `close` Close

### Status options

Open: Qualifying, Scoring, Awaiting board, Conditionally approved, Approved, In delivery, Realizing.  
Terminal CLOSED: Rejected, Deferred, Completed, Cancelled, Retired.

### Fields (investment)

- Portfolio ID (text, unique, required once minted).
- Source demand (→ Demand).
- Product(s), Objectives + weighting notes.
- Investment type → DTY.
- Funding construct: Persistent product funding | Discrete initiative (GOV-021).
- Business case: options narrative (include do-nothing and reuse-platform), architecture/security implications, exception required (boolean + text).
- Benefit owner (user), measurable outcomes summary (long text) — automation will spawn Outcome records in wave 5.
- Scoring model version (→ SMV), criterion scores (numbers), composite (calculated sum/weighted — implement weighted calc in automation if calc DSL cannot read element weights yet; store Composite score number).
- Decision: Approve / Conditionally approve / Reject / Defer, rationale, date, attendees (long text).
- Baseline locked (boolean), baseline locked at (datetime), approved funding (decimal).
- TCO total (calculated from Cost Line children when possible; else decimal).
- Gate model version (→ SGM).
- DoA level (text, set by automation from amount + type).

### Execution fields (can add in wave 3 on same app)

- RAG (Green / Amber / Red).
- Status narrative, Recovery action (required when RAG Amber/Red).
- Last status submitted at (datetime).
- Cadence days (number, default 7).
- Health overdue (boolean/calculated).

### Child apps

**Cost Line:** related Portfolio Item, Year, Cost type (Build / Licence / Cloud run / Support), Amount, Currency text.

**Decision Condition:** related item, Condition text, Owner, Due, Status Open/Closed.

**Assessor Score (wave 2 optional):** related item, Assessor, criterion numbers, variance flag later.

### Automations

1. **Accept demand as investment** (on Demand, on-demand): mint Portfolio ID (`P-` + demand record id or sequential); create Portfolio Item; copy type/product/sponsor/problem; set demand status Accepted as investment; relate both ways.
2. **Submit to board** (on-demand): require benefit owner + at least one outcome statement + TCO lines exist; set stage board.
3. **Lock baseline** (on-demand): set baseline locked; copy approved funding; require decision Approved or Conditionally approved.
4. **Block execute if open conditions** (on stage change to execute): search Decision Conditions status Open → fail/message (PRI-018).
5. **DoA route** (on submit to board): match DoA Threshold element; start `approvalChain` for that level (wave 2 can notify board group if approval chains not ready).

Gate hard-block (GOV-016): Control Gate Record children in wave 3; until then, do not claim L0–L3 replacement is complete.

## Wave 3 — execution command center

- Milestone app: Item, Name, Kind (Delivery / Control gate), Baseline date, Forecast date, Actual date, Slippage (calc or automation).
- Control Gate Record: Item, Criterion, Status (Pending / Passed / Waived), Evidence attachment, Waiver rationale, Secondary approver.
- Risk / Issue / Change Request: Item, severity, owner, target date; Change Request also links Decision / baseline impact.
- Views: Exception (RAG Red/Amber OR health overdue OR open severe risk); All in Execute; By product.
- Automation: flag overdue if now > last status submitted + cadence; on RAG Amber/Red require recovery action before save (validation / disable_when on button).
- Do **not** build Tableau. List views are the command center.
- Jira Table: only when CloudLink + table exist; map work item → Portfolio ID field. Do not fake a Table.

## Waves 4–8 (contract only; implement when asked)

**Capacity Plan:** one record per Team × Period. Children: Supply (role/skill, FTE), Demand (from Portfolio Item, work type Run/Change/Mandatory), Envelope (year, amount, committed/planned). Automation: Net position, Binding constraint text, Over-commit boolean.

**Outcome Record:** Item, Type → Outcome Type, Owner, Measure, Baseline value/date, Target, Data source, Status Defined/Measuring/Validating/Realized/Partial/Written off (Realized only after finance approval). Stay non-closed when Item hits Completed until realization period elapsed. PIR: on-demand or scheduled create review record / long text on Outcome.

**Dependency:** Provider party (shared function or team or vendor text), Receiver → Portfolio Item, Need-by, Criticality, Status Proposed/Accepted/At risk/Breached/Delivered/Cancelled/Waived. Accept button sets Accepted + accepted by/at. Lead time check vs Shared Function.days.

**Vendor Engagement:** related Item(s), Vendor key from TPRM table (not a local vendor element), Type (SI / Managed service / Staff aug / Subscription), Internal owner, Commitments as children. Skip entire wave if no TPRM table.

**Agents:** Demand triage, board-pack draft from item fields, RAG vs evidence (needs tables), outcome chasing. Configuration-drift agent last.

## Tables (do not scaffold until sources exist)

| Table | When |
|---|---|
| Engineering work items / backlog | Wave 1 duplicate screen or wave 3 progress |
| Cost actuals / invoices | Wave 3 finance |
| Cloud consumption | Wave 3 |
| Workforce | Wave 4 / GOV-014 |
| Vendor / contract / risk / SLA / savings | Wave 7 / VAL-014 |
| Telemetry / adoption | Wave 5 |

Use `table` + CloudLink from pulled `org.ts`. Search with `tableRecordsSearch` / `catalog.tables.<ref>`.

## EDB Task fold list (do not create apps)

Classification result, triage disposition, run/change class, demand attachment, status history, composite score, board meeting attendees, net capacity position, period status report, governance pack file, dependency status history, double-count flag, concentration report → **fields, status, attachments, messages, or views**.

## Layout / design

Follow `/elementum-design`: one primary action per stage; collapse activity; fields in one grid per section; `disable_when` for incomplete submit; automation buttons call published workflows only. Browser-verify if tools exist; otherwise say what was not verified.

## Verification each wave

1. `npx tsc --noEmit`
2. `elementum build`
3. `elementum plan` — explain creates/updates/destroys; zero unexpected destroys
4. After human apply: at least one list view shows records; Story A or B path clickable
5. Do not apply `-auto-approve` unless the human already approved the plan (MCP apply is `["apply", "-auto-approve"]` after that)

## Sources (outside this repo)

- `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - Functional Requirements.csv`
- `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - Acceptance Criteria.csv`
- `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - EDB.csv`
- `~/Downloads/Requirements & Acceptance Criteria_ IT Porftolio & Governance - Pain Points.csv`
- Stakeholder stories: [for-pm.md](for-pm.md) Stories A–C
