import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

function StatCard({ value, label }) {
  return (
    <div className="company-stat-card company-animate">
      <div className="company-stat-value">{value}</div>
      <div className="company-stat-label">{label}</div>
    </div>
  );
}

function PillarCard({ item }) {
  return (
    <article className="company-pillar-card company-animate" data-y="24">
      {item.kicker ? <span className="company-pillar-kicker">{item.kicker}</span> : null}
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
    </article>
  );
}

function SpotlightCard({ item }) {
  return (
    <article className="company-spotlight-card company-animate" data-y="24">
      <img src={item.image} alt={item.title} />
      <div>
        <span>{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
    </article>
  );
}

export default function CompanyDetailPage({ config }) {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="company-page">
      <section className="company-hero">
        <div className="company-hero-orb company-hero-orb-a" aria-hidden="true" />
        <div className="company-hero-orb company-hero-orb-b" aria-hidden="true" />
        <div className="company-shell company-hero-grid">
          <div className="company-hero-copy company-animate" data-y="28">
            <span className="company-eyebrow">{config.eyebrow}</span>
            <h1>{config.title}</h1>
            <p className="company-hero-summary">{config.summary}</p>
            {config.introPills ? (
              <div className="company-intro-pills">
                {config.introPills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            ) : null}
            <div className="company-hero-actions">
              {config.primaryAction ? (
                <a className="btn btn-primary" href={config.primaryAction.href}>{config.primaryAction.label}</a>
              ) : null}
              {config.secondaryAction ? (
                <a className="btn btn-secondary" href={config.secondaryAction.href}>{config.secondaryAction.label}</a>
              ) : null}
            </div>
            {config.heroNote ? <p className="company-hero-note">{config.heroNote}</p> : null}
          </div>

          <div className="company-hero-visual company-animate" data-y="36" data-delay="0.1">
            <div className="company-hero-image-card">
              <img src={config.heroImage} alt={config.heroImageAlt} />
            </div>
            <div className="company-hero-badge">
              <span>{config.heroBadgeLabel}</span>
              <strong>{config.heroBadgeValue}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="company-stats-section">
        <div className="company-shell company-stats-grid">
          {config.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <section className="company-section">
        <div className="company-shell">
          <div className="company-section-heading company-animate">
            <span className="company-eyebrow">{config.highlightsTitle}</span>
            <h2>{config.highlightsHeading}</h2>
            <p>{config.highlightsCopy}</p>
          </div>
          <div className="company-pillar-grid">
            {config.highlights.map((item) => (
              <PillarCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {config.sections.map((section) => (
        <section id={section.id} key={section.title} className={`company-section ${section.alt ? "company-section-alt" : ""}`}>
          <div className="company-shell company-split-grid" style={{ direction: section.reverse ? "rtl" : "ltr" }}>
            <div
              className="company-split-visual company-animate"
              style={{ direction: "ltr", maxWidth: section.imageMaxWidth || "100%", margin: "0 auto" }}
              data-y="24"
            >
              <div className="company-split-image-card">
                <img src={section.image} alt={section.imageAlt || section.title} />
              </div>
            </div>
            <div className="company-split-copy company-animate" style={{ direction: "ltr" }} data-y="24">
              <span className="company-eyebrow">{section.eyebrow}</span>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
              {section.items ? (
                <div className="company-list-grid">
                  {section.items.map((item) => (
                    <div className="company-list-item" key={item.title}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {section.quotes ? (
                <div className="company-quote-grid">
                  {section.quotes.map((quote) => (
                    <blockquote className="company-quote-card" key={quote.author}>
                      <p>{quote.copy}</p>
                      <footer>
                        <strong>{quote.author}</strong>
                        <span>{quote.role}</span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {config.spotlights && config.spotlights.length > 0 ? (
        <section className="company-section company-section-alt">
          <div className="company-shell">
            <div className="company-section-heading company-animate">
              <span className="company-eyebrow">{config.spotlightsTitle}</span>
              <h2>{config.spotlightsHeading}</h2>
              <p>{config.spotlightsCopy}</p>
            </div>
            <div className="company-spotlight-grid">
              {config.spotlights.map((item) => (
                <SpotlightCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.extraSections ? config.extraSections.map((section) => (
        <section key={section.title} className={`company-section ${section.alt ? "company-section-alt" : ""}`}>
          <div className="company-shell company-extra-panel company-animate" data-y="24">
            <div className="company-section-heading">
              <span className="company-eyebrow">{section.eyebrow}</span>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
            </div>
            <div className="company-extra-grid">
              {section.items.map((item) => (
                <div className="company-extra-card" key={item.title}>
                  <span>{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )) : null}

      <section className="company-cta-section">
        <div className="company-shell company-cta-card company-animate" data-y="28">
          <div>
            <span className="company-eyebrow">{config.cta.eyebrow}</span>
            <h2>{config.cta.title}</h2>
            <p>{config.cta.copy}</p>
          </div>
          <div className="company-cta-actions">
            {config.cta.primary ? <a className="btn btn-primary" href={config.cta.primary.href}>{config.cta.primary.label}</a> : null}
            {config.cta.secondary ? <a className="btn btn-secondary" href={config.cta.secondary.href}>{config.cta.secondary.label}</a> : null}
          </div>
        </div>
      </section>
    </div>
  );
}