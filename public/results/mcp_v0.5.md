# v0.5 — Agent Cards: Three Agents Discovering Each Other

Build 3 production-grade agents with rich Agent Cards, test discovery between all of them, and find out where Agent Cards break.

---

## What Are Agent Cards?

In v0.5 we transition from basic metadata to **machine-readable contracts**. A proper Agent Card tells other agents:

- What the agent can do (`capabilities`)
- How to call each skill (`input_schema`)
- What to expect back (`output_schema`)
- How to authenticate (`authentication`)

---

## What This Project Does

Three agents run independently, discover each other via Agent Cards, and coordinate a full restock workflow:

1. **Inventory Agent**: Monitors stock, discovers Order + Notification agents, triggers restock.
2. **Order Agent**: Receives restock requests, persists orders, notifies Notification Agent.
3. **Notification Agent**: Sends HTML emails via Gmail SMTP for inventory events.

### Architecture

![v0.5 Architecture](/images/mcp_v0.5_architecture.png)

---

## Where Agent Cards Work — and Where They Break

### ✅ The Good
- **Runtime negotiation**: Agents decide whether to talk based on capabilities.
- **Self-documenting**: The card is the contract (OpenAPI for Agents).
- **Decoupled**: Only URL is needed; implementation can change.

### ❌ The Bad
- **No enforcement**: Schemas are documentation, not hard validation.
- **No versioning**: Breaking changes are invisible to callers.
- **Cards can "lie"**: Advertise skills that actually return errors.

---

## Benchmarks

| Step | Latency |
|---|---|
| Discover Order Agent | 36.83ms |
| Discover Notification Agent | 16.52ms |
| Send low_stock alert (total) | ~4.5s* |
| Place order (total) | ~3.6s* |

*\*High latency is due to Gmail SMTP sending. Pure A2A protocol overhead remains <30ms.*

---

## Key Insight

**Email is the bottleneck, not A2A.** By replacing synchronous SMTP with an async task queue or webhook, the entire multi-agent workflow would complete under 200ms. Agent Cards are the foundation for this orchestration.

---

## Tech Stack

- **FastAPI / uvicorn**: Agent HTTP servers
- **httpx**: A2A communication
- **PostgreSQL 16**: `supply_db`
- **Gmail SMTP**: Email alerts
