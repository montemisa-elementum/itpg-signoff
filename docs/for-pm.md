# IT Portfolio & Governance — What We Are Building

**Audience:** project PM, process owners, stakeholders.  
**Not for:** coding agents (see [for-agent.md](for-agent.md)).

This is the plan for replacing a fragmented IT PMO stack (ServiceNow + Jira + Smartsheet + SharePoint + Confluence + Tableau + Excel) with an Elementum suite: **one front door for demand, one persistent ID, structured decisions, and live execution/value views.**

---

## 1. In one paragraph

People today ask for technology work through tickets, email, and hallway conversations. Approvals are “close the task.” Business cases live in Excel, then get retyped into ServiceNow. Status is self-reported. The exec deck takes nearly a week. Dependencies have no system. We will build a connected set of Elementum **apps** (work that moves through stages) on shared **reference lists** (products, objectives, approval thresholds), and we will **read** Jira, finance, and vendor-risk systems instead of copying them.

Most requests should **not** become projects. They should land on an existing product team’s backlog. Only larger bets get a business case, a board decision, capacity checks, delivery tracking, and benefit tracking — all under the same ID.

---

## 2. Pain we are designing against

From the Pain Points sheet (mapped to requirements):

| # | What hurts today | What the suite must change |
|---|---|---|
| 1 | Gate “approvals” are closing a task by hand (L0–L3) | Real stage gates + delegation of authority; the record cannot skip a gate without a recorded waiver |
| 2 | Milestones built by hand, round-tripped through Excel | Milestones live on the initiative; dates compared to baseline; progress from the engineering tool where possible |
| 3 | KPIs / benefits typed in with no validation | Outcome records with named measure, owner, data source; finance validates “realized” |
| 4 | No alert when a status update is actually submitted | Cadence rules + notify on submit |
| 5 | Executive status deck takes nearly a week | Command-center views + pack generated from live records |
| 6 | Owner/lead fields ~70% accurate; no directory sync | Sync from identity; flag leavers for reassignment |
| 7 | No standard roles (lead, PM, product owner) | One role model reused across the suite |
| 8 | No file naming / no single document view | Attachments and versioned case on the record, not a random SharePoint pile |
| 9 | LOE not tied to actual cost | Estimate on demand; actuals from finance on the same Portfolio ID |
| 10 | RAG is self-reported, not checked against a rubric | Adverse RAG requires commentary; later, challenge vs toolchain evidence |
| 11 | Cannot measure on-time / cycle time / SLA | Milestone slippage + demand ageing + (later) flow metrics from Jira |
| 12 | Business case is an Excel dump; templates drift; KPIs retyped into ServiceNow and diverge | Structured case in Elementum; outcomes created from the case, not re-keyed |
| 13–15 | Seven+ tools; teams pick their own; “exception” programs off-system | Single demand entry; exception programs still get a Portfolio Item |
| 16 | No dependency tracker (custom config blocked 6 months) | Dependency app with two-sided accept |
| 17 | Hard to go from demand → program | Same `Portfolio ID`; related records, not a scavenger hunt |
| 18 | Budget baseline optional; financial roll-up inconsistent | Locking a baseline is a first-class step |

---

## 3. What “apps” means here

| Kind | Everyday meaning | Examples |
|---|---|---|
| **App** | A queue of work with stages (Draft → … → Done) | Demand, Portfolio Item, Dependency |
| **Element** | A shared list people pick from (little/no workflow) | Products, objectives, scoring models |
| **Table** | Data we **read** from another system | Jira issues, GL actuals, vendor master in TPRM |

We are **not** building eight disconnected products. We are building **one spine** and satellites.

```text
Demand Request  ──(if it needs funding)──►  Portfolio Item
                                                │
                    ┌───────────────┬───────────┼────────────┬─────────────┐
                    ▼               ▼           ▼            ▼             ▼
              Capacity Plan    Outcomes    Dependencies   Vendors    Risks / Changes
              (planning)       (after $)   (other teams)  (SIs/SaaS)
```

**Portfolio ID** is minted when demand is accepted as an investment (or when it is created, then copied). Every later record carries that ID so a requester can still find the program without knowing the Jira epic name.

---

## 4. Build order (what we sequence, and why)

The architect Slack note was **not** attached when this brief was written. Until we paste it in, this is the sequence we will use. It matches Elementum practice (shared lists first, then the process people feel) and hits the loudest pains early. **If the SA order differs, the SA order wins.**

| Wave | We stand up | Why this wave | Pains it attacks |
|---|---|---|---|
| **0** | Foundation elements: hierarchy, products, demand types, roles/groups, DoA thresholds, one gate model, one scoring model | Nothing else can route or approve without a shared estate | 7, 1 (prep) |
| **1** | **Demand Request** app + typed intake + routing + register | Single front door; kill email/ticket chaos | 13–15, 17 |
| **2** | **Portfolio Item** + structured business case + scoring + board decision + baseline lock | Stop Excel cases and optional baselining | 8, 12, 18, 1 |
| **3** | Execution on the same Portfolio Item: cadence, RAG rules, milestones, RAID, exception views | Stop the week-long deck and self-scored RAG | 2, 4, 5, 10, 11 |
| **4** | **Capacity Plan** (envelopes, team supply/demand, over-commit) | Decisions that ignore specialist capacity fail in delivery | 9, 18 |
| **5** | **Outcome Record** + PIR trigger | Benefits stop being a spreadsheet after go-live | 3, 9, 12 |
| **6** | **Dependency** app (accept / at risk / breach) | Unblocks the 6-month gap | 16 |
| **7** | **Vendor Engagement** on top of TPRM (not a second vendor list) | Only after TPRM/ERP feeds exist | — |
| **8** | Agents: triage assist, pack draft, evidence challenge | After the records are trustworthy | 5, 10, 12 |

Integrations (Jira, IdP, ERP, cloud billing, TPRM) land in the wave that needs them, not all on day one.

**Out of first release on purpose:** portfolio-wide dependency *graph* pictures, AI portfolio optimizer, simulating a new scoring model against the whole book, rebuilding vendor MDM.

---

## 5. End-to-end stories (how work moves app to app)

### Story A — Most demand: enhancement stays on a product team (no new project)

**People:** Maya (Claims Ops requester), Priya (Claims Platform product owner).

| Step | Where she is | What happens | What does *not* get created |
|---|---|---|---|
| 1 | **Demand Request** | Maya starts a request, type = Enhancement, product = Claims Platform, saves a draft, attaches a screenshot, submits. Mandatory fields block junk. | Portfolio Item |
| 2 | Same Demand record | Routing rule assigns Priya (product owner for that product). | — |
| 3 | Same Demand record | Duplicate check suggests an existing backlog item in Jira (Table). Priya confirms overlap. | — |
| 4 | Demand **status** → Routed to backlog | Priya’s disposition is a status + reason, not a second form. Maya is notified. She can open **her** demand and see the outcome. | No investment, no board pack, no capacity scenario |

**Apps involved:** Demand Request only (plus Product element + Jira table).  
**Why this matters:** This is the product operating model. If every Maya request becomes a program, we have rebuilt the old PMO.

---

### Story B — New capability: SSO across web and mobile (the full spine)

**People:** Omar (sponsor), Priya (product), Lena (security), finance partner, investment board, SI vendor.

This is one business journey. **Several apps** light up in order. The barcode is `P-1042`.

#### 1. Demand Request — “Is this a ticket or a bet?”

Omar submits type **New capability**: three logins today, want one identity across web and mobile. Foundation lists tell the form which products and objectives exist.

**Move:** Triage says not a duplicate, too big for one team’s backlog → disposition **Accept as investment**.  
**System:** Mints **Portfolio ID `P-1042`**. Creates a related **Portfolio Item** in Qualify. Omar’s demand stays; it does not disappear. Clicking the ID opens the program (pain 17).

#### 2. Portfolio Item — “What are we buying, and who says yes?”

On **Portfolio Item P-1042** (not a new Excel file):

- Structured business case: options including **do nothing** and **reuse existing IdP**.
- TCO lines (build / licence / cloud / support by year) as related **Cost Lines**.
- Named benefit owner + outcome statements — these will become **Outcome** records, not a later retype into ServiceNow (pain 12).
- Architecture / security implications on the same record.
- **Score** against the published scoring model (mandatory/tech-debt work uses the same list).
- **Funding Scenario** (optional this cycle): include/exclude P-1042 vs other bets; specialist identity engineers are overcommitted.
- Board decision: Approve **with conditions** (privacy review before build; reuse corporate IdP). **DoA** picks the authority from value band, not “email the CTO.” Conditions become **Decision Condition** children that must close before Execute.

**Move:** Status → Approved / Conditionally approved. **Baseline** locked (pain 18). Stage can advance only when gate artefacts exist (pain 1) — architecture, security, privacy, production readiness from the **Stage Gate Model** element.

#### 3. Capacity Plan — “Can we staff it?”

Not a replacement for the board; it **constrains** the scenario.

**Capacity Plan** for the identity squad × quarter: supply from team lists, demand rows generated from P-1042’s role/period needs. Binding constraint = scarce identity engineers, not dollars.

**Move:** If the board still wants P-1042, something else is deferred (visible on the scenario), or P-1042 slips. Reallocation of envelopes, if needed, is an approved change — not a quiet spreadsheet edit.

#### 4. Same Portfolio Item, later stages — “Are we delivering?”

P-1042 is now the execution record (we do **not** clone it into a third “program” app).

- Status cadence: missing update is flagged; submit can notify (pain 4).
- RAG: red/amber requires commentary + recovery action (pain 10).
- **Milestones** (including control gates) on the item; slippage vs baseline (pain 2, 11).
- **Risk / Issue / Change Request** apps related to P-1042.
- Progress **read from Jira** (table), actuals **read from ERP/cloud** — teams do not re-enter a second status (pains 2, 5, 13).
- PMO / execs use **exception views** (only items that need attention) instead of building a deck by hand (pain 5).

#### 5. Dependency — “Security is on the critical path”

Lena’s team is not a checkbox.

A **Dependency** record: provider = Security assessment, receiver = P-1042, need-by date. Status starts **Proposed**. Lena **accepts** (or rejects against published lead time). Only then is it committed.

**Move:** If Lena’s forecast slips, status → At risk / Breached; both owners are notified; P-1042 milestones that depend on it are visible. This replaces “we’ll catch it in the steering meeting.”

#### 6. Vendor Engagement — “The SI we hired”

If an integrator is on the work: **Vendor Engagement** related to P-1042. Vendor **name/risk/contract** come from TPRM (table), not a second vendor list. Deliverables and acceptance live here. Spend from ERP.

#### 7. Outcome Record — “Did login actually help?”

When the case was approved, **Outcome** records were already created from Omar’s measures (adoption %, password-reset volume). They **stay open after** P-1042 delivery closes.

**Move:** Actuals from telemetry/finance where possible (pain 3). Omar cannot mark “$2M saved” as realized until finance validates. A **post-implementation review** is triggered on a timer after close. Lessons can feed the next scoring round.

**Net for the PM:** one ID, seven app types at most, hand-offs are **status + related record**, never “export Excel and import to the next tool.”

---

### Story C — Security remediation on the same ranked list

**Person:** Lena raises Demand type **Security remediation** (TLS on payments).

**Move:** Not a side door. If it needs funding/capacity, it becomes a Portfolio Item scored **next to** Omar’s SSO so mandatory work cannot be squeezed out invisibly. Capacity classifies it **Mandatory**, so the command center can show a team that is 50% run / 30% mandatory / 20% change — which is why their “innovation” dates slipped.

**Apps:** Demand → (maybe) Portfolio Item → Capacity classification on the plan. Usually **no** vendor app unless a third party owns the gateway.

---

## 6. Who uses what (day to day)

| Role | Primary app(s) |
|---|---|
| Requester | Demand (My requests) |
| Product / platform owner | Demand inbox + Product element |
| Investment board / finance | Portfolio Item ranked view, scenarios, financials (restricted) |
| PMO / portfolio lead | Portfolio Item execution views, exception list |
| Engineering lead | Portfolio Item (read) + Jira as SoR for tasks |
| Architect / security | Dependencies + gate records on the item |
| Benefit owner | Outcome Record |
| Vendor manager | Vendor Engagement (TPRM for risk) |
| Governance admin | Foundation elements + Governance Change Request |

---

## 7. What we will not promise in v1

- A pretty **network graph** of every dependency in the company (we will ship registers, filters, and “most constrained functions”).
- An AI that **picks the portfolio** for the board.
- Replacing Jira as the engineering backlog, or TPRM as vendor master, or the ERP as books.
- Perfect directory sync on week one (we design the fields and flags; HR feed is an integration wave).

---

## 8. How we will know a wave is done

Each wave should have:

1. Configuration walkthrough (lists, forms, routing).
2. One end-to-end story on realistic data (Story A or B, not empty records).
3. Named roles trained on *their* app.
4. For waves that need it: an integration test (same Portfolio ID visible on Demand and Portfolio Item; Jira readable for overlap).

That matches the workbook’s Configure / UAT / Train / Document / Integrate / Sign-off exit model, scoped **per wave**, not “all eight applications at once.”

---

## 9. Open decisions for the PM to lock

1. Confirm or replace this build order when the SA Slack note is available.
2. **Demand + Portfolio Item** as two apps (recommended) vs three (Demand / Investment / Initiative).
3. v1 scope: one value stream and a handful of products, not the whole estate.
4. Jira vs Azure DevOps as the work-management source.
5. TPRM go-live date (blocks Vendor wave).
6. Is a dependency *graph* in UAT scope, or is the register enough for wave 6?
