# IT Portfolio & Governance — Workbook-Aligned Proposal

**Audience:** internal project team, process owners and stakeholders.
**Status:** proposal for refinement, not an approved implementation design.

## Why this version exists

The first proposal compressed the solution into two lifecycle apps. That was a reasonable product abstraction, but it moved too far from the source packet.

The Functional Requirements explicitly describes **eight governance applications**, and the Acceptance Criteria defines separate exit criteria for each. This version therefore starts with the simplest source-aligned assumption:

> Each workbook application heading maps to one Elementum App.

That assumption still needs confirmation. In particular, the EDB uses “Application” both for process areas and for data objects reused by other process areas.

## The eight proposed Elementum Apps

| # | Workbook application | Primary record | Proposed lifecycle |
|---|---|---|---|
| 1 | Governance Foundation | Governance Model Change Request | Proposed → Review → Approved → Published |
| 2 | Enterprise Demand Intake | Demand Request | Draft → Submitted → Classify → Clarify → Triage → Disposed |
| 3 | Portfolio Prioritization & Investment Decisioning | Investment Decision | Define Case → Assess → Score → Scenario → Board → Baseline |
| 4 | Capacity & Trade-off Planning | Capacity Plan | Draft → Model → Trade-off → Agreed → Locked |
| 5 | Portfolio Execution Command Center | Initiative | Mobilize → Execute → Control → Close |
| 6 | Value Realization & Outcome Tracking | Outcome Record | Defined → Measuring → Validating → Realized → Closed |
| 7 | Enterprise Dependency Management | Dependency | Proposed → Accepted → In Progress → At Risk/Breached → Delivered |
| 8 | Strategic Vendor Management | Vendor Engagement | Scoping → Active → Review → Optimizing → Closed |

## How they work together

```text
Governance Foundation
        ↓ configures all eight

Demand Intake → Prioritization ⇄ Capacity → Execution → Value
                                      ↕
                           Dependency Management
                           Strategic Vendor Management
```

- Demand Intake owns the original request and its disposition.
- Prioritization owns the structured case, score, scenarios, decision and portfolio baseline.
- Capacity tests whether the candidate portfolio is deliverable with available money, teams and scarce skills.
- Execution owns the approved Initiative and its delivery evidence.
- Value keeps outcomes open after delivery closes.
- Dependencies and Vendors run alongside planning and execution when relevant.
- A persistent Portfolio ID relates the records; data is handed off without re-keying.

Not every request traverses the whole suite. An enhancement that belongs on an existing product backlog can end in Demand Intake.

## Supporting entities

The EDB distinguishes several kinds of data:

| EDB / Elementum kind | Proposed use |
|---|---|
| Application | One of the eight user-facing process areas |
| Task | Candidate `AspectTask`: lightweight supporting work such as Cost Line, Milestone, Decision Condition or Assessment |
| Master / Foundational and Reference | Element when Elementum owns configurable reference data; Table when another enterprise system owns it |
| Transactional | Table backed by the source system wherever possible |
| Automation | Deterministic validation, routing, handoff, approval, gate and notification behavior |

The EDB contains **75 Task rows**. This proposal does **not** assume all 75 should be deployed as AspectTasks:

- Strong Task candidates: Cost Line, Milestone, Decision Condition, Assessment, Status Report.
- Likely fields or native behavior: Composite Score, Status History, Classification.
- Likely generated artifacts: Governance Reporting Pack, snapshots.
- Potential external data: some capacity, finance, vendor and telemetry records.

`AspectTask` exists on the platform and in the Terraform provider. It supports fields, records, status options, automations, layouts and relationships, but no stages. The public TypeScript EDK does not currently support it. That is an implementation decision to resolve before build.

## What we need from the client

Each application has explicit configuration and data dependencies:

1. **Foundation:** estate hierarchy, products and owners, objectives, roles, approval thresholds, gate criteria and scoring weights.
2. **Demand:** demand types, forms, mandatory fields, routing, dispositions, triage SLAs and backlog source.
3. **Prioritization:** case templates, cost taxonomy, scoring rubric, board membership and scenario rules.
4. **Capacity:** funding envelopes, team/skill supply, scarce specialists, allocation targets and planning calendar.
5. **Execution:** RAG rubric, reporting cadence, milestones, escalation criteria, governance-pack definition and delivery/finance feeds.
6. **Value:** outcome taxonomy, measures, baselines, targets, validation owners and telemetry.
7. **Dependencies:** shared functions, owners, lead times, capacity, criticality and escalation paths.
8. **Vendors:** sourcing/TPRM and ERP feeds, engagement taxonomy, scorecards and concentration rules.

## What needs confirmation

1. Are the eight headings intended to be exactly eight deployed Elementum Apps?
2. Are EDB rows typed Task intended to be platform `AspectTask` entities?
3. Which Task rows need independent records versus fields, native history or generated output?
4. Is Governance Foundation a user-facing change-control app, or only shared configuration?
5. Is Savings Record owned by Value as a Task, or by the sourcing solution?
6. Are Demand Request and Initiative references in downstream EDB sections relations to upstream apps?
7. Where is the separate process document mentioned by the stakeholder?

The visual site exists to make these questions concrete enough to answer.
