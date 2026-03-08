"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SeriesCard.module.css";

export default function SeriesCard({ series, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [progress, setProgress] = useState(0);

    const completed = series.versions.filter((v) => v.status === "completed").length;
    const total = series.versions.length;
    const pct = (completed / total) * 100;

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setProgress(pct), 200);
            return () => clearTimeout(timer);
        }
    }, [inView, pct]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className={styles.card_wrapper}
        >
            <Link href={`/series/${series.slug}`} className={styles.card}>
                <div className={styles.card__header}>
                    <h3 className={styles.card__title}>{series.title}</h3>
                    <span className={styles.card__arrow}>→</span>
                </div>
                <p className={styles.card__desc}>{series.description}</p>
                <div className={styles.card__progress_label}>
                    <span className={styles.card__progress_text}>PROGRESS</span>
                    <span className={styles.card__progress_count}>
                        {completed} / {total} complete
                    </span>
                </div>
                <div className={styles.card__progress_bar}>
                    <div
                        className={styles.card__progress_fill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </Link>

            {series.githubUrl && (
                <a
                    href={series.githubUrl}
                    className={styles.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on GitHub"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
            )}
        </motion.div>
    );
}
