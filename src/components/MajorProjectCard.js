"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import MajorProjectModal from "./MajorProjectModal";
import styles from "./SeriesCard.module.css"; // Reuse the card styling

export default function MajorProjectCard({ project, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
            >
                <div className={styles.card} onClick={() => setIsModalOpen(true)}>
                    <div className={styles.card__header}>
                        <h3 className={styles.card__title}>{project.title}</h3>
                        <span className={styles.card__arrow}>↗</span>
                    </div>
                    <p className={styles.card__desc}>{project.description}</p>
                    <div className={styles.card__progress_label} style={{ marginTop: 'auto', paddingTop: '16px' }}>
                        <span className={styles.card__progress_text} style={{ color: 'var(--teal)' }}>
                            VIEW PROJECT DETAILS
                        </span>
                    </div>
                </div>
            </motion.div>

            {isModalOpen && (
                <MajorProjectModal
                    project={project}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
