"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { seriesData } from "@/data/projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function SeriesDetailPage() {
    const params = useParams();
    const series = seriesData.find((s) => s.slug === params.slug);

    if (!series) {
        return (
            <div className={styles.detail}>
                <div className={styles.detail__inner} style={{ padding: "120px 24px", textAlign: "center" }}>
                    <h1>Series not found</h1>
                    <Link href="/" className={styles.detail__back}>← Back to Home</Link>
                </div>
            </div>
        );
    }

    const completed = series.versions.filter((v) => v.status === "completed").length;
    const inProgress = series.versions.filter((v) => v.status === "in-progress").length;
    const total = series.versions.length;

    return (
        <div className={styles.detail}>
            {/* Hero */}
            <div className={styles.detail__hero}>
                <div className={styles.detail__inner}>
                    <Link href="/" className={styles.detail__back}>
                        ← Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="section-label">// SERIES</p>
                        <h1 className={styles.detail__title}>{series.title}</h1>
                        <p className={styles.detail__desc}>{series.description}</p>
                    </motion.div>

                    <motion.div
                        className={styles.detail__stats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={styles.detail__stat}>
                            <div className={styles.detail__stat_num}>{completed}</div>
                            <div className={styles.detail__stat_label}>Completed</div>
                        </div>
                        <div className={styles.detail__stat}>
                            <div className={styles.detail__stat_num}>{inProgress}</div>
                            <div className={styles.detail__stat_label}>In Progress</div>
                        </div>
                        <div className={styles.detail__stat}>
                            <div className={styles.detail__stat_num}>{total}</div>
                            <div className={styles.detail__stat_label}>Total</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Timeline */}
            <div className={styles.detail__timeline}>
                <div className={styles.detail__inner}>
                    <Timeline versions={series.versions} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
