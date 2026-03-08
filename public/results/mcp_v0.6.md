# v0.6 — MCP + A2A Together: Claude Triggers a Real Pipeline

Combine MCP and A2A for the first time. One message to Claude reads the inventory, detects low stock, and automatically fires a full restock pipeline — alerts, orders, and emails — with zero extra prompting.

---

## What Changed from v0.5

| | v0.5 | v0.6 |
|---|---|---|
| **Trigger** | Manual script | **Claude Desktop Question** |
| **Entry point** | Python script | **MCP tool call** |
| **Protocol** | A2A only | **MCP + A2A together** |
| **Claude awareness** | None | **Sees inventory + pipeline results** |

---

## What This Project Does

You ask Claude *"What's in my inventory?"* — and this happens automatically:

1. **Claude calls get_inventory via MCP**
2. **MCP server reads pipeline_db** and detects low stock items.
3. **Fires A2A alerts** to the Notification Agent.
4. **Fires A2A orders** to the Order Agent.
5. **Order Agent notifies Notification Agent** upon completion.
6. **Claude responds** with the inventory table and a pipeline summary.

### Architecture

![v0.6 Architecture](/images/mcp_v0.6_architecture.png)

---

## The Key Bridge: `trigger_restock_pipeline()`

This function inside the MCP server is what makes v0.6 different. It bridges the MCP world (Claude interface) with the A2A world (autonomous agents).

```python
def trigger_restock_pipeline(product, quantity, price):
    # Step 1 — Alert via A2A
    send_a2a(NOTIFICATION_AGENT_URL, {
        "task": "send_alert",
        "event_type": "low_stock",
        "product": product,
        "details": {"quantity": quantity}
    })

    # Step 2 — Restock via A2A
    send_a2a(ORDER_AGENT_URL, {
        "task": "place_order",
        "product": product,
        "quantity": RESTOCK_QUANTITY
    })
```

---

## Visual Proof

### Claude Desktop — One Question, Full Pipeline

![Claude response](/images/mcp_v0.6_claude-response.png)

*Claude reads the inventory via MCP, detects low stock, and automatically triggers the full A2A restock pipeline. Notice the seamless transition from tool call to pipeline execution.*

---

## End-to-End Latency Breakdown

| Step | Latency |
|---|---|
| Claude → MCP tool call | ~10ms |
| MCP → PostgreSQL query | ~8ms |
| MCP → A2A alerts (×2) | ~8,000ms* |
| MCP → A2A orders (×2) | ~7,000ms* |
| **Total wall time** | **~15–20 seconds** |

*\*Dominated by synchronous Gmail SMTP. Pure protocol latency (MCP + A2A) is under 100ms total.*

---

## Key Insight

**Claude becomes an orchestrator without knowing it.** Claude doesn't know A2A exists; it just calls a tool. This is a powerful pattern where the AI acts as a natural language interface to complex, independent automated workflows.
