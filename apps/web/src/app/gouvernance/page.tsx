import PageHero from "@/components/PageHero";
import Image from "next/image";

const bureau = [
  { title: "Président", name: "Pr. [Nom Président]", institution: "CHU Yalgado Ouédraogo", photo: "/president-sobup.png" },
  { title: "Vice-Président", name: "Dr. [Nom VP]", institution: "CHU Bogodogo", photo: null },
  { title: "Secrétaire Général", name: "Dr. [Nom SG]", institution: "CHU Yalgado Ouédraogo", photo: null },
  { title: "Secrétaire Général Adjoint", name: "Dr. [Nom SGA]", institution: "CHR Koudougou", photo: null },
  { title: "Trésorier", name: "Dr. [Nom Trésorier]", institution: "CHU Yalgado Ouédraogo", photo: null },
  { title: "Trésorier Adjoint", name: "Dr. [Nom TA]", institution: "CHU Souro Sanou", photo: null },
  { title: "Chargé de Communication", name: "Dr. [Nom CC]", institution: "CHU Yalgado Ouédraogo", photo: null },
  { title: "Chargé de Formation", name: "Dr. [Nom CF]", institution: "UFR/SDS", photo: null },
];

const honoraires = [
  { title: "Président d'Honneur", name: "Pr. [Fondateur]", institution: "CHU Yalgado Ouédraogo" },
];

export default function GouvernancePage() {
  return (
    <>
      <PageHero
        title="Bureau & Gouvernance"
        subtitle="Les instances dirigeantes de la SOBUP, élues par l'Assemblée Générale pour un mandat de 3 ans."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos", href: "/a-propos" }, { label: "Gouvernance" }]}
        shape="diagonal-right"
      />

      {/* Bureau exécutif */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#31B9AE" }}>Mandat 2024–2027</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Bureau Exécutif</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bureau.map((member) => (
              <div key={member.title}
                className="bg-background rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group card-shadow text-center">
                <div
                  className={`relative flex items-center justify-center overflow-hidden ${member.photo ? "h-64" : "h-40"}`}
                  style={member.photo ? undefined : { background: "#E8F9F7" }}>
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`Portrait — ${member.name}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl"
                      style={{ background: "#31B9AE" }}>
                      <span className="text-white">👨‍⚕️</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#5BCEC4" }}>
                    {member.title}
                  </p>
                  <h3 className="font-black text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-400">{member.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Présidents d'honneur */}
      <section className="py-12" style={{ background: "#f0fafa" }}>
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-2xl">🏅</span> Présidents d&apos;Honneur
          </h2>
          <div className="flex flex-wrap gap-4">
            {honoraires.map((h) => (
              <div key={h.name} className="bg-background rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm border border-amber-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "#fef0e6" }}>🏅</div>
                <div>
                  <p className="font-black text-gray-900 text-sm">{h.name}</p>
                  <p className="text-xs text-gray-400">{h.title} — {h.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commissaire aux comptes */}
      <section className="py-12 bg-background border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-2xl">🔍</span> Commissaire aux comptes
          </h2>
          <div className="bg-background rounded-xl px-6 py-4 flex items-center gap-4 border border-gray-100 shadow-sm w-fit">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: "#E8F9F7" }}>
              📊
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm">Dr. [Nom Commissaire]</p>
              <p className="text-xs text-gray-400">Commissaire aux comptes — [Institution]</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
