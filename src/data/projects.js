// ============================================================================
// DATA LAYER — Edit this file to add new series, versions, or update content
// ============================================================================

export const siteConfig = {
  // TODO: replace with your name
  name: "Dhanush Adithyan",
  // TODO: replace with your tagline
  tagline: "Chasing knowledge from first principles. Building and dissecting AI systems.",
  // TODO: replace with your email
  email: "dhanushadithyanp@gmail.com",
  // TODO: replace with your GitHub URL
  github: "https://github.com/Adithyan0122",
  linkedin: "https://www.linkedin.com/in/pdhanushadithyan/",
};

export const aboutData = {
  // TODO: replace with your bio
  identity: {
    name: "Dhanush Adithyan",
    photo: "/images/profile.jpg", // TODO: add your photo to public/images/
    bio: "I'm a researcher and engineer obsessed with building AI systems from first principles. I believe in learning by building — every component, every formula, every failure. This portfolio documents that journey, version by version.",
  },

  education: [
    {
      institution: "UVCE, Bangalore",
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      years: "2021 — 2025", // Guessed years based on internships
      highlight: "Major in AIML, actively involved in IEEE UVCE coding community.",
    },
    {
      institution: "Excel Public School, Mysore",
      degree: "High School",
      years: "2019 — 2021",
      highlight: "Foundation in science and mathematics.",
    },
  ],

  experience: [
    {
      company: "SAP Labs India, Bangalore",
      role: "Associate Platform Engineer",
      duration: "July 2025 — Present",
      bullets: [
        "Developing 'Cloud Autonomy', a tool for orchestrating VM builds for payroll across global regions (Azure/GCP).",
        "Implementing advanced RBAC systems using Go for backend and Vue for frontend.",
        "Contributing to end-to-end automation of distributed infrastructure orchestration.",
      ],
    },
    {
      company: "SAP Labs India, Bangalore",
      role: "DevOps Intern",
      duration: "Jan 2025 — July 2025",
      bullets: [
        "Automated VM build processes for payroll operations.",
        "Built the user interface for 'Cloud Orchestration' tool using Vue.js.",
      ],
    },
  ],

  achievements: [
    { icon: "🏆", title: "CodeFury 6.0 Winner", description: "1st place at IEEE UVCE hackathon", unlocked: true },
    { icon: "🌍", title: "NY Academy of Sciences", description: "Runners up in Big Data: Think Global Act Local challenge (2018)", unlocked: true },
    { icon: "🏗️", title: "Hack-a-Maze Organizer", description: "Organized national level event at IEEE Impetus 2022", unlocked: true },
  ],

  hobbies: [
    { icon: "🎸", label: "Music Production" },
    { icon: "🏊", label: "Swimming" },
    { icon: "⚽", label: "Football" },
    { icon: "🎸", label: "Guitar" },
  ],
};

export const seriesData = [
  {
    slug: "mcp-supply-chain",
    title: "MCP To A2A",
    description:
      "A completed 9-part series building toward an AI-powered supply chain system using Model Context Protocol (MCP) and Agent-to-Agent (A2A) orchestration. From raw stdio to a nine-agent autonomous mesh.",
    githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a",
    versions: [
      {
        version: "v0.1",
        subtitle: "Raw MCP",
        status: "completed",
        whatChanged: "Built a local MCP server from scratch connecting Claude Desktop to a SQLite database using stdio — no frameworks, no cloud.",
        whatYouPublish: "I built my first MCP server from scratch. Here's what surprised me.",
        keyInsight: "MCP doesn't use HTTP; it uses stdio pipes (stdin/stdout). This makes it entirely offline and incredibly fast, but requires careful handling of stdout logs.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.1-Raw-MCP",
        architecture: {
          description: "The system uses a 3-layer architecture: Claude Desktop (AI Interface) <-> server.py (MCP Server) <-> inventory.db (SQLite). Communication happens over JSON-RPC via stdio pipes.",
          imagePath: "/images/mcp_v0.1_architecture.png",
        },
        codeSnippet: `# Always log to stderr to avoid breaking the MCP pipe
print("debug message", file=sys.stderr)

# Use absolute paths for the database
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "inventory.db")`,
        result: "Successfully exposed `get_inventory` and `get_product` tools to Claude Desktop. Achieved $0 cost and 100% local execution.",
      },
      {
        version: "v0.2",
        subtitle: "MCP Tools",
        status: "completed",
        whatChanged: "Expand the raw MCP server from v0.1 into a proper 4-tool system backed by PostgreSQL. Every tool call is benchmarked with real latency data.",
        whatYouPublish: "Benchmark table: tool call latency vs. data size",
        keyInsight: "Structured error handling and database indexing are critical for scaling MCP tools. Write operations (UPDATE) are slightly heavier than reads due to WAL and row locking.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.2-MCP-Tools",
        analysisPath: "/results/mcp_v0.2.md",
        architecture: {
          description: "Transitioned from SQLite to PostgreSQL 16. The server now exposes 4 tools (read_stock, write_stock, search_product, update_price) and logs latency for every operation.",
          imagePath: "/images/mcp_v0.2_architecture.png",
        },
        codeSnippet: `# PostgreSQL connection and timing
start_time = time.time()
cur.execute("SELECT * FROM inventory WHERE product = %s", (product,))
result = cur.fetchone()
latency_ms = (time.time() - start_time) * 1000`,
        result: "All 4 tools responded in under 9ms locally. search_product (ILIKE) is the most sensitive to data size without indexing.",
      },
      {
        version: "v0.3",
        subtitle: "Production-Grade MCP",
        status: "completed",
        whatChanged: "Scaled the v0.2 system into a production-ready server with connection pooling, structured logging, API key authentication, and full Docker containerization.",
        whatYouPublish: "v0.3 — MCP Server: Production-Grade Claude + PostgreSQL in Docker",
        keyInsight: "Transitioning from one-connection-per-call to a managed pool (SimpleConnectionPool) eliminates DB overhead at scale. Structured logging to stderr ensures Claude remains connected while providing deep visibility into server health.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.3-MCP-Server",
        architecture: {
          description: "The v0.3 architecture introduces a Dockerized environment where the MCP server and PostgreSQL 16 live in a private network. It features a connection pool (min=1, max=5) and a 3-layer error handling system that catches validation, database, and unexpected exceptions without crashing the stdio pipe.",
          imagePath: "/images/mcp_v0.3_architecture.png",
        },
        codeSnippet: `# Connection Pooling & Three-Layer Error Handling
db_pool = psycopg2.pool.SimpleConnectionPool(minconn=1, maxconn=5, **DB_CONFIG)

try:
    with db_pool.getconn() as conn:
        # ... logic ...
except ValueError as e:
    log.warning(f"[tool] Validation error: {e}")
except psycopg2.Error as e:
    log.error(f"[tool] Database error: {e}")
except Exception as e:
    log.error(f"[tool] Unexpected error: {e}")`,
        result: "Successfully containerized the entire stack. Validated that DB connection drops are handled gracefully by the pooling logic, returning structured JSON errors to Claude instead of crashing the process.",
      },
      {
        version: "v0.4",
        subtitle: "Raw A2A",
        status: "completed",
        whatChanged: "Introduced Agent-to-Agent (A2A) communication where the Inventory Agent autonomously pings the Order Agent to place restock orders without human intervention.",
        whatYouPublish: "v0.4 — Raw A2A: Two Agents Talking to Each Other",
        keyInsight: "A2A overhead per call is essentially zero (0.3ms). The only real cost is the one-time discovery step (~49ms). Once an agent knows where another agent is, talking to it is just as fast as a direct API call.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.4-Raw-A2A",
        analysisPath: "/results/mcp_v0.4.md",
        architecture: {
          description: "Two agents run independently as HTTP servers (FastAPI). The Inventory Agent fetches the Order Agent's card at `/.well-known/agent.json` (discovery) before sending restock requests to `/a2a` (task execution).",
          imagePath: "/images/mcp_v0.4_architecture.png",
        },
        codeSnippet: `# A2A Task Request format
{
  "task": "place_order",
  "product": "Laptop",
  "quantity": 20
}

# A2A Discovery: Fetching the Agent Card
response = await client.get(f"{ORDER_AGENT_URL}/.well-known/agent.json")
agent_card = response.json()`,
        result: "The Inventory Agent successfully detected a problem and fixed it by talking to another agent. Benchmarks showed A2A discovery takes ~49ms (one-time) and task calls take ~24ms, matching direct API speeds.",
      },
      {
        version: "v0.5",
        subtitle: "Agent Cards",
        status: "completed",
        whatChanged: "Built three production-grade agents (Inventory, Order, Notification) that discover each other via rich Agent Cards and coordinate a full restock workflow autonomously.",
        whatYouPublish: "v0.5 — Agent Cards: Three Agents Discovering Each Other",
        keyInsight: "Agent Cards are contracts, not guarantees. While they provide machine-readable schemas (OpenAPI for agents), they don't yet enforce validation or versioning at the protocol level.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.5-Agent-Cards",
        analysisPath: "/results/mcp_v0.5.md",
        architecture: {
          description: "A three-agent mesh using A2A discovery. Each agent (Inventory, Order, Notification) publishes an Agent Card at `/.well-known/agent.json`. The Inventory Agent orchestrates by fetching these cards once and caching them for subsequent calls.",
          imagePath: "/images/mcp_v0.5_architecture.png",
        },
        codeSnippet: `# Rich Agent Card Skill Schema
{
  "name": "place_order",
  "input_schema": {
    "type": "object",
    "properties": {
      "product":  { "type": "string" },
      "quantity": { "type": "integer" }
    }
  }
}

# A2A Discovery Caching
if not agent_card_cache.get(agent_url):
    agent_card_cache[agent_url] = await fetch_card(agent_url)`,
        result: "Autonomous coordination between 3 agents completed with $0 cost. Discovery latency was ~53ms total, while email sending via Gmail SMTP became the primary bottleneck (~4s per-call).",
      },
      {
        version: "v0.6",
        subtitle: "MCP + A2A Together",
        status: "completed",
        whatChanged: "For the first time, combined MCP and A2A. Claude Desktop calls an MCP tool that automatically triggers a full A2A restock pipeline across multiple agents.",
        whatYouPublish: "v0.6 — MCP + A2A Together: Claude Triggers a Real Pipeline",
        keyInsight: "Claude becomes an orchestrator without knowing it. MCP handles the human-to-AI interface, while A2A handles the AI-to-agent coordination. The tool becomes a bridge to autonomous workflows.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.6-MCP-A2A",
        analysisPath: "/results/mcp_v0.6.md",
        architecture: {
          description: "One user message to Claude triggers an MCP tool call (`get_inventory`). The MCP server reads the DB and, upon detecting low stock, launches A2A alerts to the Notification Agent and orders to the Order Agent.",
          imagePath: "/images/mcp_v0.6_architecture.png",
        },
        codeSnippet: `# The Bridge: MCP Tool calls A2A Pipeline
@mcp.tool()
async def get_inventory():
    items = db.query("SELECT * FROM inventory")
    for item in items:
        if item.quantity < THRESHOLD:
            # Fire and forget A2A pipeline
            trigger_restock_pipeline(item.product, item.quantity)`,
        result: "Successfully fully automated the supply chain entry loop. One question in Claude Desktop results in 4 emails and 2 orders executed autonomously in ~20s wall time.",
      },
      {
        version: "v0.7",
        subtitle: "Supplier Agents",
        status: "completed",
        whatChanged: "Implemented a live bidding system where the Inventory Agent sends parallel bid requests to three Supplier Agents, scores them based on a weighted formula, and picks a winner.",
        whatYouPublish: "v0.7 — Supplier Agents: Three Agents Competing for Bids",
        keyInsight: "Deadlines are filters, not scores. A supplier with the best price (Supplier C) is useless if they can't meet the hard delivery constraint. Parallelism reduces bidding latency from sequential sum to max-of-one.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.7-Supplier-Agents",
        analysisPath: "/results/mcp_v0.7.md",
        architecture: {
          description: "A competitive multi-agent flow. The Inventory Agent orchestrates parallel A2A bid requests to Suppliers A, B, and C. It applies a 50/30/20 weighted scoring model to select the winning bid based on price, delivery, and reliability.",
          imagePath: "/images/mcp_v0.7_architecture.png",
        },
        codeSnippet: `# Weighted Bidding Formula
score = (0.5 * price_ratio) + (0.3 * delivery_ratio) + (0.2 * (1 - reliability))

# Parallel Bid Collection
with ThreadPoolExecutor() as executor:
    bids = list(executor.map(fetch_bid, supplier_urls))`,
        result: "Successfully implemented autonomous decision-making. Supplier B emerged as the consistent winner due to its balanced profile, while the system achieved ~39ms bidding latency with cached Agent Cards.",
      },
      {
        version: "v0.8",
        subtitle: "Pricing Agent",
        status: "completed",
        whatChanged: "Built a Pricing Agent that watches a live market price feed (random walk), detects drift > 5%, and automatically synchronizes inventory prices via A2A.",
        whatYouPublish: "v0.8 — Pricing Agent: Dynamic Repricing with Latency vs Accuracy Tradeoff",
        keyInsight: "Repricing accuracy degrades non-linearly with the polling interval. Threshold filtering is the primary lever for controlling A2A call volume, while the interval controls responsiveness. A 5s interval was found to be the 'sweet spot' for 2% market volatility.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.8-Pricing-Agent",
        analysisPath: "/results/mcp_v0.8.md",
        architecture: {
          description: "A dynamic repricing loop. The Pricing Agent polls a simulated Market API (stochastic random walk) every N seconds. If the market price drifts >5% from the database, it fires an A2A update to the Inventory Agent.",
          imagePath: "/images/mcp_v0.8_architecture.png",
        },
        codeSnippet: `# Random Walk Formula
new_price = old_price * (1 + drift + volatility * random.gauss(0, 1))

# A2A Drift Update
if abs(market_price - db_price) / db_price > THRESHOLD:
    await send_a2a_update(product, market_price)`,
        result: "Benchmarked 2s, 5s, and 10s intervals. Found that a 2s interval yields 5.97% error while 10s jumps to 19.65% error. A2A protocol latency remains flat at ~49ms regardless of frequency.",
      },
      {
        version: "v0.9",
        subtitle: "Full Pipeline",
        status: "completed",
        whatChanged: "The grand finale. Every agent from v0.1 to v0.8 runs together in a single pipeline. One message to Claude triggers a price sync, inventory check, supplier bidding, order confirmation and email alerts — end to end, fully automated.",
        whatYouPublish: "v0.9 — Full Pipeline: One Claude Message, Nine Agents",
        keyInsight: "MCP and A2A together cover the full stack — human → AI → agents → actions. One tool call can trigger a cascade across 9 agents, completely hiding the complexity from the user while delivering a fully automated supply chain workflow.",
        githubUrl: "https://github.com/Adithyan0122/mcp-to-a2a/tree/main/v0.9-Full-Pipeline",
        analysisPath: "/results/mcp_v0.9.md",
        architecture: {
          description: "You ask Claude 'What's in my inventory?' and it triggers an MCP tool call. This initiates a Pricing sync, checks for low stock, runs parallel A2A bidding across Suppliers A, B, and C, confirms the order with the winner (Supplier B), and sends 4 HTML emails via the Notification Agent.",
          imagePath: "/images/mcp_v0.9_architecture.png",
        },
        codeSnippet: `# Entry Point: Claude Tool triggers the 9-Agent Pipeline
@mcp.tool()
async def get_inventory():
    # 1. Sync Market Prices (A2A)
    await pricing_agent.sync()
    
    # 2. Check stock & trigger restock
    items = db.get_low_stock()
    for item in items:
        # 3. Parallel Bidding + Ordering + Alerts (A2A)
        await inventory_agent.orchestrate_restock(item)`,
        result: "Successfully automated the entire supply chain. One message triggers 9 agents, resulting in price synchronization, supplier selection, and 4 automated emails in under 500ms protocol overhead (dominated by SMTP latency).",
      },
    ],
  },
  {
    slug: "rag",
    title: "Vector-2-Graph RAG",
    description:
      "A 10-part deep dive into Retrieval-Augmented Generation — evolving from raw vector retrieval to structured graph-based knowledge synthesis. Every version ships. Every lesson is documented.",
    githubUrl: "https://github.com/Adithyan0122/Vector-To-Graph-RAG",
    versions: [
      {
        version: "v0.1",
        subtitle: "Baby RAG",
        status: "completed",
        whatChanged: "Raw implementation, no frameworks. Built TF-IDF, cosine similarity, and chunking from scratch using only NumPy.",
        whatYouPublish: "I built RAG with just NumPy. Here's what I learned.",
        keyInsight: "Understanding the math behind retrieval is more valuable than any framework. TF-IDF alone gets you surprisingly far on domain-specific text.",
        githubUrl: "https://github.com/Adithyan0122/Vector-To-Graph-RAG/tree/main/v0.1-Baby-RAG",
        pdfPath: "/pdfs/rag/v0.1.pdf",
        analysisPath: "/results/v0.1.md",
        codeSnippet: `# Cosine Similarity — the heart of retrieval
def cosine_similarity(vec_a, vec_b):
    dot  = np.dot(vec_a, vec_b)
    norm = np.linalg.norm(vec_a) * np.linalg.norm(vec_b)
    return 0.0 if norm == 0 else dot / norm`,
        result: "Achieved 0.35 average cosine similarity on the demo corpus with pure TF-IDF vectors. Faithfulness score of 1.0 — the LLM stays grounded when given good context.",
      },
      {
        version: "v0.2",
        subtitle: "Chunking Comparator",
        status: "completed",
        whatChanged: "Tested 4 chunking strategies — fixed-size, sentence-based, paragraph-based, and semantic. Built a side-by-side comparator UI.",
        whatYouPublish: "Benchmark table: strategy vs. retrieval accuracy",
        keyInsight: "Paragraph-based splitting beats Fixed-size for structured documents when using sparse retrievers (TF-IDF). Semantic chunking requires neural embeddings to truly outshine simple splits.",
        githubUrl: "https://github.com/Adithyan0122/Vector-To-Graph-RAG/tree/main/v0.2-Chunking-Comparator",
        pdfPath: "/pdfs/rag/v0.2.pdf",
        analysisPath: "/results/v0.2.md",
        codeSnippet: `# Multi-strategy chunking
def chunk(self, text, strategy="fixed_size"):
    if strategy == "paragraph":
        return re.split(r'\\n\\s*\\n', text.strip())
    # ... other strategies`,
        result: "Paragraph-based strategy achieved 100% Hit Rate on the demo corpus. Fixed-size (baseline) hit 20%, while Sentence/Semantic splits failed due to sparse vector collisions.",
      },
      {
        version: "v0.3",
        subtitle: "Full App & Persistence",
        status: "completed",
        whatChanged: "Modernized into a robust app with PDF support, disk-backed persistence (NumPy/JSON), and Neural Embeddings as the default.",
        whatYouPublish: "Neural retrieval vs. TF-IDF baseline + Persistence breakdown",
        keyInsight: "Neural embeddings (MiniLM) solved the 0% Hit Rate bottleneck for small semantic chunks. Persistence reduced 'warm-up' latency from 10s to 2ms.",
        githubUrl: "https://github.com/Adithyan0122/Vector-To-Graph-RAG/tree/main/v0.3-Full-App",
        pdfPath: "/pdfs/rag/v0.3.pdf",
        analysisPath: "/results/v0.3.md",
        codeSnippet: `# Persistent Vector Store
def save(self, path):
    np.save(os.path.join(path, "matrix.npy"), self.matrix)
    with open(os.path.join(path, "metadata.json"), "w") as f:
        json.dump(meta, f)`,
        result: "Neural retrieval achieved 100% Hit Rate on paragraph splits. Persistence enabled instant knowledge base reloading across sessions.",
      },
      {
        version: "v0.4",
        subtitle: "Hybrid Search",
        status: "in-progress",
        whatChanged: "Added BM25 alongside dense retrieval, fused results using Reciprocal Rank Fusion (RRF).",
        whatYouPublish: "Precision/recall comparison chart",
        keyInsight: "BM25 catches exact keyword matches that dense retrieval misses. RRF fusion gives you the best of both worlds with zero learned parameters.",
        githubUrl: "https://github.com/Adithyan0122/Vector-To-Graph-RAG/tree/main/v0.4-Hybrid-Search", // Assumed path
        pdfPath: "/pdfs/rag/v0.4.pdf",
        codeSnippet: `# Reciprocal Rank Fusion
RRF_score(d) = Σ 1 / (k + rank_i(d))
# k=60 is standard, merge rankings from BM25 + dense`,
        result: "Hybrid search improved recall@5 by 31% over dense-only retrieval. The fusion was especially effective on technical queries with specific terminology.",
      },
      {
        version: "v0.5",
        subtitle: "Query Transform",
        status: "locked",
        whatChanged: "Implemented HyDE (Hypothetical Document Embeddings), multi-query expansion, and query rewriting using the LLM.",
        whatYouPublish: "Side-by-side query result comparisons",
        keyInsight: "HyDE is magic for vague queries — generating a hypothetical answer and searching for it retrieves far better context than the raw question.",
        githubUrl: "",
        pdfPath: "/pdfs/rag/v0.5.pdf",
        codeSnippet: `# HyDE: search with a hypothetical answer
hypothetical = llm.generate(f"Answer: {query}")
results = retriever.search(embed(hypothetical))`,
        result: "HyDE improved MRR by 0.18 on ambiguous queries. Multi-query helped on complex questions but added 2-3x latency.",
      },
      {
        version: "v0.6",
        subtitle: "Reranking",
        status: "locked",
        whatChanged: "Added a cross-encoder reranker on top of the bi-encoder retriever. The reranker scores each (query, chunk) pair jointly.",
        whatYouPublish: "Reranker impact on top-1 accuracy",
        keyInsight: "Cross-encoders are slow but devastatingly accurate. Retrieve 20 with bi-encoder, rerank to top 3 with cross-encoder — best of both worlds.",
        githubUrl: "",
        pdfPath: "/pdfs/rag/v0.6.pdf",
        codeSnippet: `# Two-stage retrieval
candidates = bi_encoder.retrieve(query, k=20)
reranked = cross_encoder.rerank(query, candidates, k=3)`,
        result: "Top-1 accuracy jumped from 52% to 78% after reranking. The 200ms reranking latency was acceptable for the quality gain.",
      },
      {
        version: "v0.7",
        subtitle: "Evaluation",
        status: "locked",
        whatChanged: "Implemented RAGAS-style evaluation metrics across all previous versions. Built an automated benchmark suite.",
        whatYouPublish: 'The "scorecard" — every version graded',
        keyInsight: "You can't improve what you don't measure. Automated evaluation revealed that v0.5 (query transform) was actually the biggest single improvement.",
        githubUrl: "",
        pdfPath: "/pdfs/rag/v0.7.pdf",
        codeSnippet: `# The 5 Core Metrics
Hit Rate    = correct_in_top_k / total_queries
MRR         = mean(1 / rank_of_correct)
Faithfulness = supported_facts / total_facts
Relevance   = cosine(answer, question)
Precision   = useful_chunks / retrieved_chunks`,
        result: "Complete scorecard across v0.1–v0.6. v0.5+v0.6 combo achieved: Hit Rate 0.91, MRR 0.84, Faithfulness 0.96.",
      },
      {
        version: "v0.8",
        subtitle: "Hierarchical",
        status: "locked",
        whatChanged: "Multi-document, large corpus. Hierarchical indexing with document-level and chunk-level retrieval.",
        whatYouPublish: "Scaling curve: flat vs hierarchical at N docs",
        keyInsight: "",
        githubUrl: "",
        pdfPath: "",
        codeSnippet: "",
        result: "",
      },
      {
        version: "v0.9",
        subtitle: "Agentic",
        status: "locked",
        whatChanged: "Iterative retrieval, self-correction. The system decides when to re-retrieve and when to answer.",
        whatYouPublish: "Latency vs. accuracy tradeoff curve",
        keyInsight: "",
        githubUrl: "",
        pdfPath: "",
        codeSnippet: "",
        result: "",
      },
      {
        version: "v1.0",
        subtitle: "GraphRAG",
        status: "locked",
        whatChanged: "Knowledge graph + vector hybrid. Entity extraction, relation mapping, graph traversal for retrieval.",
        whatYouPublish: "Taxonomy of when graph beats vector",
        keyInsight: "",
        githubUrl: "",
        pdfPath: "",
        codeSnippet: "",
        result: "",
      },
    ],
  },
];

// To add a new series, copy the structure above and change the slug, title, etc.


export const majorProjectsData = [
  {
    slug: "genomic-navigator",
    title: "Genomic Knowledge Navigator",
    description: "A neurosymbolic AI system combining a local Neo4j Knowledge Graph with LLM reasoning to navigate biomedical literature.",
    githubUrl: "https://github.com/Adithyan0122/Genomic-Knowledge-Navigator",
    overview: "Built a FastAPI backend, a Next.js frontend, and a native LangChain router to execute queries over a Neo4j database populated with PubMed abstracts. It responds in ~12s using local Mistral, extracting precise 1-hop subgraphs and synthesizing answers securely without internet dependencies.",
    videoPath: "/videos/genomic_navigator_demo.webp",
    architecture: {
      description: "The system combines a local knowledge graph with an LLM agent to resolve biomedical queries dynamically. The local Mistral model parses intent via native JSON prompts and queries Neo4j for exact subgraph relations, eliminating hallucination risks.",
      imagePath: "/images/genomic_architecture.png",
      codeSnippet: `# Native JSON Agent Routing
json_llm = llm.bind(format="json")
raw_response = json_llm.invoke(router_prompt)
selection = json.loads(raw_response.content)

# Bypasses local LLM deadlocks on complex tool schemas`
    },
    analysis: {
      metrics: [
        { label: "LLM Model", value: "Mistral 7B (Q4_K_M)" },
        { label: "Ingestion Latency", value: "~25-40s (5 abstracts)" },
        { label: "Query Latency", value: "~10-14s" },
      ],
      details: "By keeping the processing local and the reasoning visual, it provides a trustworthy, privacy-first tool. Evaluated against ChatGPT and Open Targets, it outperforms general LLMs on grounded truth and outperforms curated databases on flexibility.",
      imagePath: "/images/genomic_navigator.png"
    }
  }
];
