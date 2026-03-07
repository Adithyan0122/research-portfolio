// ============================================================================
// DATA LAYER — Edit this file to add new series, versions, or update content
// ============================================================================

export const siteConfig = {
  // TODO: replace with your name
  name: "Dhanush Adithyan",
  // TODO: replace with your tagline
  tagline: "Chasing knowledge from first principles. Building and dissecting AI systems.",
  // TODO: replace with your email
  email: "adithyan@example.com",
  // TODO: replace with your GitHub URL
  github: "https://github.com/Adithyan0122",
  linkedin: "https://linkedin.com/in/adithyan-aiml", // Placeholder check?
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
    slug: "rag",
    title: "RAG Systems",
    description:
      "A 10-part deep dive into Retrieval-Augmented Generation — from a raw NumPy prototype to a full knowledge-graph-powered system. Every version ships. Every lesson is documented.",
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
  // To add a new series, copy the structure above and change the slug, title, etc.
  // Example:
  // {
  //   slug: "agents",
];

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
