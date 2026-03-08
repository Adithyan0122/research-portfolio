# v0.8 — Pricing Agent: Dynamic Repricing with Latency vs Accuracy Tradeoff

Build a Pricing Agent that watches a live market price feed, detects drift, and automatically updates inventory prices via Agent-to-Agent (A2A) communication.

---

## The Problem v0.8 Solves

In a real supply chain, market prices move constantly. If your database uses stale pricing, your supplier quotes and purchasing decisions will be flawed. v0.8 introduces a **Pricing Agent** that keeps the inventory database in sync with a live (simulated) market feed.

---

## What This Project Does

1. **Market API**: Generates live prices via a random walk formula (ticks every 1s).
2. **Pricing Agent**: Polls the market every N seconds, compares market vs DB prices.
3. **Drift Detection**: If price drift exceeds a **5% threshold**, it fires an A2A update to the Inventory Agent.
4. **Inventory Agent**: Receives the update and persists the new price in `pricing_db`.
5. **Benchmarking**: Measures the tradeoff between update frequency (latency) and price accuracy.

### Architecture

![v0.8 Architecture](/images/mcp_v0.8_architecture.png)

---

## Latency vs Accuracy Benchmark

I tested three repricing intervals (2s, 5s, 10s) over a 30-second window to find the optimal tradeoff:

| Interval | Checks | A2A Updates | Avg Price Error | Avg Latency |
|---|---|---|---|---|
| **2s** | 15 | 24 | **5.97%** | 49.1ms |
| **5s** | 6 | 11 | **10.45%** | 40.22ms |
| **10s** | 3 | 9 | **19.65%** | 53.03ms |

### Key Findings
- **Non-linear Error**: Doubling the interval roughly doubles the error. Time is the enemy of accuracy in a volatile market.
- **Flat Latency**: A2A protocol overhead remains constant (~40-50ms) regardless of call frequency.
- **Threshold is King**: The drift threshold (5%) is the primary lever for controlling A2A call volume, while the interval controls responsiveness.

---

## Random Walk Price Dynamics

The market simulator uses a stochastic formula:
`new_price = old_price × (1 + drift + volatility × random_normal())`
- **Drift (0.1%)**: Simulates gradual inflation.
- **Volatility (2%)**: Simulates random market shocks.

---

## Tech Stack

- **FastAPI / uvicorn / httpx**: A2A communication layer.
- **PostgreSQL 16**: `pricing_db`.
- **Python threading**: For the background market tick simulator.
- **Python 3.13**: Runtime.
