import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const WHATSAPP = "212647686734";
const EMAIL = "contact@tililafragrance.com";
const PHONE_DISPLAY = "+212 647-686 734";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  phone: z.string().trim().min(6, "Invalid phone").max(30),
  message: z.string().trim().min(10, "Message is too short").max(1000),
});

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24Z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.522 5.273l-.999 3.648 3.966-1.02zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const text = `New contact from ${parsed.data.name}%0AEmail: ${parsed.data.email}%0APhone: ${parsed.data.phone}%0A%0A${encodeURIComponent(parsed.data.message)}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setTimeout(() => {
      toast.success("Your message has been sent. We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 600);
  };

  const socials = [
    { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
    { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
    { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
    { href: `https://wa.me/${WHATSAPP}`, label: "WhatsApp", Icon: WhatsAppIcon },
  ];

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Orders within Morocco are delivered in 2–4 business days. The Tilila Discovery Pack ships with complimentary express delivery.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "We accept cash on delivery across Morocco and secure bank transfers. International orders are confirmed via WhatsApp.",
    },
    {
      q: "What is your return policy?",
      a: "Sealed perfumes may be returned within 7 days of delivery. For hygiene reasons, opened bottles cannot be exchanged.",
    },
    {
      q: "Are your fragrances long-lasting?",
      a: "Yes. Our extraits are crafted with a high concentration of essence oils for an elegant trail that lasts 8–12 hours.",
    },
    {
      q: "Can I gift-wrap my order?",
      a: "Every Tilila order arrives in our signature black & gold packaging — perfect for gifting at no extra cost.",
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10 opacity-60"
             style={{ background: "radial-gradient(ellipse at top, hsl(43 70% 55% / 0.18), transparent 60%)" }} />
        <div className="container py-20 md:py-28 text-center animate-fade-in">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">— Get in touch —</p>
          <h1 className="font-serif text-5xl md:text-7xl text-gold mb-6">Contact Us</h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            We're here to help you find your perfect fragrance.
          </p>
          <div className="mt-8 mx-auto h-px w-24 bg-gold opacity-70" />
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="container py-16 md:py-20 grid lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3 bg-card/60 backdrop-blur-sm border border-border/60 rounded-md p-8 md:p-10 shadow-luxe">
          <h2 className="font-serif text-3xl text-gold mb-2">Send us a message</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Tell us how we can help — we usually reply within a few hours.
          </p>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={update("name")} placeholder="Jane Doe" className="bg-input border-border/60 focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className="bg-input border-border/60 focus-visible:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={form.phone} onChange={update("phone")} placeholder="+212 6XX XXX XXX" className="bg-input border-border/60 focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={update("message")} placeholder="Your message..." className="bg-input border-border/60 focus-visible:ring-primary resize-none" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-primary-foreground hover:opacity-90 hover:shadow-gold transition-luxe uppercase tracking-[0.25em] text-xs py-6"
            >
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Info */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="bg-card/60 border border-border/60 rounded-md p-8 shadow-luxe">
            <h3 className="font-serif text-2xl text-gold mb-6">Contact Information</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4 group">
                <span className="shrink-0 w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-luxe">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-foreground/90 font-medium">Address</p>
                  <p className="text-muted-foreground">Marrakech, Morocco</p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="shrink-0 w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-luxe">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-foreground/90 font-medium">Phone</p>
                  <a href={`tel:+${WHATSAPP}`} className="text-muted-foreground hover:text-primary transition-luxe">{PHONE_DISPLAY}</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="shrink-0 w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-luxe">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-foreground/90 font-medium">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary transition-luxe break-all">{EMAIL}</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="shrink-0 w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-luxe">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-foreground/90 font-medium">Business Hours</p>
                  <p className="text-muted-foreground">Mon – Sat: 9:00 — 19:00</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-card/60 border border-border/60 rounded-md p-8 shadow-luxe">
            <h3 className="font-serif text-xl text-gold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-gold hover:text-primary-foreground hover:shadow-gold hover:-translate-y-0.5 transition-luxe"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* MAP */}
      <section className="container pb-16 md:pb-20">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">— Find us —</p>
          <h2 className="font-serif text-3xl md:text-4xl text-gold">Visit our boutique</h2>
        </div>
        <div className="rounded-md overflow-hidden border border-border/60 shadow-luxe">
          <iframe
            title="Tilila Fragrance — Marrakech"
            src="https://www.google.com/maps?q=Marrakech%2C%20Morocco&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-10">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">— FAQ —</p>
          <h2 className="font-serif text-3xl md:text-4xl text-gold">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-card/60 border border-border/60 rounded-md p-4 md:p-8 shadow-luxe">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-left hover:text-primary transition-luxe">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Contact;
