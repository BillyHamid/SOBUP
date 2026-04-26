"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    tag: "9ème Congrès annuel",
    title: "Pneumologie en Afrique : défis et innovations",
    subtitle: "Du 15 au 17 mai 2026 à Ouagadougou — Inscrivez-vous et soumettez vos abstracts avant le 30 avril.",
    cta1: { label: "S'inscrire au congrès", href: "/evenements/9eme-congres" },
    cta2: { label: "Soumettre un abstract", href: "/abstracts" },
    bg: "var(--primary)",
    accent: "#31B9AE",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=85&fit=crop&auto=format",
    imageAlt: "Grande salle de conférence, public face à une scène éclairée",
  },
  {
    id: 2,
    tag: "Formation continue",
    title: "Webinaires & E-learning par nos Groupes de Travail",
    subtitle: "Formations certifiantes en spirométrie, tuberculose, asthme sévère et bien plus — en ligne, à votre rythme.",
    cta1: { label: "Voir les formations", href: "/formations" },
    cta2: { label: "Replays disponibles", href: "/formations/replays" },
    bg: "var(--primary)",
    accent: "#31B9AE",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&fit=crop&auto=format",
    imageAlt: "Équipe professionnelle en réunion collaborative autour d'un écran",
  },
  {
    id: 3,
    tag: "Recommandations nationales",
    title: "Des recommandations adaptées au contexte burkinabè",
    subtitle: "Nos 11 Groupes de Travail publient des recommandations pour la tuberculose, l'asthme, la BPCO et plus.",
    cta1: { label: "Consulter les recommandations", href: "/recommandations" },
    cta2: { label: "Découvrir les GTT", href: "/gtt" },
    bg: "var(--primary)",
    accent: "#31B9AE",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=85&fit=crop&auto=format",
    imageAlt: "Médecin analysant des examens d'imagerie médicale à l'écran",
  },
  {
    id: 4,
    tag: "Adhésion SOBUP",
    title: "Rejoignez la communauté pneumologique du Burkina Faso",
    subtitle: "Paiement par Orange Money, Wave ou carte bancaire. Accès immédiat aux ressources membres.",
    cta1: { label: "Adhérer maintenant", href: "/adhesion" },
    cta2: { label: "En savoir plus", href: "/a-propos" },
    bg: "var(--primary)",
    accent: "#31B9AE",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=85&fit=crop&auto=format",
    imageAlt: "Équipe de professionnels en atelier collaboratif autour d'une table",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setProgress(0);
    setTimeout(() => { setCurrent(index); setTransitioning(false); }, 450);
  }, [transitioning, current]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);
      if (pct >= 100) next();
    }, 50);
    return () => clearInterval(id);
  }, [current, next]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "560px" }}>
      {/* Background */}
      <div className="absolute inset-0 transition-all duration-700" style={{ background: slide.bg }}/>

      {/* Slide counter */}
      <div className="absolute top-5 right-16 z-20 text-white/40 text-xs font-mono select-none tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 flex items-center min-h-[560px]">
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-16 sm:py-20">

          {/* LEFT */}
          <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateX(-20px)" : "translateX(0)", transition: "opacity .45s ease, transform .45s ease" }}>
            <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
              style={{ background: `${slide.accent}33`, border: `1px solid ${slide.accent}66` }}>
              {slide.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight mb-5">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-lg">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={slide.cta1.href}
                className="px-6 py-3 rounded-xl font-black text-white text-sm shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: slide.accent }}>
                {slide.cta1.label}
              </Link>
              <Link href={slide.cta2.href}
                className="px-6 py-3 rounded-xl font-black text-white text-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all">
                {slide.cta2.label}
              </Link>
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="hidden sm:flex justify-center items-center"
            style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateX(20px) scale(.97)" : "translateX(0) scale(1)", transition: "opacity .45s ease, transform .45s ease" }}>
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-md" style={{ background: slide.accent }}/>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 42vw, 672px"
                  priority={slide.id === 1}
                />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                <Image src="/logo.png" alt="SOBUP" width={32} height={32} className="w-8 h-8"/>
                <div>
                  <p className="text-xs font-black leading-none" style={{ color: "#31B9AE" }}>SOBUP</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Société savante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} aria-label="Précédent"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onClick={next} aria-label="Suivant"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 28 : 8, background: "rgba(255,255,255,0.3)" }}>
            {i === current && (
              <span className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: slide.accent, width: `${progress}%`, transition: "width .05s linear" }}/>
            )}
          </button>
        ))}
      </div>

      {/* Wave */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" fill="#F5F5F5"/>
      </svg>
    </section>
  );
}
