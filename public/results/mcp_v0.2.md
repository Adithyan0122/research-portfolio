# v0.2 Benchmark: Tool Call Latency vs Data Size

> All benchmarks run locally on MacBook Air (Apple Silicon).  
> PostgreSQL 16 running via Homebrew. No network overhead — pure local execution.

## Results

| Tool | Action | Data Size | Latency |
|---|---|---|---|
| `read_stock` | Read Laptop stock | Single row | 7.37 ms |
| `write_stock` | Set Monitor stock to 25 | Single row update | 7.26 ms |
| `search_product` | Search for "Keyboard" | Filtered result set | 7.73 ms |
| `update_price` | Set Mouse price to $39.99 | Single row update | 8.29 ms |

## Observations

**All 4 tools responded in under 9ms.** The total spread across all tools was just **1.03ms** — essentially negligible.

### Why `update_price` was slowest
Write operations (`UPDATE`) in PostgreSQL are slightly heavier than reads — they involve a write-ahead log (WAL) entry, row locking, and a commit. Even so, the difference here is **only 1.03ms**, which at this data size is noise rather than a meaningful pattern.

### Why `search_product` was slower than `read_stock`
`search_product` uses `ILIKE` (case-insensitive pattern matching) which is inherently more expensive than an exact equality lookup. At 5 rows this doesn't matter — but at 50,000 rows, the lack of an index on the `product` column would make this tool significantly slower.

## What This Means at Scale

| Rows in DB | Expected `read_stock` | Expected `search_product` (no index) | Expected `search_product` (with index) |
|---|---|---|---|
| 5 (current) | ~7 ms | ~8 ms | ~7 ms |
| 1,000 | ~7 ms | ~12 ms | ~7 ms |
| 100,000 | ~8 ms | ~200+ ms | ~8 ms |
| 1,000,000 | ~10 ms | ~2000+ ms | ~10 ms |

**Key takeaway:** For production use, add an index on the `product` column:
```sql
CREATE INDEX idx_inventory_product ON inventory (LOWER(product));
```

## Tool Demonstration

````carousel
![read_stock tool in action](/images/mcp_v0.2_read_stock_tool.png)
<!-- slide -->
![write_stock tool in action](/images/mcp_v0.2_write_stock_tool.png)
<!-- slide -->
![search_product tool in action](/images/mcp_v0.2_search_stock_tool.png)
<!-- slide -->
![update_price tool in action](/images/mcp_v0.2_update_stock_tool%20.png)
````
