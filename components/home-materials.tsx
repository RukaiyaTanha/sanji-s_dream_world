import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/locales";
import { materials } from "@/data/materials";

export function HomeMaterials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="materials-section section" aria-labelledby="materials-title">
      <div className="materials-blob" aria-hidden="true" />
      <div className="wrap">
        <div className="materials-heading">
          <span className="section-pill">{dict.home.materialsEyebrow}</span>
          <h2 id="materials-title">
            {dict.home.materialsTitleLead} <span>{dict.home.materialsTitleAccent}</span>
          </h2>
          <p>{dict.home.materialsSubtitle}</p>
        </div>
        <div className="materials-grid">
          {materials.map((material) => {
            const Icon = material.icon;
            return (
              <article className="material-tile" key={material.englishName}>
                <span className="material-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <span className="material-name">{material.name[locale]}</span>
                <span className="material-english">{material.englishName}</span>
              </article>
            );
          })}
          <article className="material-tile material-more">
            <span className="material-icon" aria-hidden="true">+</span>
            <span className="material-name">{dict.home.materialsMore}</span>
            <span className="material-english">{dict.home.materialsMoreEnglish}</span>
          </article>
        </div>
      </div>
    </section>
  );
}
