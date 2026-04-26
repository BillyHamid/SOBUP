import PageHero from "@/components/PageHero";
import Link from "next/link";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isCongres = slug === "9eme-congres";

  const program = [
    { day: "Jour 1 — 15 Mai", sessions: ["08h00 — Accueil et enregistrement", "09h00 — Cérémonie d'ouverture officielle", "10h00 — Conférence inaugurale : État de la pneumologie en Afrique", "14h00 — Symposium : Tuberculose résistante au Burkina Faso", "16h30 — Communications orales — Séance 1", "18h00 — Cocktail de bienvenue"] },
    { day: "Jour 2 — 16 Mai", sessions: ["08h30 — Ateliers pratiques simultanés (spirométrie, endoscopie, imagerie)", "11h00 — Session plénière : Cancer du poumon en Afrique", "14h00 — Symposium : Asthme sévère et nouvelles thérapies", "16h00 — Présentation des posters", "17h30 — Assemblée Générale de la SOBUP"] },
    { day: "Jour 3 — 17 Mai", sessions: ["09h00 — Communications orales — Séance 2", "11h00 — Symposium : BPCO et réhabilitation respiratoire", "14h00 — Remise des prix scientifiques", "15h00 — Clôture et perspectives 2027"] },
  ];

  return (
    <>
      <PageHero
        title={isCongres ? "9ème Congrès annuel de la SOBUP" : "Détail de l'événement"}
        subtitle={isCongres ? "Pneumologie en Afrique : défis et innovations — 15 au 17 Mai 2026, Ouagadougou" : ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Événements", href: "/evenements" }, { label: isCongres ? "9ème Congrès" : slug }]}
        tag={isCongres ? "Congrès annuel" : "Événement"}
        shape="diagonal-left"
      />

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/7" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&fit=crop" alt="Congrès SOBUP" className="w-full h-full object-cover"/>
            </div>

            {/* Programme */}
            <div className="bg-background rounded-2xl border border-gray-100 p-6 card-shadow">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">📅 Programme scientifique</h2>
              <div className="space-y-6">
                {program.map((day) => (
                  <div key={day.day}>
                    <h3 className="font-bold text-sm px-3 py-1.5 rounded-lg inline-block mb-3 text-white" style={{ background: "#31B9AE" }}>
                      {day.day}
                    </h3>
                    <ul className="space-y-2 pl-2">
                      {day.sessions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#5BCEC4" }}/>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations pratiques */}
            <div className="bg-background rounded-2xl border border-gray-100 p-6 card-shadow">
              <h2 className="text-xl font-black text-gray-900 mb-4">📍 Informations pratiques</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "📅", label: "Dates", value: "15, 16 et 17 Mai 2026" },
                  { icon: "📍", label: "Lieu", value: "Hôtel Laïco Ouaga 2000, Ouagadougou" },
                  { icon: "🌐", label: "Format", value: "Présentiel + diffusion en ligne" },
                  { icon: "📝", label: "Deadline abstracts", value: "30 Avril 2026" },
                ].map((info) => (
                  <div key={info.label} className="flex gap-3 p-4 rounded-xl" style={{ background: "#f0fafa" }}>
                    <span className="text-xl">{info.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{info.label}</p>
                      <p className="font-bold text-gray-900 text-sm">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Inscription */}
          <div className="space-y-5">
            <div className="bg-background rounded-2xl border-2 p-6 card-shadow sticky top-24" style={{ borderColor: "#31B9AE" }}>
              <h3 className="text-xl font-black text-gray-900 mb-1">Inscription</h3>
              <p className="text-xs text-gray-400 mb-5">Paiement sécurisé en ligne</p>

              <div className="space-y-3 mb-6">
                {[
                  { cat: "Membres SOBUP à jour", price: "30 000 XOF" },
                  { cat: "Non-membres / Invités", price: "50 000 XOF" },
                  { cat: "Étudiants / Résidents", price: "10 000 XOF" },
                  { cat: "Partenaires institutionnels", price: "Sur devis" },
                ].map((t) => (
                  <div key={t.cat} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{t.cat}</span>
                    <span className="font-bold text-sm" style={{ color: "#31B9AE" }}>{t.price}</span>
                  </div>
                ))}
              </div>

              {/* Modes de paiement */}
              <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Modes de paiement</p>
              <div className="flex gap-2 mb-5 flex-wrap">
                {[
                  { label: "Orange Money", color: "#FF6B00", emoji: "🟠" },
                  { label: "Wave", color: "#1BA8E0", emoji: "🔵" },
                  { label: "Carte bancaire", color: "#065E52", emoji: "💳" },
                ].map((p) => (
                  <span key={p.label} className="text-xs font-bold px-2.5 py-1.5 rounded-lg text-white flex items-center gap-1"
                    style={{ background: p.color }}>
                    {p.emoji} {p.label}
                  </span>
                ))}
              </div>

              <Link href="/espace-membre"
                className="block w-full text-center py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg mb-3"
                style={{ background: "#e67e22" }}>
                S&apos;inscrire maintenant
              </Link>
              <Link href="/abstracts"
                className="block w-full text-center py-2.5 rounded-xl font-bold text-sm border-2 transition-colors"
                style={{ color: "#31B9AE", borderColor: "#31B9AE" }}>
                Soumettre un abstract
              </Link>

              <p className="text-xs text-gray-400 text-center mt-3">
                🏅 Attestation de participation générée automatiquement
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
