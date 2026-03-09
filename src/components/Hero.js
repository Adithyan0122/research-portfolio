"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { siteConfig } from "@/data/projects";



export default function Hero() {

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
