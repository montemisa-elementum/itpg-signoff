# ITPG — Eight-App Coding-Agent Specification

**Audience:** coding agent preparing an Elementum implementation.
**Status:** architecture proposal only. Do not build until the open model decisions are answered.

Load the public `/elementum` and `/elementum-design` playbooks before solution authoring.

## Source authority

Use these client files as the current authority:

- `Requirements & Acceptance Criteria_ IT Porftolio & Governance - Functional Requirements.csv`
- `Requirements & Acceptance Criteria_ IT Porftolio & Governance - Acceptance Criteria.csv`
- `Requirements & Acceptance Criteria_ IT Porftolio & Governance - EDB.csv`
- `Requirements & Acceptance Criteria_ IT Porftolio & Governance - Pain Points.csv`

A separate process document has been referenced but is not in the packet. Do not treat the proposed stages below as final until it is obtained.

## Architecture assumption

Map the eight Functional Requirements headings one-to-one to eight Elementum Apps:

| Ref | App | Namespace | Handle | Primary record | Requirement range |
|---|---|---|---|---|---|
| `governanceFoundation` | Governance Foundation | `governance-foundation` | `GOV` | Governance Model Change Request | GOV-001–026 |
| `enterpriseDemandIntake` | Enterprise Demand Intake | `enterprise-demand-intake` | `DMD` | Demand Request | DMD-001–024 |
| `portfolioPrioritization` | Portfolio Prioritization & Investment Decisioning | `portfolio-prioritization` | `PRI` | Investment Decision | PRI-001–025 |
| `capacityPlanning` | Capacity & Trade-off Planning | `capacity-tradeoff-planning` | `CAP` | Capacity Plan | CAP-001–023 |
| `portfolioExecution` | Portfolio Execution Command Center | `portfolio-execution` | `EXE` | Initiative | EXE-001–026 |
| `valueRealization` | Value Realization & Outcome Tracking | `value-realization` | `VAL` | Outcome Record | VAL-001–024 |
| `enterpriseDependencies` | Enterprise Dependency Management | `enterprise-dependencies` | `DEP` | Dependency | DEP-001–020 |
| `strategicVendorManagement` | Strategic Vendor Management | `strategic-vendor-management` | `SVM` | Vendor Engagement | SVM-001–025 |

Handles and namespaces are proposals; confirm before first apply because they are immutable.

## Cross-app flow

```text
Governance Foundation
        ↓ shared configuration
Demand Intake → Prioritization ⇄ Capacity → Execution → Value
                                      ↕
                           Dependencies and Vendors
```

Use a persistent Portfolio ID to relate Demand Request, Investment Decision, Capacity demand/allocation, Initiative, Outcome Record, Dependency and Vendor Engagement. Do not duplicate an upstream app inside a downstream application because the EDB lists its record as an Application dependency.

## Entity classification

### Apps

The eight process areas above have stages, status and a primary record. They may host automations, agents, views and layouts.

### AspectTasks — unresolved authoring decision

The EDB contains 75 rows with `Table Type = Task`. The Elementum platform exposes `AspectTask`.

Current observed contract:

- Supports fields, records, status options, automations, layouts and relationships.
- Does not support stages.
- Does not host AI agents.
- Is distinct from tasks inside an automation workflow.

Before implementation:

1. Confirm the client/product intent for EDB Task rows.
2. Confirm the approved authoring path for AspectTask entities.
3. Do not silently substitute child Apps or Elements.
4. Do not implement all 75 mechanically; classify each by behavior.

Candidate classification:

- `AspectTask`: repeated lightweight owned work with independent status, owner or dates.
- Field/calculation: scalar derived values such as Composite Score.
- Native platform behavior: status history.
- Generated artifact/view: governance reporting pack or snapshot where no editable record is required.
- Table: transactional facts mastered in another system.

### Elements

Use Elements for reusable, client-maintained configuration without a lifecycle:

- Portfolio hierarchy, product/platform register and strategic objectives
- Demand/investment taxonomy and routing/reference codes
- Architecture domains, principles and standards
- Delegation thresholds, value/risk bands
- Stage-gate models and gate criteria
- Scoring models and weights
- Teams, roles, skills, shared functions and lead-time references
- Outcome, engagement and commercial reference data

Use dynamic references to Element records. Do not hard-code client products, authority labels, organizational units, gate names or scoring weights.

### Tables

Use Tables for data mastered outside Elementum:

- Application/service catalogue
- Organization, business unit, cost centre, currency and fiscal calendar
- Workforce and directory
- Product backlog, service requests and engineering work items
- Releases, deployments and delivery-flow measures
- Finance actuals, commitments, invoices and cloud consumption
- Outcome actuals, telemetry and adoption
- Vendor, contract, risk and SLA data from sourcing/TPRM

Do not author a Table until its CloudLink and client-owned join key are identified.

### Automations

Automations perform deterministic transitions:

- Validate submission and mandatory data
- Classify and route
- Create related handoff records without re-entry
- Calculate or persist identifiers
- Start approval and enforce delegation
- Prevent progression while conditions/gates are unresolved
- Lock baselines
- Detect overdue updates, slippage, constraint breaches and dependency risk
- Notify owners and generate scheduled artifacts

Agents may summarize, classify, challenge and draft. They do not record dispositions, approvals, gate passes or realized value without a deterministic human-confirmed automation.

## Proposed app lifecycles

These are placeholders until the process document is received:

| App | Proposed stages |
|---|---|
| Governance Foundation | Proposed → Review → Approved → Published |
| Enterprise Demand Intake | Draft → Submitted → Classify → Clarify → Triage → Disposed |
| Prioritization | Define Case → Assess → Score → Scenario → Board → Baseline |
| Capacity | Draft → Model → Trade-off → Agreed → Locked |
| Execution | Mobilize → Execute → Control → Close |
| Value | Defined → Measuring → Validating → Realized → Closed |
| Dependencies | Proposed → Accepted → In Progress → At Risk/Breached → Delivered |
| Vendors | Scoping → Active → Review → Optimizing → Closed |

## EDB Task inventory by owning app

### Governance Foundation

Delegation Record; Gate Model Version; Objective Cascade Link; Role Assignment; Scoring Model Version.

### Enterprise Demand Intake

Clarification Request; Classification Result; Demand Attachment; Demand Status History; Duplicate Match Candidate; Initial Sizing Estimate; Run / Change Classification; Triage Disposition.

### Portfolio Prioritization & Investment Decisioning

Architecture & Security Assessment; Assessor Score; Baseline Change Request; Business Case; Business Case Version; Composite Score; Cost Line; Decision Condition; Funding Scenario; Investment Board Meeting; Option Analysis; Outcome Statement; Portfolio Baseline; Scenario Line.

### Capacity & Trade-off Planning

Capacity Demand; Capacity Supply; Constraint Breach; Funding Allocation; Funding Envelope; Net Capacity Position; Planning Cycle Snapshot; Run / Change / Mandatory Allocation; Specialist Capacity Pool; Trade-off Option; Unplanned Operational Demand.

### Portfolio Execution Command Center

Change Request; Control Gate Record; Cost Forecast; Escalation Item; Governance Reporting Pack; Issue; Milestone; Milestone Baseline; Period Status Report; Portfolio Snapshot; Risk.

### Value Realization & Outcome Tracking

Double-Count Flag; Evidence Item; Lessons Learned Note; Outcome Baseline; Outcome Re-forecast; Outcome Target Profile; Post-Implementation Review; Validation Outcome.

### Enterprise Dependency Management

Breach Record; Dependency Acceptance; Dependency Map Snapshot; Dependency Status History; Downstream Impact Assessment; Milestone; Resequencing Option; Shared Function Capacity; Shared Function Load.

### Strategic Vendor Management

Concentration Exposure; Deliverable Acceptance; Key-Person Dependency; Realized Value Attribution; Spend Forecast; Vendor Commitment; Vendor Milestone; Vendor Optimization Action; Vendor Performance Score.

## Required client decisions before implementation

1. Confirm the eight headings are literally eight Elementum Apps.
2. Confirm AspectTask intent for EDB Task rows.
3. Classify the 75 Task candidates.
4. Resolve extra EDB Application rows:
   - Demand Request under Prioritization → proposed relation to Demand.
   - Initiative under Value, Dependency and Vendor → proposed relation to Execution.
   - Savings Record under Value → unresolved Task versus sourcing-system relation.
5. Obtain and reconcile the process document.
6. Confirm app stages, status options, owners, approval routes and exception paths.
7. Name each system of record, CloudLink, minimum dataset and join key.

## Implementation order after approval

1. Confirm identities and app ownership.
2. Confirm the AspectTask authoring strategy.
3. Build shared Elements and organization groups.
4. Build the eight Apps with stages/statuses, at least one view and stage layouts.
5. Build classified AspectTasks and relations.
6. Build cross-app handoff automations.
7. Add Tables only when CloudLinks exist.
8. Add access policies.
9. Add agents last.
10. Validate every app against its own Configure, UAT, Train, Document, Integration and Sign-off acceptance criteria.

## Non-negotiable rules

- No platform IDs in authored source.
- No client names, products, authority labels or tool brands in core bag keys.
- Do not duplicate master data owned by an external source.
- Do not call a field or Element an AspectTask merely to avoid an authoring limitation.
- Do not collapse the eight apps back into two without explicit process-owner approval.
- Do not use an undocumented authoring path for Task entities.
- At least one list view per app; stage-specific layouts where the job changes.
- Every automation is published with an explicit revision.
