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
        </motion.div>
    );
}
