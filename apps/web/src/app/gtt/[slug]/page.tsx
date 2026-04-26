import PageHero from "@/components/PageHero";
import Link from "next/link";

const gttData: Record<string, { name: string; icon: string; color: string; bg: string; leader: string; members: number; desc: string; objectives: string[]; }> = {
  tuberculose: { name: "GT Tuberculose", icon: "🫁", color: "#dc2626", bg: "#fef2f2", leader: "Dr. [Nom Responsable]", members: 18, desc: "Le GT Tuberculose œuvre pour améliorer la prise en charge de la tuberculose au Burkina Faso, notamment la TB résistante aux médicaments.", objectives: ["Élaborer des recommandations nationales pour la TB-MDR", "Former les cliniciens à la prise en charge de la tuberculose", "Promouvoir le dépistage actif dans les zones à forte prévalence", "Documenter la résistance aux antituberculeux"] },
  "asthme-allergie": { name: "GT Asthme & Allergie", icon: "💨", color: "#2563eb", bg: "#eff6ff", leader: "Dr. [Nom Responsable]", members: 15, desc: "Ce groupe travaille sur la prise en charge optimale de l'asthme et des pathologies allergiques dans le contexte burkinabè.", objectives: ["Adapter les recommandations GINA au contexte africain", "Développer des protocoles d'éducation thérapeutique", "Évaluer la prévalence de l'asthme au Burkina Faso", "Former à la désensibilisation spécifique"] },
  "oncologie-thoracique": { name: "GT Oncologie thoracique", icon: "🔬", color: "#7c3aed", bg: "#f5f3ff", leader: "Dr. [Nom Responsable]", members: 10, desc: "Dédié au cancer du poumon et aux tumeurs thoraciques, ce GTT œuvre pour améliorer le dépistage et la prise en charge multidisciplinaire.", objectives: ["Mettre en place un registre des cancers thoraciques", "Développer des protocoles de chimiothérapie adaptés", "Former aux techniques de biopsie guidée", "Plaidoyer pour l'accès aux thérapies ciblées"] },
};

export default async function GTTDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gtt = gttData[slug] ?? {
    name: "Groupe de Travail", icon: "🔬", color: "#31B9AE", bg: "#E8F9F7",
    leader: "Dr. [Nom Responsable]", members: 10,
    desc: "Ce groupe de travail thématique contribue à l'expertise scientifique de la SOBUP dans son domaine de spécialité.",
    objectives: ["Produire des recommandations nationales", "Organiser des formations spécialisées", "Partager les ressources scientifiques", "Animer un espace collaboratif entre membres"]
  };

  const resources = [
    { type: "Recommandation", title: `Recommandations ${gtt.name} 2025`, year: "2025", icon: "📋" },
    { type: "Présentation", title: "Congrès SOBUP 2025 — Communication orale", year: "2025", icon: "📊" },
    { type: "Article", title: "Revue de la littérature africaine", year: "2024", icon: "📄" },
  ];

  return (
    <>
      <PageHero
        title={gtt.name}
        subtitle={gtt.desc}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "GTT", href: "/gtt" }, { label: gtt.name }]}
        tag="Groupe de Travail Thématique"
        shape="diagonal-right"
      />

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">

          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">

            {/* Objectifs */}
            <div className="bg-background rounded-2xl border border-gray-100 p-6 card-shadow">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span>{gtt.icon}</span> Objectifs du groupe
              </h2>
              <ul className="space-y-3">
                {gtt.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: gtt.color }}>
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ressources scientifiques */}
            <div className="bg-background rounded-2xl border border-gray-100 p-6 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-gray-900">Ressources scientifiques</h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: gtt.bg, color: gtt.color }}>
                  {resources.length} documents
                </span>
              </div>
              <div className="space-y-3">
                {resources.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer">
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors truncate">{r.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.type} · {r.year}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Espace collaboratif */}
            <div className="rounded-2xl p-6 border-2" style={{ background: gtt.bg, borderColor: `${gtt.color}30` }}>
              <h2 className="text-lg font-black text-gray-900 mb-2">💬 Espace collaboratif</h2>
              <p className="text-sm text-gray-600 mb-4">
                Réservé aux membres du groupe. Échangez, partagez des cas cliniques et collaborez sur les projets du GT.
              </p>
              <Link href="/espace-membre"
                className="inline-block px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: gtt.color }}>
                Accéder à l&apos;espace membre →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Infos du groupe */}
            <div className="bg-background rounded-2xl border border-gray-100 p-5 card-shadow">
              <h3 className="font-black text-gray-900 mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg">👤</span>
                  <div>
                    <p className="text-xs text-gray-400">Responsable</p>
                    <p className="font-semibold text-gray-900">{gtt.leader}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">👥</span>
                  <div>
                    <p className="text-xs text-gray-400">Membres actifs</p>
                    <p className="font-semibold text-gray-900">{gtt.members} membres</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="text-xs text-gray-400">Fréquence des réunions</p>
                    <p className="font-semibold text-gray-900">Trimestrielle</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link href="/adhesion"
                  className="block w-full text-center py-2.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: gtt.color }}>
                  Rejoindre ce groupe
                </Link>
              </div>
            </div>

            {/* Autres GTT */}
            <div className="bg-background rounded-2xl border border-gray-100 p-5 card-shadow">
              <h3 className="font-black text-gray-900 mb-4">Autres groupes de travail</h3>
              <div className="space-y-2">
                {["GT BPCO & Tabac", "GT Pneumo-pédiatrie", "GT EFR", "GT Imagerie"].map((g) => (
                  <Link key={g} href="/gtt"
                    className="block text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-primary-light transition-colors"
                    style={{ color: "#31B9AE" }}>
                    → {g}
                  </Link>
                ))}
                <Link href="/gtt" className="block text-xs text-gray-400 hover:text-primary mt-2 text-center">
                  Voir tous les GTT →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
