"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./Timeline.module.css";
import ProjectModal from "./ProjectModal";

export default function Timeline({ versions }) {
    const [selectedVersion, setSelectedVersion] = useState(null);

    // Split versions into completed rail and locked rail segments
    const lastCompletedIdx = versions.reduce(
        (acc, v, i) => (v.status !== "locked" ? i : acc),
        -1
    );

    return (
        <>
            <div className={styles.timeline}>
                {versions.map((v, i) => (
                    <TimelineNode
                        key={v.version}
                        version={v}
                        index={i}
                        side={i % 2 === 0 ? "left" : "right"}
                        isLastCompleted={i === lastCompletedIdx}
                        totalNodes={versions.length}
                        onSelect={() => {
                            if (v.status !== "locked" && v.status !== "in-progress") setSelectedVersion(v);
                        }}
                    />
                ))}
            </div>

            {selectedVersion && (
                <ProjectModal
                    version={selectedVersion}
                    onClose={() => setSelectedVersion(null)}
                />
            )}
        </>
    );
}

function TimelineNode({ version, index, side, isLastCompleted, totalNodes, onSelect }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const s = version.status; // "completed" | "in-progress" | "locked"

    const dotClass = [
        styles.node__dot,
        s === "completed" && styles.node__dot_completed,
        s === "in-progress" && styles.node__dot_inprogress,
        s === "locked" && styles.node__dot_locked,
    ]
        .filter(Boolean)
        .join(" ");

    const contentClass = [
        styles.node__content,
        s === "completed" && styles.node__content_completed,
        s === "in-progress" && styles.node__content_inprogress,
        s === "locked" && styles.node__content_locked,
    ]
        .filter(Boolean)
        .join(" ");

    const versionClass = [
        styles.node__version,
        s === "locked" && styles.node__version_locked,
        s === "in-progress" && styles.node__version_inprogress,
    ]
        .filter(Boolean)
        .join(" ");

    // Rail behind each node segment
    const railType = s === "locked" ? styles.timeline__rail_locked : styles.timeline__rail_completed;
    const segmentTop = `${(index / totalNodes) * 100}%`;
    const segmentHeight = `${(1 / totalNodes) * 100}%`;

    return (
        <motion.div
            ref={ref}
            className={`${styles.node} ${side === "left" ? styles.node_left : styles.node_right}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            {/* Rail segment */}
            <div
                className={`${styles.timeline__rail} ${railType}`}
                style={{ top: segmentTop, height: segmentHeight }}
            />

            {/* Central dot */}
            <div className={styles.node__dot_wrap}>
                <div className={dotClass} onClick={onSelect}>
                    {s === "locked" ? "🔒" : version.version.replace("v", "")}
                </div>
            </div>

            {/* Content card */}
            <div className={contentClass} onClick={s !== "locked" && s !== "in-progress" ? onSelect : undefined}>
                <div className={styles.node__header}>
                    <p className={versionClass}>{version.version}</p>
                    {version.githubUrl && (
                        <a
                            href={version.githubUrl}
                            className={styles.node__github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="View on GitHub"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                    )}
                </div>
                <h3 className={styles.node__subtitle}>{version.subtitle}</h3>
                {s !== "locked" && <p className={styles.node__desc}>{version.whatChanged}</p>}
                {s === "locked" && (
                    <span className={`${styles.node__badge} ${styles.node__badge_locked}`}>
                        Coming Soon
                    </span>
                )}
                {s === "in-progress" && (
                    <span className={`${styles.node__badge} ${styles.node__badge_inprogress}`}>
                        In Progress
                    </span>
                )}
            </div>
        </motion.div>
    );
}
