# v0.9 — Full Pipeline: One Claude Message, Nine Agents

The grand finale. Every agent from v0.1 to v0.8 runs together in a single pipeline. One message to Claude triggers a price sync, inventory check, supplier bidding, order confirmation and email alerts — end to end, fully automated.

---

## What This Project Does

Ask Claude *"What's in my inventory?"* and the entire supply chain runs automatically:

1. **MCP Tool Call**: Claude initiates `get_inventory`.
2. **Pricing sync**: Pricing Agent syncs market prices to the inventory DB.
3. **Inventory Detection**: Detects low stock (e.g., Monitor and Laptop).
4. **Parallel Bidding**: Inventory Agent runs parallel A2A bids across Suppliers A, B, and C.
5. **Selection & Ordering**: SupplierB wins (best score); Order Agent confirms and records.
6. **Notification**: Notification Agent sends 4 automated HTML emails.
7. **Claude Response**: Claude displays a unified summary of inventory, prices, and actions.

### Architecture

![v0.9 Architecture](/images/mcp_v0.9_architecture.png)

---

## The 9 Agents

| Agent | Port | Role | Protocol |
|---|---|---|---|
| **MCP Server** | stdio | Claude Desktop entry point | MCP |
| **Market API** | 9000 | Live price feed (random walk) | HTTP |
| **Pricing Agent** | 9001 | Syncs market prices to DB | A2A |
| **Inventory Agent** | 8000 | Price updates + restock orchestration | A2A |
| **Supplier A** | 8011 | Fast (2d), expensive (1.2x) | A2A |
| **Supplier B** | 8012 | Balanced (4d, 1.0x) | A2A |
| **Supplier C** | 8013 | Cheap (0.85x), slow (7d) | A2A |
| **Order Agent** | 8001 | Confirms winning bids | A2A |
| **Notification Agent**| 8002 | Sends HTML emails via Gmail | A2A |

---

## End-to-End Latency & Performance

The pipeline coordination across 9 agents adds less than **200ms** total protocol overhead. The primary bottleneck remains Gmail SMTP (~4s per email). If replaced with an async queue, the entire 9-agent chain completes in under **500ms**.

---

## Key Series Insights

Throughout this series, we transitioned from basic tool access to a complex, autonomous multi-agent mesh:
- **Complementary protocols**: MCP for the Human-AI interface, A2A for Agent-Agent coordination.
- **Hidden complexity**: Claude remains a simple operator, unaware of the massive bidding and pricing logic happening behind the scenes.
- **Zero-cost orchestration**: The entire infrastructure runs locally with 100% free open-source tools.
