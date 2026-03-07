"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./ProjectModal.module.css";

const TABS = ["Overview", "Architecture", "Analysis"];

export default function MajorProjectModal({ project, onClose }) {
    const [activeTab, setActiveTab] = useState(0);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!project) return null;

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
                            <p className={styles.modal__version}>MAJOR PROJECT</p>
                            <h2 className={styles.modal__title}>{project.title}</h2>
                        </div>
                        <button className={styles.modal__close} onClick={onClose}>
                            ✕
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        {TABS.map((tab, i) => (
                            <button
                                key={tab}
                                className={`${styles.tab} ${i === activeTab ? styles.tab_active : ""}`}
                                onClick={() => setActiveTab(i)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className={styles.tab_content}>
                        {activeTab === 0 && <OverviewTab project={project} />}
                        {activeTab === 1 && <ArchitectureTab project={project} />}
                        {activeTab === 2 && <AnalysisTab project={project} />}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function OverviewTab({ project }) {
    return (
        <>
            <h4>Project Overview</h4>
            <p>{project.overview}</p>

            {project.githubUrl && (
                <div style={{ marginTop: 16, marginBottom: 24 }}>
                    <a
                        href={project.githubUrl}
                        className={styles.github_btn}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⌘ View on GitHub →
                    </a>
                </div>
            )}

            {project.videoPath && (
                <>
                    <h4>Live Interaction Recording</h4>
                    <div style={{ marginTop: 16, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img
                            src={project.videoPath}
                            alt={`${project.title} Demo`}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </>
            )}
        </>
    );
}

function ArchitectureTab({ project }) {
    if (!project.architecture) return <p>No architecture details provided.</p>;

    return (
        <>
            <h4>System Architecture</h4>
            <p>{project.architecture.description}</p>

            {project.architecture.imagePath && (
                <div style={{ marginTop: 24, marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                        src={project.architecture.imagePath}
                        alt="Architecture Diagram"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </div>
            )}
        </>
    );
}

function AnalysisTab({ project }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project.analysis?.analysisPath || project.analysisPath) {
            setLoading(true);
            const path = project.analysis?.analysisPath || project.analysisPath;
            fetch(path)
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
    }, [project.analysis, project.analysisPath]);

    if (project.analysis?.analysisPath || project.analysisPath) {
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

    if (project.analysis?.details) {
        return (
            <>
                <h4>Metrics & Analysis</h4>
                {project.analysis.metrics && project.analysis.metrics.length > 0 && (
                    <ul style={{ marginBottom: 24, paddingLeft: 20, color: "var(--text-secondary)" }}>
                        {project.analysis.metrics.map(m => (
                            <li key={m.label} style={{ marginBottom: 8 }}>
                                <strong style={{ color: "var(--amber)" }}>{m.label}:</strong> {m.value}
                            </li>
                        ))}
                    </ul>
                )}
                <p>{project.analysis.details}</p>
                {project.analysis.imagePath && (
                    <div style={{ marginTop: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img
                            src={project.analysis.imagePath}
                            alt={`${project.title} Graph Screenshot`}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                )}
            </>
        )
    }

    return (
        <div className={styles.pdf_placeholder}>
            No analysis documented yet.
        </div>
    );
}
