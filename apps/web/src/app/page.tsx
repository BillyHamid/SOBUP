import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import Newsletter from "@/components/Newsletter";

/* ─── Mock data ─── */

const gttGroups = [
  { name: "Tuberculose", icon: "🫁", slug: "tuberculose", color: "bg-red-50 border-red-200 text-red-700" },
  { name: "Asthme & Allergie", icon: "💨", slug: "asthme-allergie", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "Oncologie thoracique", icon: "🔬", slug: "oncologie-thoracique", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { name: "Tabac & BPCO", icon: "🚭", slug: "tabac-bpco", color: "bg-gray-50 border-gray-200 text-gray-700" },
  { name: "Pneumo-pédiatrie", icon: "👶", slug: "pneumo-pediatrie", color: "bg-pink-50 border-pink-200 text-pink-700" },
  { name: "Sommeil & VNI", icon: "😴", slug: "sommeil-vni", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
  { name: "Imagerie thoracique", icon: "📷", slug: "imagerie-thoracique", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
  { name: "Endoscopie bronchique", icon: "🩺", slug: "endoscopie-bronchique", color: "bg-primary-light border-primary/25 text-primary-dark" },
  { name: "EFR", icon: "📊", slug: "efr", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { name: "Infections non TB", icon: "🦠", slug: "infections-non-tb", color: "bg-orange-50 border-orange-200 text-orange-700" },
  { name: "Environnement & Travail", icon: "🏭", slug: "environnement-travail", color: "bg-primary-light border-primary/25 text-primary-dark" },
];

const upcomingEvents = [
  {
    date: "15",
    month: "Mai",
    year: "2026",
    title: "9ème Congrès annuel de la SOBUP",
    location: "Ouagadougou, Burkina Faso",
    type: "Congrès",
    badge: "bg-accent text-white",
    href: "/evenements/9eme-congres",
  },
  {
    date: "22",
    month: "Juin",
    year: "2026",
    title: "Webinaire : Prise en charge de l'asthme sévère",
    location: "En ligne",
    type: "Webinaire",
    badge: "bg-secondary text-white",
    href: "/evenements/webinaire-asthme",
  },
  {
    date: "10",
    month: "Juil",
    year: "2026",
    title: "Atelier pratique de spirométrie",
    location: "CHU Yalgado Ouédraogo",
    type: "Atelier",
    badge: "bg-primary text-white",
    href: "/evenements/atelier-spirometrie",
  },
];

const latestNews = [
  {
    category: "Recommandations",
    date: "5 Avr 2026",
    title: "Nouvelles recommandations sur la tuberculose résistante au Burkina Faso",
    excerpt: "Le GTT Tuberculose publie ses recommandations actualisées pour la prise en charge de la TB-MDR.",
    gtt: "GT Tuberculose",
    href: "/blog/recommandations-tb-mdr-2026",
  },
  {
    category: "Recherche",
    date: "28 Mar 2026",
    title: "BPCO en Afrique subsaharienne : prévalence et facteurs de risque",
    excerpt: "Revue de la littérature sur la BPCO dans notre région. Une étude menée par le GT Tabac & BPCO.",
    gtt: "GT Tabac & BPCO",
    href: "/blog/bpco-afrique-subsaharienne",
  },
  {
    category: "Actualités",
    date: "15 Mar 2026",
    title: "8ème congrès SOBUP : plus de 200 participants réunis",
    excerpt: "Retour sur le 8ème congrès annuel qui a réuni pneumologues, chercheurs et partenaires.",
    gtt: null,
    href: "/blog/bilan-8eme-congres",
  },
  {
    category: "Formation",
    date: "5 Mar 2026",
    title: "Nouveau module e-learning : Imagerie thoracique pour cliniciens",
    excerpt: "Le GT Imagerie thoracique lance un module de formation en ligne accessible à tous les membres.",
    gtt: "GT Imagerie",
    href: "/blog/module-elearning-imagerie",
  },
];

const journalArticles = [
  {
    type: "Article original",
    title: "Prévalence de la silicose chez les mineurs artisanaux au Burkina Faso",
    authors: "Ouédraogo K., Sawadogo B., et al.",
    year: "2026",
  },
  {
    type: "Éditorial",
    title: "Vers une pneumologie africaine : défis et perspectives",
    authors: "Pr. Zoungrana O.",
    year: "2026",
  },
  {
    type: "Cas clinique",
    title: "Aspergillome pulmonaire sur séquelle de tuberculose — à propos d'un cas",
    authors: "Compaoré Y., Traoré S.",
    year: "2026",
  },
];


/* ─── Page ─── */

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO CAROUSEL
      ══════════════════════════════════════ */}
      <HeroCarousel />

      {/* ══════════════════════════════════════
          QUICK ACCESS
      ══════════════════════════════════════ */}
      <section className="bg-background py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📋", title: "Recommandations", sub: "Guides & protocoles nationaux", href: "/recommandations", bg: "from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-700" },
              { icon: "👥", title: "Annuaire", sub: "Trouver un pneumologue", href: "/annuaire", bg: "from-primary-light to-secondary-light", border: "border-primary/25", text: "text-primary-dark" },
              { icon: "🎓", title: "Formations", sub: "E-learning & webinaires", href: "/formations", bg: "from-purple-50 to-purple-100", border: "border-purple-200", text: "text-purple-700" },
              { icon: "📰", title: "Journal SOBUP", sub: "Publications scientifiques", href: "/journal", bg: "from-orange-50 to-orange-100", border: "border-orange-200", text: "text-orange-700" },
            ].map((item) => (
              <Link key={item.title} href={item.href}
                className={`group bg-gradient-to-br ${item.bg} border ${item.border} rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}>
                <span className="text-3xl block mb-3">{item.icon}</span>
                <p className={`font-bold text-sm ${item.text} mb-1`}>{item.title}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MOT DU PRÉSIDENT (comme PATS)
      ══════════════════════════════════════ */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Photo */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                  <Image
                    src="/president-sobup.png"
                    alt="Portrait du Président de la SOBUP"
                    fill
                    className="object-cover object-[center_15%]"
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background rounded-full px-4 py-1.5 shadow-md">
                  <span className="text-xs font-bold text-primary whitespace-nowrap">Président, SOBUP</span>
                </div>
              </div>
            </div>
            {/* Message */}
            <div className="md:col-span-3">
              <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">
                Mot du Président
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 section-title">
                Ensemble pour la santé respiratoire
              </h2>
              <blockquote className="text-gray-600 leading-relaxed text-base mb-4 border-l-4 border-secondary pl-5 italic">
                &ldquo;La SOBUP incarne notre engagement collectif envers l&apos;excellence en pneumologie.
                Chaque membre, chaque groupe de travail, chaque publication contribue à améliorer
                la prise en charge des maladies respiratoires au Burkina Faso. Ce site est votre
                espace — celui de toute notre communauté scientifique.&rdquo;
              </blockquote>
              <p className="font-bold text-gray-900">Pr. [Nom du Président]</p>
              <p className="text-sm text-gray-500">Président de la SOBUP</p>
              <Link href="/a-propos" className="inline-flex items-center gap-1.5 mt-4 text-primary hover:text-primary-dark font-semibold text-sm transition-colors">
                En savoir plus sur la SOBUP
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GTT — GROUPES DE TRAVAIL
      ══════════════════════════════════════ */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Expertise scientifique</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Groupes de Travail Thématiques
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Les GTT sont le cœur scientifique de la SOBUP. Ils produisent recommandations, formations
              et ressources scientifiques pour chaque spécialité.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {gttGroups.map((gtt) => (
              <Link key={gtt.slug} href={`/gtt/${gtt.slug}`}
                className={`group border-2 ${gtt.color} rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5 bg-background`}>
                <span className="text-2xl block mb-2">{gtt.icon}</span>
                <p className="font-semibold text-gray-900 group-hover:text-primary text-sm leading-tight">
                  {gtt.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gtt"
              className="inline-flex items-center gap-2 bg-primary-light hover:bg-blue-100 text-primary px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
              Voir tous les groupes de travail
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOURNAL SOBUP
      ══════════════════════════════════════ */}
      <section className="py-16 bg-primary-light/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left — promo */}
            <div className="md:col-span-2 bg-primary rounded-2xl p-8 text-white">
              <span className="text-4xl block mb-4">📖</span>
              <h2 className="text-2xl font-bold mb-3">Journal Scientifique SOBUP</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Publication officielle de la SOBUP — articles originaux, éditoriaux,
                cas cliniques et revues de la littérature en pneumologie africaine.
              </p>
              <Link href="/journal"
                className="inline-block bg-background text-primary hover:bg-gray-50 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                Consulter le journal
              </Link>
            </div>
            {/* Right — articles */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 text-lg">Derniers articles</h3>
                <Link href="/journal" className="text-primary text-sm font-medium hover:underline">
                  Tout voir →
                </Link>
              </div>
              {journalArticles.map((article, i) => (
                <div key={i}
                  className="bg-background rounded-xl p-5 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer card-shadow">
                  <span className="text-xs font-semibold bg-secondary-light text-secondary px-2.5 py-1 rounded-full">
                    {article.type}
                  </span>
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary mt-2 mb-1 text-sm leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400">{article.authors} — {article.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ÉVÉNEMENTS
      ══════════════════════════════════════ */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Agenda</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 section-title">
                Événements à venir
              </h2>
            </div>
            <Link href="/evenements"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-semibold text-sm">
              Tout l&apos;agenda
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, i) => (
              <Link key={i} href={ev.href}
                className="group bg-background rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 card-shadow">
                {/* Date banner */}
                <div className="bg-primary px-6 py-4 flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white leading-none">{ev.date}</p>
                    <p className="text-blue-200 text-sm font-medium">{ev.month} {ev.year}</p>
                  </div>
                  <span className={`${ev.badge} text-xs font-bold px-3 py-1 rounded-full ml-auto`}>
                    {ev.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm leading-snug mb-3">
                    {ev.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {ev.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════ */}
      <Newsletter />

      {/* ══════════════════════════════════════
          CTA ADHÉSION
      ══════════════════════════════════════ */}
      <section className="py-16 banniere-sobup">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="text-4xl block mb-4">🤝</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Rejoignez la communauté SOBUP
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8">
            Devenez membre — accédez aux ressources exclusives, rejoignez un GTT,
            participez aux congrès et payez votre cotisation en ligne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/adhesion"
              className="bg-accent hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Adhérer maintenant
            </Link>
            <Link href="/espace-membre"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-8 py-3 rounded-lg font-bold transition-all">
              Espace membre
            </Link>
          </div>
          <p className="text-white/65 text-xs mt-6">
            Paiement par Orange Money, Wave ou carte bancaire
          </p>
        </div>
      </section>
    </>
  );
}
