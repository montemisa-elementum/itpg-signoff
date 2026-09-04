# ITPG — Coding-agent build spec

**Audience:** a coding agent implementing this solution with the public Elementum CLI and TypeScript EDK.  
**Not for:** PM narrative (see [for-pm.md](for-pm.md)).

Read this file, then load the public `/elementum` playbook (`skills/user/elementum/SKILL.md` or `elementum playbooks print elementum`). For record UX, also load `/elementum-design`. Do **not** use the repository-local `/edk-dev` playbook; that maintains the SDK, not customer solutions.

## Mission

Build a **generic ITPG product** on Elementum that the current engagement can adopt, and that later organizations can clone and configure. This packet started from one company’s requirements workbook; treat that workbook as **tenant-0**, not as the only shape of the product.

- Shared **elements** for the estate (products, types, gates, scores, DoA) — **records are tenant data**, schemas are product.
- **Apps** for demand → portfolio item (investment + execution) → optional modules (capacity, outcomes, dependencies, vendors).
- **Tables** for systems of record we do not own (work management, ERP, IdP, sourcing/TPRM, cloud billing) — **connectors are tenant**, the fact of a Table slot is product.
- Automations for exact rules that **read element/config records**. Agents only suggest; humans confirm disposition, board decision, gate pass, and realized value.

Pain the first waves must attack for **tenant-0** (Pain Points sheet): 13–15 (one front door), 17 (demand→program via Portfolio ID), 12 (structured business case), 18 (mandatory baseline), 1 (real gates not “close the task”), 7 (standard roles). Implement those as product capabilities; do not encode tenant-0 tool names or org structure in TypeScript.

## Product vs tenant (keep this generic)

We want one ITPG solution other companies can **build upon**, not a one-off for the current spreadsheet. Split every decision into three layers:

| Layer | Lives in | Examples | Clone to a new org? |
|---|---|---|---|
| **Product core** | EDK apps/elements/automations/views | Demand stages, Portfolio ID, structured case, gate *mechanism*, DoA *lookup*, RAG cadence | Yes — scaffold/clone as-is |
| **Optional modules** | Same, but only scaffold if the tenant wants the wave | Capacity, Outcomes, Dependencies, Vendor, Agents | Clone only the modules they buy |
| **Tenant pack** | Element **records**, groups membership, CloudLinks, Tables, access policy members, labels, seed data | Product list, L0–L3 bands, Jira vs ADO, TPRM URL, “Claims Platform” | Never copy; reconfigure |

### Product core (do this the same for every customer)

These are industry ITPG, not this workbook’s quirks:

- Single demand front door; typed intake; save draft; mandatory quality gate on submit.
- Disposition: backlog vs investment vs reject/defer/merge/redirect — **status on Demand**, not a child “disposition app”.
- Persistent **Portfolio ID** carried on related records.
- Structured business case on **Portfolio Item** (not an uploaded spreadsheet as the system of record).
- Options including do-nothing and reuse-existing-platform as **fields/child rows**, not hardcoded option titles beyond those two generic labels.
- Scoring **engine** that reads a published Scoring Model Version element; criteria names/weights are data.
- Stage **gate mechanism**: model version on the item, Control Gate Record children, block progress / waiver with residual risk. Which gates exist (architecture, security, …) is data on Gate Criterion.
- Delegation of authority: match amount × type → Threshold element → approval chain. Authority names (L0–L3 vs “Investment Board”) are data.
- Baseline lock as a first-class action.
- Distinct terminal statuses (Approved, Rejected, Completed, Cancelled, Retired, …).
- Execution: cadence, RAG with required commentary when adverse, milestones baseline vs forecast, RAID as related apps, exception list views.
- Outcomes as separate records that can outlive delivery; “Realized” is a controlled status.
- Dependencies as two-sided accept + lifecycle (proposed → accepted → at risk → breached).
- Financials/commercials restricted by access policy **shape** (groups); who sits in the groups is tenant.
- Agents suggest; automations commit.

### Optional modules (product, but not every tenant needs them on day one)

| Module | Wave | Skip when |
|---|---|---|
| Capacity & envelopes | 4 | Tenant has no shared capacity process yet |
| Outcome / PIR | 5 | They only want intake + decision |
| Dependencies | 6 | Small org / no shared-function bottlenecks in scope |
| Vendor engagement | 7 | No sourcing/TPRM (or vendor MDM) to consume — **do not build a second vendor master** |
| Agentic layer | 8 | Records are not trustworthy yet |

Vendor is always **overlay on an external vendor SoR**, never ITPG-owned vendor MDM. That is product policy for all tenants.

### Tenant-0 only (current company — do not bake into product source)

Call these out in plans and keep them in **config, Tables, copy, and seed**, not in field bag keys or automation literals:

| Tenant-0 fact | Product way |
|---|---|
| Stack: ServiceNow, Jira, Smartsheet, SharePoint, Confluence, Tableau, Excel | Integration **slots**: work management, documents, BI. Map Jira (or ADO, GitHub) at tenant pack time. Never `jiraIssueKey` as the only identifier — use `externalWorkItemId` + `externalSystem` |
| Gates named L0–L3; approval = closing a ServiceNow task | DoA Threshold + Gate Criterion **records**. Labels are tenant |
| Owner fields ~70% accurate; specific IdP | User fields + scheduled “stale owner” flag; directory Table when they have a feed |
| Exec deck takes ~1 week; Tableau | Exception **list views** + optional pack automation. Do not build Tableau |
| Dependency tracker blocked 6 months | Dependency **module** (generic). Their delay is a sales/delivery note, not a schema |
| Exception programs off-system | Same Demand/Portfolio Item apps; no “exception” app |
| Business case Excel retyped into ServiceNow | Product is structured fields; **do not** implement “parse Excel upload as SoR” |
| Cross-suite **Strategic Sourcing & TPRM** workbook | Tenant integration. Core Vendor module expects *a* vendor/contract/risk Table, not that product’s table names |
| Savings ledger reconciliation (VAL-014) | Tenant; only if sourcing savings Table exists |
| Shared functions listed (EA, security, cloud, IAM, data, integration, network) | Seed **Shared Function** records, not enums in TS |
| Demand types (new capability, enhancement, tech debt, …) | Seed **Demand & Investment Type** records. Other tenants will add/rename |
| Role names in GOV-010 | Seed **groups**. Other tenants will differ (PMO vs product ops) |
| “Fund teams not projects” / Ways of Working | Product already supports both funding constructs as a **dropdown on Portfolio Item**. Do not assume every tenant has left project-funding |
| Illustrative stories (Maya, Omar, SSO, Claims, TLS) | UAT scripts / seed examples in docs — **never** as required picklist values |
| Six-dimension acceptance (Configure, UAT, Train, Document, Integration, Sign-off) | This customer’s delivery method. Product Definition of Done is typecheck, plan, views, one E2E path |
| Green-shaded TPRM overlapping requirements | Skip or stub in core; implement when that tenant’s sourcing suite exists |

Pain point IDs 1–18 are **tenant-0 evidence**. The *capability* they imply (gates, cadence, one ID) is product.

### Authoring rules for genericity

1. **No tenant literals in TypeScript.** No company name, product names (Claims Platform), tool brands, email domains, or “L0” in `dropdownField` static values unless the value is a true industry default (e.g. RAG Green/Amber/Red, Run/Change/Mandatory, demand dispositions). Prefer Elements + dynamic dropdowns.
2. **Bag keys stay product language** (`demandType`, `portfolioId`, `fundingConstruct`). Display `name` can be relabeled per tenant later; changing keys is a migration.
3. **Namespaces/handles stay generic** (`demand-request` / `DMD`). Do not prefix with a customer acronym. Next org clones or `elementum clone app`.
4. **Automations read config records** (routing from Product owner fields, DoA from Threshold element, gates from Criterion rows). If you hardcode “route to Security when type = TLS”, that is a tenant extension — put it in a clearly named tenant automation file or a Routing Rule **element**, not the core submit flow.
5. **Seed data is not source.** After apply, import tenant products/objectives/thresholds. This repo may document example seeds in markdown; do not commit a customer estate as default field options.
6. **Tables are ports.** Author the Table resource when the human names a CloudLink. Keep field names generic (`externalId`, `title`, `status`, `portfolioId`). Adapter comments: “tenant-0 = Jira”.
7. **Tenant extensions** (extra fields, extra statuses, extra automations) go in the same app files only if they are harmless defaults; otherwise isolate (naming `// TENANT:` or a follow-up pack) and list them under “Tenant-0 extensions” at the bottom of your change notes.
8. **New customer** = `pull org --data-only` on their org, clone/scaffold ITPG core, load their tenant pack (elements + groups + tables). Do not fork the core per customer unless a Pause item says the core model cannot express it.

If a requirement cannot be done with config (elements, groups, tables, extra fields) and needs a new app or a new stage on the spine, ask: is this **product** (every ITPG org) or **this tenant**? Only add stages/apps to the spine for product.

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
13. Keep the solution **multi-tenant ready**: no company/tool/product literals in authored source; tenant-0 workbook items go in elements, Tables, groups, and seed — see **Product vs tenant**.

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

Suggested category name: `IT Portfolio & Governance` (create in `organization.ts` if missing). Same category label for every tenant unless they insist on a local rename.

Cloud link: use **that org’s** existing default or the handle the human names. CloudLinks are always tenant pack, never copied from tenant-0.

## Build order (stop at the wave the human asked for)

Architect Slack order was not in the source packet. Follow this unless the human pastes a different SA sequence.

| Wave | Build | Stop condition |
|---|---|---|
| 0 | Foundation elements + groups | Lists exist; DoA and one gate + scoring version seeded |
| 1 | Demand Request app + views + submit/route automations | Story A possible (draft → submit → route → backlog disposition) |
| 2 | Portfolio Item + cost lines + conditions + create-from-demand | Story B through board + baseline (manual score OK) |
| 3 | Execution fields, milestones, RAID apps, exception views | Cadence/RAG rules; work-management Table not required for empty-record UAT |
| 4 | Capacity Plan + demand/supply children | Over-commit flag from Portfolio Item demand |
| 5 | Outcome Record + create-from-case + PIR stub | Outcomes stay open after item close |
| 6 | Dependency app | Two-sided accept; no graph viz |
| 7 | Vendor Engagement | Only if TPRM/ERP tables exist |
| 8 | Agents | Search/draft/flag only |

Do not start wave N+1 until wave N typechecks, builds, and plans cleanly.

## Identity (proposed — confirm before first apply)

Stable **product** identities. Do not put a customer acronym in namespace/handle. Confirm only if the target org already consumed these names.

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

**DoA Threshold:** Name, Investment type (→ DTY), Min value, Max value, Authority level (text or dropdown sourced from a small Authority Level element — tenant-0 may seed L0–L3), Active.

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

Triage assistant: `agentSearchRecords` on Demand + Portfolio Item; optional table search when a work-item Table exists. Present matches; do not auto-reject (DMD-010–011). Skill + published on-demand for “set disposition” if the human wants confirmation gates.

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

Gate hard-block (GOV-016): Control Gate Record children in wave 3; until then, do not claim tenant-0 L0–L3 replacement is complete.

## Wave 3 — execution command center

- Milestone app: Item, Name, Kind (Delivery / Control gate), Baseline date, Forecast date, Actual date, Slippage (calc or automation).
- Control Gate Record: Item, Criterion, Status (Pending / Passed / Waived), Evidence attachment, Waiver rationale, Secondary approver.
- Risk / Issue / Change Request: Item, severity, owner, target date; Change Request also links Decision / baseline impact.
- Views: Exception (RAG Red/Amber OR health overdue OR open severe risk); All in Execute; By product.
- Automation: flag overdue if now > last status submitted + cadence; on RAG Amber/Red require recovery action before save (validation / disable_when on button).
- Do **not** build Tableau. List views are the command center.
- Work-item Table: only when CloudLink + table exist; map `externalWorkItemId` → Portfolio ID. Do not fake a Table. Tenant-0 expected source: Jira.

## Waves 4–8 (contract only; implement when asked)

**Capacity Plan:** one record per Team × Period. Children: Supply (role/skill, FTE), Demand (from Portfolio Item, work type Run/Change/Mandatory), Envelope (year, amount, committed/planned). Automation: Net position, Binding constraint text, Over-commit boolean.

**Outcome Record:** Item, Type → Outcome Type, Owner, Measure, Baseline value/date, Target, Data source, Status Defined/Measuring/Validating/Realized/Partial/Written off (Realized only after finance approval). Stay non-closed when Item hits Completed until realization period elapsed. PIR: on-demand or scheduled create review record / long text on Outcome.

**Dependency:** Provider party (shared function or team or vendor text), Receiver → Portfolio Item, Need-by, Criticality, Status Proposed/Accepted/At risk/Breached/Delivered/Cancelled/Waived. Accept button sets Accepted + accepted by/at. Lead time check vs Shared Function.days.

**Vendor Engagement:** related Item(s), Vendor key from the tenant’s vendor SoR Table (not a local vendor element), Type (SI / Managed service / Staff aug / Subscription), Internal owner, Commitments as children. Skip entire wave if no vendor Table. Tenant-0 expected source: Strategic Sourcing & TPRM.

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
