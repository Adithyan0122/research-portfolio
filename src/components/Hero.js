"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { siteConfig } from "@/data/projects";

const strangQuotes = [
    "The beauty of linear algebra is that it shows how simple things lead to powerful ideas.",
    "Disrupt any equation Ax = b and the whole system changes. Connections are everything.",
    "A matrix takes a vector and transforms it — that is the heart of linear algebra.",
    "Disrupt any column of A and the nullspace changes. Columns are the building blocks.",
    "The fundamental theorem of linear algebra connects four subspaces — row, column, null, and left null.",
    "Every good matrix decomposition tells you something deep about the transformation.",
    "Eigenvalues illuminate the deepest properties of a matrix.",
    "Singular values are the right way to measure a matrix.",
    "Understanding the geometry of linear transformations is the key to understanding data.",
    "Orthogonality is the foundation of least squares, signal processing, and so much more.",
    "A singular matrix has dependent columns — it compresses space, losing information.",
    "Matrices don't just store numbers. They encode transformations.",
];

export default function Hero() {
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % strangQuotes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.hero} id="hero">
            {/* Animated background */}
            <div className={styles.hero__bg}>
                <div className={styles.hero__noise} />
                <div className={styles.hero__gradient} />
            </div>

            <div className={styles.hero__content}>

                <motion.h1
                    className={styles.hero__name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {siteConfig.name}
                </motion.h1>

                <motion.div
                    className={styles.hero__quote_container}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <span className={styles.hero__quote_mark}>&ldquo;</span>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={quoteIndex}
                            className={styles.hero__tagline}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            {strangQuotes[quoteIndex]}
                        </motion.p>
                    </AnimatePresence>
                    <span className={styles.hero__quote_mark}>&rdquo;</span>
                </motion.div>

                <motion.a
                    href="#major-projects"
                    className={styles.hero__cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                >
                    Explore Research
                    <span className={styles.hero__cta__arrow}>↓</span>
                </motion.a>
            </div>

            <div className={styles.hero__scroll_line} />
        </section>
    );
}
