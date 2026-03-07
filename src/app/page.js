import Hero from "@/components/Hero";
import SeriesCard from "@/components/SeriesCard";
import MajorProjectCard from "@/components/MajorProjectCard";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { seriesData, majorProjectsData } from "@/data/projects";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* 1. Hero */}
      <Hero />

      {/* 1.5 Major Projects */}
      <section className={styles.series} id="major-projects" style={{ paddingBottom: '0px' }}>
        <div className={styles.series__inner}>
          <div className={styles.series__header}>
            <p className="section-label" style={{ color: 'var(--teal)' }}>// MAJOR PROJECTS</p>
            <h2 className="section-title">Standalone Research</h2>
            <p className="section-subtitle">
              Comprehensive end-to-end AI systems and investigations. Click to view architecture and analysis.
            </p>
          </div>
          <div className={styles.grid}>
            {majorProjectsData.map((project, i) => (
              <MajorProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Series Grid */}
      <section className={styles.series} id="series">
        <div className={styles.series__inner}>
          <div className={styles.series__header}>
            <p className="section-label">// RESEARCH THREADS</p>
            <h2 className="section-title">Project Series</h2>
            <p className="section-subtitle">
              Each series is a multi-version deep dive. Click a card to explore the full timeline.
            </p>
          </div>
          <div className={styles.grid}>
            {seriesData.map((series, i) => (
              <SeriesCard key={series.slug} series={series} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. About */}
      <About />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
