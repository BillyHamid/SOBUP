import PageHero from "@/components/PageHero";

const articles = [
  { type: "Article original", title: "Prévalence de la silicose chez les mineurs artisanaux au Burkina Faso", authors: "Ouédraogo K., Sawadogo B., Compaoré Y.", institution: "CHU Yalgado Ouédraogo", year: "2026", vol: "Vol. 3, N°1", gtt: "GT Environnement & Travail" },
  { type: "Éditorial", title: "Vers une pneumologie africaine : défis et perspectives pour 2026", authors: "Pr. Zoungrana O.", institution: "SOBUP", year: "2026", vol: "Vol. 3, N°1", gtt: null },
  { type: "Cas clinique", title: "Aspergillome pulmonaire sur séquelle de tuberculose — à propos d'un cas", authors: "Compaoré Y., Traoré S.", institution: "CHU Yalgado Ouédraogo", year: "2026", vol: "Vol. 3, N°1", gtt: "GT Tuberculose" },
  { type: "Article original", title: "Facteurs associés à la non-observance du traitement antituberculeux au Burkina Faso", authors: "Sawadogo B., Kaboré A., Ouédraogo M.", institution: "Programme National Tuberculose", year: "2025", vol: "Vol. 2, N°2", gtt: "GT Tuberculose" },
  { type: "Revue", title: "Place de la spirométrie dans le diagnostic de la BPCO en Afrique subsaharienne", authors: "Kaboré A., Traoré S.", institution: "CHU Bogodogo", year: "2025", vol: "Vol. 2, N°2", gtt: "GT EFR" },
  { type: "Article original", title: "Profil clinique du cancer du poumon au CHU Yalgado Ouédraogo", authors: "Compaoré Y., Sawadogo B.", institution: "CHU Yalgado Ouédraogo", year: "2025", vol: "Vol. 2, N°1", gtt: "GT Oncologie thoracique" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Article original": { bg: "#E8F9F7", color: "#31B9AE" },
  "Éditorial": { bg: "#fef3c7", color: "#d97706" },
  "Cas clinique": { bg: "#fef2f2", color: "#dc2626" },
  "Revue": { bg: "#eff6ff", color: "#2563eb" },
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        title="Journal scientifique SOBUP"
        subtitle="Publication officielle de la SOBUP — articles originaux, éditoriaux, cas cliniques et revues en pneumologie africaine."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Journal" }]}
        tag="Revue scientifique"
        shape="chevron-up"
      />

      <section className="py-12" style={{ background: "#f0fafa" }}>
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-4 gap-8">

          {/* Articles */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-black text-gray-900">Derniers articles publiés</h2>
              <span className="text-xs text-gray-400 font-medium">Volume 3, N°1 — 2026</span>
            </div>
            {articles.map((article, i) => {
              const cs = typeColors[article.type] ?? { bg: "#f1f5f9", color: "#64748b" };
              return (
                <div key={i} className="bg-background rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all group cursor-pointer card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-12 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: cs.bg }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: cs.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: cs.bg, color: cs.color }}>{article.type}</span>
                        <span className="text-xs text-gray-400">{article.vol} · {article.year}</span>
                        {article.gtt && <span className="text-xs font-semibold" style={{ color: "#31B9AE" }}>📌 {article.gtt}</span>}
                      </div>
                      <h3 className="font-black text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400">{article.authors} — <span className="italic">{article.institution}</span></p>
                    </div>
                    <button className="shrink-0 p-2 rounded-lg hover:bg-primary-light transition-colors" style={{ color: "#31B9AE" }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-background rounded-2xl p-5 border border-gray-100 card-shadow">
              <h3 className="font-black text-gray-900 mb-3">📖 À propos du journal</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Le Journal SOBUP est la publication officielle de la Société Burkinabè de Pneumologie. Publié 2 fois par an, il accueille des travaux originaux en pneumologie africaine.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p>📅 <strong>Périodicité :</strong> Semestrielle</p>
                <p>🌐 <strong>Langue :</strong> Français</p>
                <p>📧 <strong>Soumissions :</strong> journal@sobup.bf</p>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-5 border border-gray-100 card-shadow">
              <h3 className="font-black text-gray-900 mb-3">📚 Archives</h3>
              <div className="space-y-2">
                {[
                  { label: "Vol. 3, N°1 — 2026", articles: 6 },
                  { label: "Vol. 2, N°2 — 2025", articles: 8 },
                  { label: "Vol. 2, N°1 — 2025", articles: 7 },
                  { label: "Vol. 1, N°2 — 2024", articles: 5 },
                ].map((a) => (
                  <div key={a.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-medium text-gray-700">{a.label}</span>
                    <span className="text-xs text-gray-400">{a.articles} articles</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
