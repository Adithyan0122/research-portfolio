# v0.7 — Supplier Agents: Three Agents Competing for Bids

Build 3 mock Supplier Agents that respond to bid requests via A2A. The Inventory Agent sends bid requests to all 3 simultaneously, scores responses using a weighted formula, picks the winner and confirms the order.

---

## What This Project Does

When stock runs low, the Inventory Agent runs a **live bidding process**:

1. **Parallel Bidding**: Sends requests to all suppliers at once.
2. **Weighted Scoring**: Evaluates bids based on Price (50%), Delivery (30%), and Reliability (20%).
3. **Hard Constraints**: Automatically eliminates suppliers that can't meet the deadline.
4. **Autonomous Selection**: Picks the best supplier and confirms the order via the Order Agent.

### Architecture

![v0.7 Architecture](/images/mcp_v0.7_architecture.png)

---

## The 3 Supplier Profiles

A single codebase (`supplier_agent.py`) mimics three distinct personalities via environment variables:

| Supplier | Profile | Price | Delivery | Reliability |
|---|---|---|---|---|
| **A** | Fast & Expensive | 1.2x | 2 days | 95% |
| **B** | Balanced | 1.0x | 4 days | 90% |
| **C** | Cheap & Slow | 0.85x | 7 days | 80% |

---

## Scoring Formula

```
score = (0.5 × price_ratio) + (0.3 × delivery_ratio) + (0.2 × reliability_penalty)
```
*Lower score wins. Price is the dominant factor (50%).*

---

## Visual Proof

### Inventory Agent — Live Bidding Output

![Inventory Agent](/images/mcp_v0.7_inventory-agent.png)

*The Inventory Agent runs parallel bidding. Supplier C is eliminated for missing the 6-day deadline. Supplier B wins with a balanced score of 0.6914.*

---

## Benchmarks & Insights

| Item | Status | Winner | Bidding Latency (Parallel) |
|---|---|---|---|
| Monitor | ✅ Competition | Supplier B | 113.5ms (Cold) |
| Laptop | ✅ Competition | Supplier B | **39.09ms (Cached)** |

### Key Takeaways
1. **Parallelism is non-negotiable**: Bidding takes the time of the slowest supplier, not the sum of all.
2. **Deadlines are filters, not scores**: A great price means nothing if you can't deliver on time.
3. **Caching compounds**: Second-round bidding was **3x faster** due to cached Agent Cards.
4. **Policy via Math**: The scoring weights (50/30/20) are the business policy encoded as an algorithm.

---

## Tech Stack

- **FastAPI / uvicorn / httpx**: A2A infrastructure.
- **ThreadPoolExecutor**: Concurrent bid collection.
- **PostgreSQL 16**: `supplier_db`.
- **Python 3.13**: Runtime.
