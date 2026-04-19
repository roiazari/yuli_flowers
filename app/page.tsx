import content from "@/content.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  const {
    navbar,
    hero,
    about,
    services,
    gallery,
    pricing,
    testimonials,
    faq,
    contact,
    brand,
  } = content;

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Navbar content={navbar} brandName={brand?.name} />
      <Hero content={hero} />
      <About content={about} />
      <Services content={services} />
      <Gallery content={gallery} />
      <Pricing content={pricing} />
      <Testimonials content={testimonials} />
      <Faq content={faq} />
      <Contact content={contact} />
      <Footer
        brandName={brand?.name ?? navbar.logo}
        contact={{
          phone: contact.phone,
          email: contact.email,
          facebook: contact.facebook,
          instagram: contact.instagram,
          tiktok: contact.tiktok,
        }}
      />
      {contact.whatsapp && <WhatsAppButton href={contact.whatsapp} />}
      <AccessibilityMenu />
    </main>
  );
}
