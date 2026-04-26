import PageHero from "@/components/PageHero";
import Link from "next/link";

const categories = ["Tous", "Actualités", "Recommandations", "Recherche", "Formation", "Santé publique", "GTT"];

const posts = [
  { slug: "recommandations-tb-mdr-2026", category: "Recommandations", date: "5 Avr 2026", title: "Nouvelles recommandations sur la tuberculose multirésistante au Burkina Faso", excerpt: "Le GT Tuberculose de la SOBUP publie ses recommandations actualisées pour la prise en charge de la TB-MDR, intégrant les dernières données de l'OMS et les réalités du terrain burkinabè.", gtt: "GT Tuberculose", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&fit=crop", featured: true },
  { slug: "bpco-afrique-subsaharienne", category: "Recherche", date: "28 Mar 2026", title: "BPCO en Afrique subsaharienne : prévalence et facteurs de risque", excerpt: "Une revue systématique de la littérature sur la BPCO dans notre région, menée par le GT Tabac & BPCO de la SOBUP.", gtt: "GT Tabac & BPCO", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&fit=crop", featured: true },
  { slug: "bilan-8eme-congres", category: "Actualités", date: "15 Mar 2026", title: "8ème congrès SOBUP : plus de 200 participants réunis", excerpt: "Retour sur le 8ème congrès annuel qui a réuni pneumologues, chercheurs et professionnels de santé de tout le Burkina Faso.", gtt: null, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80&fit=crop", featured: true },
  { slug: "asthme-severe-enfant", category: "Formation", date: "10 Mar 2026", title: "Prise en charge de l'asthme sévère chez l'enfant en Afrique", excerpt: "Guide pratique élaboré par le GT Pneumo-pédiatrie pour les cliniciens exerçant dans des structures avec ressources limitées.", gtt: "GT Pneumo-pédiatrie", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&q=80&fit=crop", featured: false },
  { slug: "pollution-air-ouagadougou", category: "Santé publique", date: "2 Mar 2026", title: "Pollution de l'air à Ouagadougou : impact sur la santé respiratoire", excerpt: "Étude préliminaire sur les niveaux de particules fines PM2.5 et leurs effets sur la santé respiratoire des habitants.", gtt: "GT Environnement & Travail", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fit=crop", featured: false },
  { slug: "spirometrie-pratique", category: "Formation", date: "20 Fév 2026", title: "La spirométrie en pratique courante : guide pour le clinicien", excerpt: "Réalisé par le GT EFR, ce guide explique comment réaliser et interpréter une spirométrie en consultation quotidienne.", gtt: "GT EFR", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80&fit=crop", featured: false },
];

const categoryColors: Record<string, { bg: string; color: string }> = {
  "Recommandations": { bg: "#E8F9F7", color: "#31B9AE" },
  "Recherche": { bg: "#eff6ff", color: "#2563eb" },
  "Actualités": { bg: "#fef3c7", color: "#d97706" },
  "Formation": { bg: "#f5f3ff", color: "#7c3aed" },
  "Santé publique": { bg: "#E8F9F7", color: "#259689" },
  "GTT": { bg: "#fef2f2", color: "#dc2626" },
};

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        title="Blog scientifique"
        subtitle="Actualités, recommandations, recherches et formations — publiés par la SOBUP et ses Groupes de Travail."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Blog" }]}
        tag="Publications"
        shape="chevron-up"
      />

      {/* Filtres catégories */}
      <section className="bg-background border-b border-gray-100 sticky top-[70px] z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors"
              style={cat === "Tous" ? { background: "#31B9AE", color: "white", borderColor: "#31B9AE" } : { color: "#64748b", borderColor: "#e2e8f0" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12" style={{ background: "#f0fafa" }}>
        <div className="mx-auto max-w-7xl px-4">

          {/* Articles en vedette */}
          <h2 className="text-lg font-black text-gray-900 mb-5">Articles récents</h2>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {featured.map((post) => {
              const catStyle = categoryColors[post.category] ?? { bg: "#f1f5f9", color: "#64748b" };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-background rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 card-shadow flex flex-col">
                  <div className="h-44 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: catStyle.bg, color: catStyle.color }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                    <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors text-sm leading-snug mb-2 line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                    {post.gtt && (
                      <span className="text-xs font-semibold" style={{ color: "#31B9AE" }}>📌 {post.gtt}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Autres articles */}
          <h2 className="text-lg font-black text-gray-900 mb-5">Autres publications</h2>
          <div className="space-y-4">
            {rest.map((post) => {
              const catStyle = categoryColors[post.category] ?? { bg: "#f1f5f9", color: "#64748b" };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-background rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex card-shadow">
                  <div className="w-36 h-28 shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: catStyle.bg, color: catStyle.color }}>{post.category}</span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    {post.gtt && <span className="text-xs font-semibold mt-1" style={{ color: "#31B9AE" }}>📌 {post.gtt}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
