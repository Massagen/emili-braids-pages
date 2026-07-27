import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { CredibilityBar } from "@/components/landing/CredibilityBar";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Gallery } from "@/components/landing/Gallery";
import { Differentials } from "@/components/landing/Differentials";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Courses } from "@/components/landing/Courses";
import { Location } from "@/components/landing/Location";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";

const TITLE = "Emili Braids | Especialista em Tranças e Cachos em Vitória - ES";
const DESCRIPTION =
  "Especialista em Tranças, Cachos, Cursos e Workshops em Vitória - ES. Agende seu horário pelo WhatsApp.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Tranças Vitória, Box Braids Vitória, Nagô Vitória, Cachos Vitória, Trancista Vitória, Curso de Tranças Vitória, Workshop Tranças, Emili Braids",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "Emili Braids",
          image: "/favicon.ico",
          description: DESCRIPTION,
          telephone: "+55 27 99604-5253",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rodovia Serafim Derenzi, 3876",
            addressLocality: "Vitória",
            addressRegion: "ES",
            postalCode: "29030-027",
            addressCountry: "BR",
          },
          openingHours: "Mo-Sa 09:00-18:00",
          areaServed: "Vitória - ES",
          sameAs: ["https://instagram.com/emili.braids"],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <About />
        <Services />
        <Gallery />
        <Differentials />
        <Testimonials />
        <CtaBanner />
        <Courses />
        <Location />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
