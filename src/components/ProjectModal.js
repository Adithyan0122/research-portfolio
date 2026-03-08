"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./ProjectModal.module.css";

const DEFAULT_TABS = ["Overview", "Math", "Code", "Results"];
const ARCH_TABS = ["Overview", "Architecture", "Math", "Code", "Results"];

export default function ProjectModal({ version, onClose }) {
    const [activeTab, setActiveTab] = useState("Overview");

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!version) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 60, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={styles.modal__header}>
                        <div>
                            <p className={styles.modal__version}>{version.version}</p>
                            <h2 className={styles.modal__title}>{version.subtitle}</h2>
                        </div>
                        <button className={styles.modal__close} onClick={onClose}>
                            ✕
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        {(version.architecture ? ARCH_TABS : DEFAULT_TABS)
                            .filter(tab => tab !== "Math" || version.pdfPath)
                            .map((tab) => (
                                <button
                                    key={tab}
                                    className={`${styles.tab} ${activeTab === tab ? styles.tab_active : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                    </div>

                    {/* Tab Content */}
                    <div className={styles.tab_content}>
                        {activeTab === "Overview" && <OverviewTab version={version} />}
                        {activeTab === "Architecture" && <ArchitectureTab version={version} />}
                        {activeTab === "Math" && <MathTab version={version} />}
                        {activeTab === "Code" && <CodeTab version={version} />}
                        {activeTab === "Results" && <ResultsTab version={version} />}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function OverviewTab({ version }) {
    return (
        <>
            <h4>What Changed</h4>
            <p>{version.whatChanged}</p>

            <h4>What You Publish</h4>
            <p>{version.whatYouPublish}</p>

            {version.keyInsight && (
                <>
                    <h4>Key Insight</h4>
                    <p className={styles.highlight}>{version.keyInsight}</p>
                </>
            )}
        </>
    );
}

function ArchitectureTab({ version }) {
    if (!version.architecture) return <p>No architecture details provided.</p>;

    return (
        <>
            <h4>System Architecture</h4>
            <p>{version.architecture.description}</p>

            {version.architecture.imagePath && (
                <div style={{ marginTop: 24, marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                        src={version.architecture.imagePath}
                        alt="Architecture Diagram"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </div>
            )}
        </>
    );
}

function MathTab({ version }) {
    if (version.pdfPath) {
        return (
            <>
                <h4>Mathematical Documentation</h4>
                <iframe
                    src={version.pdfPath}
                    className={styles.pdf_frame}
                    title={`${version.version} Math PDF`}
                />
                <p style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)" }}>
                    Add your PDF to <code>public{version.pdfPath}</code>
                </p>
            </>
        );
    }
    return (
        <div className={styles.pdf_placeholder}>
            No PDF uploaded yet. Add one to public/pdfs/
        </div>
    );
}

function CodeTab({ version }) {
    return (
        <>
            {version.githubUrl && (
                <>
                    <h4>Repository</h4>
                    <a
                        href={version.githubUrl}
                        className={styles.github_btn}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⌘ View on GitHub →
                    </a>
                </>
            )}

            {version.codeSnippet && (
                <>
                    <h4>Featured Snippet</h4>
                    <div className={styles.code_block}>
                        <pre>{version.codeSnippet}</pre>
                    </div>
                </>
            )}

            {!version.githubUrl && !version.codeSnippet && (
                <div className={styles.pdf_placeholder}>
                    No code linked yet.
                </div>
            )}
        </>
    );
}

function ResultsTab({ version }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (version.analysisPath) {
            setLoading(true);
            fetch(version.analysisPath)
                .then((res) => res.text())
                .then((text) => {
                    setContent(text);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error loading analysis:", err);
                    setLoading(false);
                });
        }
    }, [version.analysisPath]);

    if (version.analysisPath) {
        return (
            <div className={styles.markdown_content}>
                {loading ? (
                    <p>Loading results...</p>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </div>
        );
    }

    if (version.result) {
        return (
            <>
                <h4>Key Results</h4>
                <p>{version.result}</p>
            </>
        );
    }
    return (
        <div className={styles.pdf_placeholder}>
            No results documented yet.
        </div>
    );
}
