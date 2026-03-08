import styles from "./Footer.module.css";
import { siteConfig } from "@/data/projects";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__inner}>
                <div className={styles.footer__links}>
                    <a
                        href={siteConfig.github}
                        className={styles.footer__link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⌘ GitHub
                    </a>
                    <a
                        href={siteConfig.linkedin}
                        className={styles.footer__link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ◉ LinkedIn
                    </a>
                    <a
                        href={`mailto:${siteConfig.email}`}
                        className={styles.footer__link}
                    >
                        ✉ Email
                    </a>
                </div>
                <p className={styles.footer__tagline}>
                    Every version shipped. Every lesson documented. ∇L → 0
                </p>
            </div>
        </footer>
    );
}
