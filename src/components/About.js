"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./About.module.css";
import { aboutData } from "@/data/projects";

function FadeIn({ children, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const { identity, education, experience, achievements, hobbies } = aboutData;

    return (
        <section className={styles.about} id="about">
            <div className={styles.about__inner}>
                {/* ── Identity ── */}
                <FadeIn>
                    <p className="section-label">§ About</p>
                    <div className={styles.identity}>
                        <div className={styles.identity__info}>
                            <p>{identity.bio}</p>
                        </div>
                    </div>
                </FadeIn>

                {/* ── Education ── */}
                <FadeIn delay={0.1}>
                    <div className={styles.edu}>
                        <p className="section-label">§ Education</p>
                        <div className={styles.edu__rail}>
                            {education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.edu__item}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.15 }}
                                >
                                    <div className={styles.edu__dot} />
                                    <h3 className={styles.edu__institution}>{edu.institution}</h3>
                                    <p className={styles.edu__degree}>{edu.degree}</p>
                                    <p className={styles.edu__years}>{edu.years}</p>
                                    <p className={styles.edu__highlight}>{edu.highlight}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* ── Experience ── */}
                <div className={styles.exp}>
                    <FadeIn>
                        <p className="section-label">§ Experience</p>
                    </FadeIn>
                    <div className={styles.exp__grid}>
                        {experience.map((exp, i) => (
                            <motion.div
                                key={i}
                                className={styles.exp__card}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.12 }}
                            >
                                <h3 className={styles.exp__company}>{exp.company}</h3>
                                <p className={styles.exp__role}>{exp.role}</p>
                                <p className={styles.exp__duration}>{exp.duration}</p>
                                <ul className={styles.exp__bullets}>
                                    {exp.bullets.map((b, j) => (
                                        <li key={j}>{b}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Achievements ── */}
                <div className={styles.achievements}>
                    <FadeIn>
                        <p className="section-label">§ Achievements</p>
                    </FadeIn>
                    <div className={styles.achievements__grid}>
                        {achievements.map((a, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.badge} ${!a.unlocked ? styles.badge_locked : ""}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: a.unlocked ? 1 : 0.35, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.08 }}
                            >
                                <span className={styles.badge__icon}>{a.icon}</span>
                                <div className={styles.badge__text}>
                                    <h4>{a.title}</h4>
                                    <p>{a.description}</p>
                                </div>
                                {!a.unlocked && <span className={styles.badge__lock}>🔒</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Hobbies ── */}
                <FadeIn>
                    <div className={styles.hobbies}>
                        <p className="section-label">§ Hobbies</p>
                        <div className={styles.hobbies__strip}>
                            {hobbies.map((h, i) => (
                                <div key={i} className={styles.hobby}>
                                    <span className={styles.hobby__icon}>{h.icon}</span>
                                    {h.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
