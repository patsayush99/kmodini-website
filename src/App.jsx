import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  Eye,
  Sparkles,
  Palette,
  Shirt,
  Tag,
  ShieldCheck,
  Truck,
  Send,
} from "lucide-react";

/* ==================================================================== */
/*  KMODINI — "Wear Your Aura"                                          */
/*  Official brand identity: Mint Green / Soft Sage / Warm Ivory /      */
/*  Champagne Gold. Light throughout — no dark or wine-toned sections.  */
/*                                                                      */
/*  Single-file React artifact (Tailwind core utilities + lucide-react).*/
/* ==================================================================== */

const WHATSAPP_NUMBER = "919168281057";
const waLink = (
  msg = "Hello KMODINI, I would like to know more about your latest collection."
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---------------------------- Brand icons ---------------------------- */

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.04 2.67C8.62 2.67 2.6 8.66 2.6 16.05c0 2.53.7 4.9 1.92 6.93L2.5 29.33l6.55-1.97a13.43 13.43 0 0 0 6.99 1.94h.01c7.42 0 13.44-5.99 13.44-13.38 0-3.57-1.4-6.93-3.94-9.45a13.36 13.36 0 0 0-9.51-3.8zm0 24.5h-.01a11.2 11.2 0 0 1-5.7-1.56l-.41-.24-4.24 1.28 1.3-4.11-.27-.42a11.02 11.02 0 0 1-1.72-5.93c0-6.1 4.98-11.06 11.08-11.06 2.96 0 5.74 1.15 7.83 3.24a10.94 10.94 0 0 1 3.24 7.8c0 6.1-4.98 11-11.1 11zm6.08-8.26c-.33-.17-1.96-.96-2.27-1.07-.3-.11-.53-.17-.75.17-.22.33-.86 1.07-1.06 1.29-.2.22-.39.25-.72.08-.33-.17-1.4-.51-2.66-1.63a9.98 9.98 0 0 1-1.84-2.28c-.2-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.16-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.79-1.03-2.45-.27-.64-.55-.56-.75-.57-.2-.01-.42-.01-.64-.01a1.23 1.23 0 0 0-.89.42c-.3.33-1.16 1.13-1.16 2.76 0 1.63 1.19 3.2 1.36 3.42.16.22 2.34 3.57 5.67 5 .79.34 1.41.55 1.89.7.79.25 1.51.21 2.08.13.63-.1 1.96-.8 2.24-1.58.27-.77.27-1.44.19-1.58-.08-.14-.3-.22-.63-.38z"/>
  </svg>
);
const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4V10.3H7.8v3h2.56V21h3.14z" />
  </svg>
);
const PinterestIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.02 2.5c-5.25 0-8.9 3.7-8.9 8.03 0 2.68 1.5 4.4 2.4 4.4.38 0 .6-1.07.6-1.37 0-.36-.9-1.11-.9-2.6 0-3.08 2.34-5.9 6.1-5.9 3.33 0 5.62 2.02 5.62 4.85 0 3.22-1.63 6.05-4.05 6.05-1.33 0-2.33-1.1-2.01-2.44.38-1.62 1.13-3.37 1.13-4.54 0-1.05-.56-1.92-1.73-1.92-1.37 0-2.47 1.42-2.47 3.32 0 1.21.41 2.03.41 2.03s-1.4 5.9-1.65 6.94c-.5 2.06-.07 4.59-.04 4.84.02.15.21.19.3.07.12-.16 1.66-2.05 2.19-3.95.15-.53.85-3.31.85-3.31.42.8 1.65 1.5 2.96 1.5 3.9 0 6.73-3.56 6.73-7.98 0-4.24-3.46-7.51-7.94-7.51z" />
  </svg>
);

/* ------------------------- Scroll reveal hook ----------------------- */

function useReveal(threshold = 0.16) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useParallax(strength = 0.15) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => setOffset(window.scrollY * strength);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return offset;
}

/* ------------------------- Drape signature SVG ----------------------- */
/* Custom "drape curve" — the fold of a saree pallu — used as a divider  */
/* and heading underline. Draws itself in on scroll (no generic waves).  */

function DrapeDivider({ tone = "gold", flip = false, className = "" }) {
  const [ref, visible] = useReveal(0.3);
  const stroke = tone === "gold" ? "#C8A96A" : "#2F3A36";
  return (
    <div ref={ref} className={`w-full flex justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 60"
        style={{ width: "min(560px, 86%)", height: "44px", overflow: "visible", transform: flip ? "scaleY(-1)" : "none" }}
      >
        <path
          d="M4 8 C 140 8, 160 52, 300 30 S 470 4, 596 40"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: visible ? 0 : 1,
            transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)",
          }}
        />
        <circle
          cx="300" cy="30" r="3.2" fill={stroke}
          style={{ opacity: visible ? 1 : 0, transition: "opacity .5s ease .9s" }}
        />
      </svg>
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="kmd-label kmd-eyebrow">{children}</span>;
}

/* ------------------------- Premium loader ---------------------------- */

function Loader({ done }) {
  return (
    <div className={`kmd-loader ${done ? "kmd-loader-done" : ""}`} aria-hidden="true">
      <div className="kmd-loader-inner">
        <span className="kmd-loader-word">KMODINI</span>
        <svg viewBox="0 0 300 30" className="kmd-loader-svg">
          <path
            d="M2 15 C 70 4, 90 26, 150 15 S 230 4, 298 15"
            fill="none" stroke="#C8A96A" strokeWidth="1.4" strokeLinecap="round"
            pathLength="1"
            className="kmd-loader-path"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------ Navbar -------------------------------- */

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#collections", label: "Collections" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "kmd-nav-solid" : "kmd-nav-transparent"}`}>
      <div className="kmd-nav-inner max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNav("#home"); }} className="kmd-logo select-none">
          KMODINI
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }} className="kmd-nav-link">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a href={waLink()} target="_blank" rel="noreferrer" className="kmd-btn-outline-nav">
            <WhatsAppIcon className="w-4 h-4" /> Chat with us
          </a>
        </div>
        <button className="lg:hidden kmd-icon-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className={`lg:hidden kmd-mobile-menu ${open ? "kmd-mobile-menu-open" : ""}`}>
        <nav className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }} className="kmd-mobile-link">
              {l.label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="kmd-btn-solid mt-3 justify-center">
            <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------- Hero ---------------------------------- */

function Hero() {
  const [mounted, setMounted] = useState(false);
  const parallax = useParallax(0.12);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="kmd-hero relative overflow-hidden">
      <div className="kmd-hero-glow" style={{ transform: `translateY(${parallax}px)` }} aria-hidden="true" />
      <div className="kmd-hero-inner max-w-7xl mx-auto px-5 sm:px-8 pb-24 md:pb-32 grid md:grid-cols-2 gap-14 items-center relative z-10">
        <div className={`kmd-reveal ${mounted ? "kmd-reveal-in" : ""}`}>
          <h1 className="kmd-h1">
            Wear Your <span className="italic">Aura</span>
          </h1>
          <p className="kmd-body-lg mt-6 max-w-md kmd-text-slate">
            Designer kurtis, co-ord sets and festive wear for women who carry
            elegance as naturally as they carry themselves — crafted to feel
            luxurious, priced to feel right.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <a href="#collections" onClick={(e)=>{e.preventDefault();document.querySelector('#collections')?.scrollIntoView({behavior:'smooth'});}} className="kmd-btn-primary">
              Shop the Edit <ArrowRight className="w-4 h-4" />
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="kmd-btn-ghost">
              <WhatsAppIcon className="w-4 h-4" /> Ask us anything
            </a>
          </div>
          <div className="flex items-center gap-6 mt-12 kmd-hero-stats">
            <div><div className="kmd-stat-num">500+</div><div className="kmd-stat-label">Weaves &amp; prints</div></div>
            <div className="kmd-stat-divider" />
            <div><div className="kmd-stat-num">2000+</div><div className="kmd-stat-label">Women dressed</div></div>
            <div className="kmd-stat-divider" />
            <div><div className="kmd-stat-num">4.8★</div><div className="kmd-stat-label">Customer rating</div></div>
          </div>
        </div>

        <div className={`relative kmd-reveal kmd-reveal-delay ${mounted ? "kmd-reveal-in" : ""}`}>
          <div className="kmd-hero-frame">
            <div className="kmd-fabric-placeholder kmd-fabric-1"><span>Festive Collection</span></div>
          </div>
          <div className="kmd-hero-frame-small">
            <div className="kmd-fabric-placeholder kmd-fabric-2"><span>Daily Elegant Wear</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Why Choose --------------------------------- */

const WHY_CHOOSE = [
  { icon: Sparkles, title: "Premium Fabric", desc: "Sourced hand-picked weaves — silk, chikankari, linen and cotton blends." },
  { icon: Palette, title: "Elegant Designs", desc: "Original prints and embroidery, never mass-copied patterns." },
  { icon: Shirt, title: "Comfort Fit", desc: "Tailored silhouettes that move with you, not against you." },
  { icon: Tag, title: "Affordable Luxury", desc: "Boutique quality without the boutique markup." },
  { icon: ShieldCheck, title: "Trusted Brand", desc: "2,000+ women dressed, rated 4.8★ across India." },
  { icon: Truck, title: "Fast Delivery", desc: "Dispatched within 48 hours, tracked door to door." },
];

function WhyChoose() {
  const [ref, visible] = useReveal();
  return (
    <section className="kmd-section-ivory py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <Eyebrow>The Kmodini promise</Eyebrow>
          <h2 className="kmd-h2 mt-3">Why Choose Kmodini</h2>
          <DrapeDivider className="mt-5" />
        </div>
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          {WHY_CHOOSE.map((w, i) => (
            <div key={w.title} className="kmd-why-card" style={{ transitionDelay: `${i * 60}ms` }}>
              <w.icon className="w-6 h-6 kmd-icon-gold" />
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Collections ------------------------------- */

const COLLECTIONS = [
  { name: "Designer Kurtis", desc: "Hand-finished, statement necklines", tag: "01", fab: 1, price: 1499, stock: 12 },
  { name: "Three-Piece Sets", desc: "Kurta, bottom & dupatta, coordinated", tag: "02", fab: 2, price: 2199, stock: 8 },
  { name: "Co-ord Sets", desc: "Easy separates, mix & match", tag: "03", fab: 3, price: 1799, stock: 3 },
  { name: "Festive Wear", desc: "Embroidered pieces for celebrations", tag: "04", fab: 4, price: 3499, stock: 0 },
  { name: "Daily Elegant Wear", desc: "Everyday comfort, tailored fit", tag: "05", fab: 1, price: 1299, stock: 20 },
  { name: "Premium Ethnic Collection", desc: "Our finest fabrics & finishing", tag: "06", fab: 2, price: 4299, stock: 5 },
];

/* Stock badge: >5 = In Stock, 1-5 = "Only N left", 0 = Sold Out */
function StockBadge({ stock }) {
  if (stock <= 0) return <span className="kmd-stock kmd-stock-out">Sold Out</span>;
  if (stock <= 5) return <span className="kmd-stock kmd-stock-low">Only {stock} left</span>;
  return <span className="kmd-stock kmd-stock-ok">In Stock</span>;
}

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function CollectionCard({ c, index, onQuickView }) {
  const [wished, setWished] = useState(false);
  const soldOut = c.stock <= 0;
  return (
    <div className="kmd-coll-card" style={{ transitionDelay: `${index * 70}ms` }}>
      <div className={`kmd-coll-media kmd-fabric-${c.fab}`}>
        <span className="kmd-coll-tag">{c.tag}</span>
        <button
          className={`kmd-wish-btn ${wished ? "kmd-wish-active" : ""}`}
          onClick={(e) => { e.preventDefault(); setWished((v) => !v); }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <Heart className="w-4 h-4" fill={wished ? "currentColor" : "none"} />
        </button>
        <div className="kmd-coll-hover-actions">
          <button className="kmd-quickview-btn" onClick={() => onQuickView(c)}>
            <Eye className="w-4 h-4" /> Quick View
          </button>
          <a
            href={waLink(`Hi! I'd like to shop the ${c.name} collection.`)}
            target="_blank" rel="noreferrer"
            className={`kmd-shopnow-btn ${soldOut ? "kmd-shopnow-disabled" : ""}`}
            onClick={(e) => { if (soldOut) e.preventDefault(); }}
          >
            {soldOut ? "Sold Out" : "Shop Now"}
          </a>
        </div>
      </div>
      <div className="kmd-coll-info">
        <div>
          <h3>{c.name}</h3>
          <p>{c.desc}</p>
          <div className="kmd-price-row">
            <span className="kmd-price">{formatPrice(c.price)}</span>
            <StockBadge stock={c.stock} />
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 shrink-0 kmd-icon-gold" />
      </div>
    </div>
  );
}

function QuickViewModal({ item, onClose }) {
  if (!item) return null;
  const soldOut = item.stock <= 0;
  return (
    <div className="kmd-modal-backdrop" onClick={onClose}>
      <div className="kmd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="kmd-modal-close" onClick={onClose} aria-label="Close quick view">
          <X className="w-5 h-5" />
        </button>
        <div className={`kmd-fabric-placeholder kmd-fabric-${item.fab} kmd-modal-media`}>
          <span>{item.name}</span>
        </div>
        <div className="kmd-modal-body">
          <span className="kmd-label kmd-eyebrow">Collection {item.tag}</span>
          <h3 className="kmd-h2 mt-2" style={{ fontSize: "1.7rem" }}>{item.name}</h3>
          <div className="kmd-price-row mt-2">
            <span className="kmd-price" style={{ fontSize: "1.3rem" }}>{formatPrice(item.price)}</span>
            <StockBadge stock={item.stock} />
          </div>
          <p className="kmd-point-desc mt-3">{item.desc}. Every piece is quality-checked by hand before dispatch.</p>
          <a
            href={waLink(soldOut ? `Hi! I'd like to be notified when ${item.name} is back in stock.` : `Hi! I'd like to know more about ${item.name}.`)}
            target="_blank" rel="noreferrer"
            className="kmd-btn-solid mt-6 justify-center w-full"
          >
            <WhatsAppIcon className="w-4 h-4" /> {soldOut ? "Notify me when back" : "Enquire on WhatsApp"}
          </a>
        </div>
      </div>
    </div>
  );
}

function Collections() {
  const [ref, visible] = useReveal();
  const [quickView, setQuickView] = useState(null);
  return (
    <section id="collections" className="kmd-section-sage py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <Eyebrow>Shop by category</Eyebrow>
          <h2 className="kmd-h2 mt-3">Our Collections</h2>
          <DrapeDivider className="mt-5" />
        </div>
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          {COLLECTIONS.map((c, i) => (
            <CollectionCard key={c.name} c={c} index={i} onQuickView={setQuickView} />
          ))}
        </div>
      </div>
      <QuickViewModal item={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}

/* -------------------------------- About --------------------------------- */

const ABOUT_PILLARS = [
  { t: "Our Story", d: "Kmodini was founded by designer Anjani Patwari out of a simple frustration: beautiful ethnic wear was either mass-produced and forgettable, or hand-crafted and unaffordable — so she set out to close that gap." },
  { t: "Vision", d: "To make every Indian woman feel like the most elegant version of herself, every single day, not just on festive occasions." },
  { t: "Mission", d: "Sourcing real fabric and real craftsmanship directly from weaver clusters, and pricing it fairly — no inflated 'designer' markup." },
  { t: "Craftsmanship", d: "Each garment passes through hand-finishing and a piece-by-piece quality check before it's packed for you." },
];

function About() {
  const [ref, visible] = useReveal();
  return (
    <section id="about" className="kmd-section-ivory py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div ref={ref} className={`kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          <div className="kmd-fabric-placeholder kmd-fabric-3 kmd-about-media"><span>Our Studio, Pachora</span></div>
        </div>
        <div className={`kmd-reveal kmd-reveal-delay ${visible ? "kmd-reveal-in" : ""}`}>
          <Eyebrow>About Kmodini</Eyebrow>
          <h2 className="kmd-h2 mt-4">
            Ethnic wear that respects <span className="italic">your budget</span> and your grace.
          </h2>
          <p className="kmd-founder-line mt-4">
            Founded and designed by <strong>Anjani Patwari</strong>
          </p>
          <div className="mt-9 grid sm:grid-cols-2 gap-7">
            {ABOUT_PILLARS.map((p) => (
              <div key={p.t}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="kmd-dot-marker" />
                  <div className="kmd-point-title">{p.t}</div>
                </div>
                <div className="kmd-point-desc">{p.d}</div>
              </div>
            ))}
          </div>
          <p className="kmd-quality-line mt-8">
            <ShieldCheck className="w-4 h-4 shrink-0 kmd-icon-gold" />
            Quality Promise — not satisfied? Free exchange within 7 days.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Gallery (masonry + lightbox) ----------- */

const GALLERY = [
  { label: "Banarasi Silk", fab: 1, h: 280 },
  { label: "Festive Lehenga", fab: 2, h: 360 },
  { label: "Cotton Kurti Set", fab: 3, h: 220 },
  { label: "Indo-Western Drape", fab: 4, h: 320 },
  { label: "Bridal Trousseau", fab: 2, h: 260 },
  { label: "Chikankari Kurta", fab: 3, h: 340 },
  { label: "Everyday Co-ord", fab: 1, h: 240 },
  { label: "Handloom Cotton", fab: 4, h: 300 },
];

function Gallery() {
  const [ref, visible] = useReveal();
  const [lightbox, setLightbox] = useState(null);
  return (
    <section id="gallery" className="kmd-section-sage py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <Eyebrow>Look book</Eyebrow>
          <h2 className="kmd-h2 mt-3">Styled by Kmodini</h2>
          <DrapeDivider className="mt-5" />
        </div>
        <div ref={ref} className={`kmd-masonry mt-14 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          {GALLERY.map((g, i) => (
            <button
              key={g.label}
              className={`kmd-masonry-item kmd-fabric-${g.fab}`}
              style={{ height: g.h, transitionDelay: `${i * 55}ms` }}
              onClick={() => setLightbox(g)}
            >
              <div className="kmd-gallery-overlay"><span>{g.label}</span></div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="kmd-modal-backdrop" onClick={() => setLightbox(null)}>
          <div className="kmd-lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="kmd-modal-close" onClick={() => setLightbox(null)} aria-label="Close preview">
              <X className="w-5 h-5" />
            </button>
            <div className={`kmd-fabric-placeholder kmd-fabric-${lightbox.fab} kmd-lightbox-media`}>
              <span>{lightbox.label}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ----------------------------- Testimonials ------------------------------ */

const TESTIMONIALS = [
  { name: "Ananya Rao", city: "Hyderabad", quote: "The Banarasi saree I ordered looked even richer in person than in the photos. Genuinely surprised at the price.", rating: 5 },
  { name: "Priya Menon", city: "Kochi", quote: "Fabric quality is easily comparable to boutiques charging triple. My go-to now for every family function.", rating: 5 },
  { name: "Simran Kaur", city: "Chandigarh", quote: "Ordered a lehenga for my sister's wedding — the embroidery detail was stunning and it arrived well before time.", rating: 5 },
  { name: "Deepika Nair", city: "Bengaluru", quote: "Their WhatsApp support helped me pick the right blouse size without a single back-and-forth headache.", rating: 4 },
];

function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return <div className="kmd-avatar">{initials}</div>;
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [ref, visible] = useReveal();
  const total = TESTIMONIALS.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="kmd-section-ivory py-24 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <Eyebrow>What our customers say</Eyebrow>
        <h2 className="kmd-h2 mt-3">Loved across India</h2>

        <div ref={ref} className={`mt-14 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          <Avatar name={t.name} />
          <Quote className="w-8 h-8 mx-auto mt-4 mb-4 kmd-icon-gold" />
          <p className="kmd-quote">"{t.quote}"</p>
          <div className="flex justify-center gap-1 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4" style={{ fill: i < t.rating ? "#C8A96A" : "transparent", color: "#C8A96A" }} />
            ))}
          </div>
          <div className="mt-4">
            <div className="kmd-testi-name">{t.name}</div>
            <div className="kmd-testi-city">{t.city} · Google Review</div>
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
            <button onClick={prev} className="kmd-carousel-btn" aria-label="Previous testimonial"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`kmd-dot ${i === index ? "kmd-dot-active" : ""}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="kmd-carousel-btn" aria-label="Next testimonial"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Instagram feed --------------------------- */

const INSTA = [1, 2, 3, 4, 1, 2];

function InstagramFeed() {
  const [ref, visible] = useReveal();
  return (
    <section className="kmd-section-sage py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <Eyebrow>Follow the aura</Eyebrow>
          <h2 className="kmd-h2 mt-3">@kmodini.in</h2>
          <DrapeDivider className="mt-5" />
          <a href="#" className="kmd-follow-btn mt-6 inline-flex">
            <InstagramIcon className="w-4 h-4" /> Follow on Instagram
          </a>
        </div>
        <div ref={ref} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-12 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          {INSTA.map((fab, i) => (
            <a key={i} href="#" className={`kmd-insta-item kmd-fabric-${fab}`} style={{ transitionDelay: `${i * 60}ms` }} aria-label="View on Instagram">
              <div className="kmd-insta-overlay"><InstagramIcon className="w-5 h-5" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact --------------------------------- */

function Contact() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    window.open(waLink(`Hi Kmodini! I'm ${form.name || "a customer"}. ${form.message || "I'd like to know more."} (Phone: ${form.phone || "—"})`), "_blank");
  };

  return (
    <section id="contact" className="kmd-section-ivory py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="kmd-h2 mt-3">We'd Love to Style You</h2>
          <DrapeDivider className="mt-5" />
        </div>
        <div ref={ref} className={`grid md:grid-cols-2 gap-12 mt-14 kmd-reveal ${visible ? "kmd-reveal-in" : ""}`}>
          <form onSubmit={submit} className="kmd-form">
            <label className="kmd-field">
              <span>Your name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" type="text" />
            </label>
            <label className="kmd-field">
              <span>Phone number</span>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" type="tel" />
            </label>
            <label className="kmd-field">
              <span>Message</span>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you're looking for..." />
            </label>
            <button type="submit" className="kmd-btn-solid justify-center w-full">
              <WhatsAppIcon className="w-4 h-4" /> Send via WhatsApp
            </button>
            {sent && <p className="text-sm mt-3 kmd-text-slate">Opening WhatsApp — send the message to reach us instantly.</p>}
          </form>

          <div className="flex flex-col gap-5">
            <div className="kmd-contact-card">
              <MapPin className="w-5 h-5 shrink-0 kmd-icon-gold" />
              <div><div className="kmd-point-title">Visit our studio</div><div className="kmd-point-desc">Kmodini House, Pachora, Maharashtra</div></div>
            </div>
            <div className="kmd-contact-card">
              <Phone className="w-5 h-5 shrink-0 kmd-icon-gold" />
              <div><div className="kmd-point-title">Call or WhatsApp</div><div className="kmd-point-desc">+91 98765 43210</div></div>
            </div>
            <div className="kmd-contact-card">
              <Mail className="w-5 h-5 shrink-0 kmd-icon-gold" />
              <div><div className="kmd-point-title">Email us</div><div className="kmd-point-desc">hello@kmodini.in</div></div>
            </div>
            <div className="kmd-contact-card">
              <Clock className="w-5 h-5 shrink-0 kmd-icon-gold" />
              <div><div className="kmd-point-title">Business hours</div><div className="kmd-point-desc">Mon–Sat, 10:00 AM – 7:30 PM IST</div></div>
            </div>
            <div className="kmd-fabric-placeholder kmd-fabric-4" style={{ height: 180, marginTop: 4 }}><span>Find us in Pachora</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ---------------------------------- */

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="kmd-footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="kmd-logo">KMODINI</div>
          <p className="kmd-footer-tagline mt-3">Wear Your Aura</p>
          <p className="kmd-footer-text mt-1">Founded &amp; designed by Anjani Patwari</p>
          <p className="kmd-footer-text mt-3 max-w-sm">
            Elegant, affordable ethnic wear for the modern Indian woman — handpicked fabric, honest pricing, delivered across India.
          </p>
          <form className="kmd-newsletter mt-6" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
            <input type="email" required placeholder="Your email for early access" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" aria-label="Subscribe"><Send className="w-4 h-4" /></button>
          </form>
          {subscribed && <p className="text-xs mt-2 kmd-text-gold-dark">Thank you — you're on the list.</p>}
          <div className="flex gap-3 mt-6">
            <a href="#" className="kmd-social-btn" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="kmd-social-btn" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="kmd-social-btn" aria-label="Pinterest"><PinterestIcon /></a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="kmd-social-btn" aria-label="WhatsApp"><WhatsAppIcon className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <div className="kmd-footer-heading">Explore</div>
          <ul className="kmd-footer-links">{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
        <div>
          <div className="kmd-footer-heading">Policies</div>
          <ul className="kmd-footer-links">
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns &amp; Exchange</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="kmd-footer-bottom">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Kmodini. All rights reserved.</span>
          <span>Made with care, for every Indian woman.</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------- Floating WhatsApp ----------------------------- */

function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer" className="kmd-wa-float" aria-label="Chat with Kmodini on WhatsApp">
      <span className="kmd-wa-ring" aria-hidden="true" />
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}

/* ---------------------------------- App ------------------------------------ */

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="kmd-root">
      <GlobalStyles />
      <Loader done={loaderDone} />
      <Navbar />
      <main>
        <Hero />
        <WhyChoose />
        <Collections />
        <About />
        <Gallery />
        <Testimonials />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* ------------------------------ Global styles ------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

      /* ===== KMODINI brand tokens ===== */
      :root {
        --mint: #B8D8C8;        /* primary — soft fills, badges, borders */
        --mint-btn: #6FA98A;    /* deepened mint used only for button backgrounds, so white button text stays readable (WCAG) — everywhere else uses the literal brand mint above */
        --sage: #DDEEE6;        /* secondary — alternate section tint */
        --ivory: #FFFDF8;       /* page background */
        --white: #FFFFFF;       /* cards */
        --gold: #C8A96A;        /* accent — icons, borders, hover state */
        --gold-text: #96773D;   /* deepened gold for small text on light bg (contrast) */
        --charcoal: #2F3A36;    /* primary text */
        --slate: #5E6B66;       /* secondary text */
        --muted: #8A938E;       /* muted text */
      }

      .kmd-root { background: var(--ivory); color: var(--charcoal); font-family: 'Jost', sans-serif; scroll-behavior: smooth; }
      .kmd-root * { scroll-margin-top: 90px; box-sizing: border-box; }
      h1, h2, h3 { font-family: 'Cormorant Garamond', serif; }

      .kmd-text-slate { color: var(--slate); }
      .kmd-text-gold-dark { color: var(--gold-text); }
      .kmd-icon-gold { color: var(--gold); }

      .kmd-label { font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 500; }
      .kmd-eyebrow { color: var(--gold-text); display: inline-block; margin-bottom: 6px; }

      .kmd-h1 { font-size: clamp(2.6rem, 5.4vw, 4.4rem); line-height: 1.05; font-weight: 500; color: var(--charcoal); letter-spacing: -0.01em; }
      .kmd-h1 .italic, .kmd-h2 .italic { font-style: italic; color: var(--gold-text); }
      .kmd-h2 { font-size: clamp(2rem, 3.6vw, 3rem); font-weight: 500; line-height: 1.15; color: var(--charcoal); }
      .kmd-body-lg { font-size: 1.05rem; line-height: 1.7; font-weight: 300; }

      /* ---------- Loader ---------- */
      .kmd-loader {
        position: fixed; inset: 0; z-index: 100;
        background: linear-gradient(160deg, var(--ivory), var(--sage));
        display: flex; align-items: center; justify-content: center;
        transition: opacity .6s ease, visibility .6s ease;
      }
      .kmd-loader-done { opacity: 0; visibility: hidden; pointer-events: none; }
      .kmd-loader-inner { text-align: center; }
      .kmd-loader-word { font-family: 'Cormorant Garamond', serif; letter-spacing: 0.3em; font-size: 1.5rem; color: var(--charcoal); }
      .kmd-loader-svg { width: 180px; height: 20px; margin: 14px auto 0; display: block; }
      .kmd-loader-path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: kmd-draw 1.1s ease forwards; }
      @keyframes kmd-draw { to { stroke-dashoffset: 0; } }

      /* ---------- Nav ---------- */
      .kmd-nav-inner { height: 76px; }
      .kmd-nav-transparent { background: transparent; }
      .kmd-nav-solid { background: rgba(255,253,248,0.92); backdrop-filter: blur(10px); box-shadow: 0 8px 24px rgba(47,58,54,0.08); }
      .kmd-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; letter-spacing: 0.12em; color: var(--gold-text); font-weight: 600; }
      .kmd-nav-link { font-size: 13px; letter-spacing: 0.06em; color: var(--slate); text-decoration: none; position: relative; padding-bottom: 4px; transition: color .25s ease; }
      .kmd-nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 1px; background: var(--gold); transition: width .3s ease; }
      .kmd-nav-link:hover { color: var(--gold-text); }
      .kmd-nav-link:hover::after { width: 100%; }
      .kmd-icon-btn { color: var(--charcoal); background: none; border: none; cursor: pointer; }
      .kmd-mobile-menu { max-height: 0; overflow: hidden; background: var(--white); transition: max-height .4s ease; }
      .kmd-mobile-menu-open { max-height: 420px; box-shadow: 0 12px 24px rgba(47,58,54,0.08); }
      .kmd-mobile-link { color: var(--charcoal); text-decoration: none; display:block; padding: 12px 0; border-bottom: 1px solid rgba(47,58,54,0.08); font-size: 15px; letter-spacing: 0.04em; }

      /* ---------- Buttons ----------
         Brand rule: Mint background + white text; on hover, Champagne Gold
         background + Charcoal text. (--mint-btn is a deepened mint used only
         here so the white label text passes contrast — see token note above.) */
      .kmd-btn-primary, .kmd-btn-solid, .kmd-btn-ghost, .kmd-btn-outline-nav {
        display: inline-flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
        font-weight: 500; text-decoration: none; padding: 14px 26px; border-radius: 2px;
        transition: transform .25s ease, background .25s ease, color .25s ease, box-shadow .25s ease; cursor: pointer; border: none;
      }
      .kmd-btn-primary { background: var(--mint-btn); color: var(--white); }
      .kmd-btn-primary:hover { background: var(--gold); color: var(--charcoal); transform: translateY(-2px); }

      .kmd-btn-solid { background: #25D366; color: #fff; } /* WhatsApp CTAs keep WhatsApp's own brand green for recognizability */
      .kmd-btn-solid:hover { background: #1ebe5a; transform: translateY(-2px); }

      .kmd-btn-ghost { background: transparent; color: var(--charcoal); border: 1px solid rgba(47,58,54,0.25); }
      .kmd-btn-ghost:hover { border-color: var(--gold); color: var(--gold-text); background: rgba(200,169,106,0.08); }

      .kmd-btn-outline-nav { background: transparent; color: var(--charcoal); border: 1px solid rgba(47,58,54,0.2); padding: 10px 18px; font-size: 12px; }
      .kmd-btn-outline-nav:hover { border-color: var(--gold); background: var(--gold); color: var(--charcoal); }

      .kmd-follow-btn {
        align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
        color: var(--charcoal); border: 1px solid rgba(47,58,54,0.2); padding: 10px 20px; border-radius: 2px; text-decoration:none;
        transition: border-color .25s ease, background .25s ease, color .25s ease;
      }
      .kmd-follow-btn:hover { border-color: var(--gold); background: var(--gold); color: var(--charcoal); }

      /* ---------- Hero ---------- */
      .kmd-hero { background: radial-gradient(120% 100% at 15% 0%, #F3FAF6 0%, var(--ivory) 45%, var(--sage) 130%); min-height: 100vh; }
      .kmd-hero-inner { padding-top: 150px; }
      @media (min-width: 768px) { .kmd-hero-inner { padding-top: 190px; } }
      .kmd-hero-glow { position: absolute; inset: -10% 0 0 0; pointer-events: none; background: radial-gradient(55% 45% at 85% 12%, rgba(184,216,200,0.55), transparent 70%); }
      .kmd-hero-stats { border-top: 1px solid rgba(47,58,54,0.12); padding-top: 24px; }
      .kmd-stat-num { font-family:'Cormorant Garamond',serif; font-size:1.6rem; color: var(--gold-text); }
      .kmd-stat-label { font-size: 11px; letter-spacing: 0.05em; color: var(--muted); margin-top: 2px; }
      .kmd-stat-divider { width: 1px; height: 32px; background: rgba(47,58,54,0.12); }
      .kmd-hero-frame { border: 1px solid rgba(200,169,106,0.5); padding: 14px; transform: rotate(1.5deg); background: var(--white); }
      .kmd-hero-frame-small { border: 1px solid rgba(200,169,106,0.5); padding: 10px; width: 55%; margin-top: -60px; margin-left: auto; transform: rotate(-2deg); position: relative; z-index: 2; background: var(--white); }

      .kmd-fabric-placeholder {
        position: relative; width: 100%; height: 100%; min-height: 340px; border-radius: 2px;
        display: flex; align-items: flex-end; justify-content: flex-start; padding: 18px; overflow: hidden;
      }
      .kmd-fabric-placeholder span { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1rem; color: #FFFFFF; position: relative; z-index: 2; }
      .kmd-fabric-placeholder::before { content:''; position:absolute; inset:0; background-image: repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 26px); }
      .kmd-fabric-placeholder::after { content:''; position:absolute; inset:0; background: linear-gradient(180deg, transparent 40%, rgba(47,58,54,0.55) 100%); }
      .kmd-fabric-1 { background: linear-gradient(135deg,#B8D8C8,#DDEEE6 55%,#C8A96A 130%); }
      .kmd-fabric-2 { background: linear-gradient(135deg,#DDEEE6,#C8A96A 60%,#E7D3A4 130%); }
      .kmd-fabric-3 { background: linear-gradient(135deg,#96C2A9,#B8D8C8 60%,#DDEEE6 130%); }
      .kmd-fabric-4 { background: linear-gradient(135deg,#C8A96A,#DDEEE6 70%,#FFFDF8 130%); }

      /* ---------- Sections ---------- */
      .kmd-section-ivory { background: var(--ivory); }
      .kmd-section-sage { background: var(--sage); }

      /* ---------- Why choose ---------- */
      .kmd-why-card {
        background: var(--white); border: 1px solid rgba(47,58,54,0.06); padding: 26px;
        opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease, box-shadow .3s ease, border-color .3s ease;
      }
      .kmd-reveal-in .kmd-why-card { opacity: 1; transform: translateY(0); }
      .kmd-why-card:hover { box-shadow: 0 16px 34px rgba(47,58,54,0.08); border-color: rgba(200,169,106,0.4); }
      .kmd-why-card h3 { font-size: 1.15rem; font-weight: 500; margin: 14px 0 6px; color: var(--charcoal); }
      .kmd-why-card p { font-size: 13.5px; color: var(--slate); font-weight: 300; line-height: 1.55; margin: 0; }

      /* ---------- Collections ---------- */
      .kmd-coll-card {
        display: flex; flex-direction: column; background: var(--white); border: 1px solid rgba(47,58,54,0.06); overflow: hidden;
        transition: transform .35s ease, box-shadow .35s ease; opacity: 0; transform: translateY(24px);
      }
      .kmd-reveal-in .kmd-coll-card { opacity: 1; transform: translateY(0); transition: opacity .6s ease, transform .6s ease; }
      .kmd-coll-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(47,58,54,0.1); }
      .kmd-coll-media { height: 220px; position: relative; }
      .kmd-coll-tag { position: absolute; top: 14px; left: 14px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; color: #fff; border: 1px solid rgba(255,255,255,0.6); padding: 2px 9px; border-radius: 20px; z-index: 3; }
      .kmd-wish-btn {
        position: absolute; top: 12px; right: 12px; z-index: 3; width: 34px; height: 34px; border-radius: 50%;
        background: rgba(47,58,54,0.35); border: 1px solid rgba(255,255,255,0.5); color: #fff; display:flex; align-items:center; justify-content:center;
        cursor: pointer; transition: background .25s ease, color .25s ease, transform .2s ease;
      }
      .kmd-wish-btn:hover { transform: scale(1.08); }
      .kmd-wish-active { color: var(--gold); background: rgba(255,255,255,0.94); border-color: transparent; }
      .kmd-coll-hover-actions {
        position: absolute; inset: auto 0 0 0; z-index: 3; display: flex; gap: 8px; padding: 14px;
        transform: translateY(12px); opacity: 0; transition: transform .3s ease, opacity .3s ease;
      }
      .kmd-coll-media:hover .kmd-coll-hover-actions { transform: translateY(0); opacity: 1; }
      .kmd-quickview-btn, .kmd-shopnow-btn {
        flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
        font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase; padding: 10px 8px; border-radius: 2px;
        text-decoration: none; cursor: pointer; border: none; transition: background .2s ease, color .2s ease;
      }
      .kmd-quickview-btn { background: rgba(255,255,255,0.95); color: var(--charcoal); }
      .kmd-quickview-btn:hover { background: #fff; }
      .kmd-shopnow-btn { background: var(--mint-btn); color: #fff; }
      .kmd-shopnow-btn:hover { background: var(--gold); color: var(--charcoal); }
      .kmd-coll-info { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; }
      .kmd-coll-info h3 { font-size: 1.25rem; font-weight: 500; margin: 0; color: var(--charcoal); }
      .kmd-coll-info p { font-size: 13px; color: var(--slate); margin: 3px 0 0; font-weight: 300; }
      .kmd-coll-info svg { transition: transform .3s ease; }
      .kmd-coll-card:hover .kmd-coll-info svg { transform: translate(3px,-3px); }
      .kmd-price-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
      .kmd-price { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: var(--charcoal); }
      .kmd-stock { font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; font-weight: 500; }
      .kmd-stock-ok { background: rgba(184,216,200,0.4); color: #3E6B54; }
      .kmd-stock-low { background: rgba(200,169,106,0.18); color: var(--gold-text); }
      .kmd-stock-out { background: rgba(47,58,54,0.08); color: var(--muted); }
      .kmd-shopnow-disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

      /* ---------- Modal / Quick view / Lightbox ---------- */
      .kmd-modal-backdrop {
        position: fixed; inset: 0; z-index: 90; background: rgba(47,58,54,0.55); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center; padding: 20px;
        animation: kmd-fade-in .25s ease;
      }
      @keyframes kmd-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .kmd-modal { background: var(--ivory); max-width: 720px; width: 100%; display: grid; grid-template-columns: 1fr; overflow: hidden; position: relative; border-radius: 3px; }
      @media (min-width: 640px) { .kmd-modal { grid-template-columns: 1fr 1fr; } }
      .kmd-modal-media { min-height: 260px; }
      .kmd-modal-body { padding: 28px; }
      .kmd-modal-close, .kmd-lightbox .kmd-modal-close {
        position: absolute; top: 12px; right: 12px; z-index: 5; width: 34px; height: 34px; border-radius: 50%;
        background: rgba(47,58,54,0.45); color: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;
      }
      .kmd-lightbox { max-width: 720px; width: 100%; position: relative; }
      .kmd-lightbox-media { min-height: 60vh; border-radius: 3px; }

      /* ---------- About ---------- */
      .kmd-about-media { min-height: 460px; border-radius: 2px; }
      .kmd-dot-marker { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
      .kmd-point-title { font-size: 1rem; font-weight: 500; color: var(--charcoal); }
      .kmd-point-desc { font-size: 13.5px; color: var(--slate); font-weight: 300; margin-top: 3px; line-height: 1.55; }
      .kmd-quality-line { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--gold-text); border-top: 1px solid rgba(47,58,54,0.1); padding-top: 18px; }
      .kmd-founder-line { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05rem; color: var(--slate); }
      .kmd-founder-line strong { color: var(--gold-text); font-weight: 600; }

      /* ---------- Gallery masonry ---------- */
      .kmd-masonry { columns: 2; column-gap: 10px; }
      @media (min-width: 768px) { .kmd-masonry { columns: 4; } }
      .kmd-masonry-item {
        display: block; width: 100%; margin-bottom: 10px; border-radius: 2px; position: relative; overflow: hidden;
        border: none; padding: 0; cursor: pointer; break-inside: avoid;
        opacity: 0; transform: scale(0.96);
      }
      .kmd-reveal-in .kmd-masonry-item { opacity: 1; transform: scale(1); transition: opacity .6s ease, transform .6s ease; }
      .kmd-masonry-item:hover { transform: scale(1.015); }
      .kmd-gallery-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 12px; background: linear-gradient(180deg, transparent 55%, rgba(47,58,54,0.6)); opacity: 0.9; transition: opacity .3s ease; }
      .kmd-gallery-overlay span { color: #fff; font-family:'Cormorant Garamond',serif; font-style: italic; font-size: 0.95rem; }
      .kmd-masonry-item:hover .kmd-gallery-overlay { opacity: 1; }

      /* ---------- Testimonials ---------- */
      .kmd-avatar {
        width: 52px; height: 52px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;
        background: var(--sage); color: var(--gold-text); font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; border: 1px solid rgba(200,169,106,0.4);
      }
      .kmd-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.3rem, 2.4vw, 1.8rem); color: var(--charcoal); line-height: 1.5; max-width: 640px; margin: 0 auto; }
      .kmd-testi-name { color: var(--charcoal); font-weight: 500; font-size: 14px; letter-spacing: .04em; }
      .kmd-testi-city { color: var(--muted); font-size: 12px; margin-top: 2px; }
      .kmd-carousel-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(47,58,54,0.2); background: transparent; color: var(--charcoal); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color .25s ease, color .25s ease, background .25s ease; }
      .kmd-carousel-btn:hover { border-color: var(--gold); background: rgba(200,169,106,0.1); color: var(--gold-text); }
      .kmd-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(47,58,54,0.2); border: none; cursor: pointer; }
      .kmd-dot-active { background: var(--gold); }

      /* ---------- Instagram feed ---------- */
      .kmd-insta-item { display: block; position: relative; aspect-ratio: 1/1; border-radius: 2px; overflow: hidden; opacity: 0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease; }
      .kmd-reveal-in .kmd-insta-item { opacity: 1; transform: translateY(0); }
      .kmd-insta-overlay { position: absolute; inset: 0; background: rgba(47,58,54,0.4); color: #fff; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .25s ease; }
      .kmd-insta-item:hover .kmd-insta-overlay { opacity: 1; }

      /* ---------- Contact ---------- */
      .kmd-form { display: flex; flex-direction: column; gap: 18px; }
      .kmd-field { display: flex; flex-direction: column; gap: 6px; }
      .kmd-field span { font-size: 12px; letter-spacing: 0.06em; color: var(--slate); text-transform: uppercase; }
      .kmd-field input, .kmd-field textarea { border: 1px solid rgba(47,58,54,0.15); background: var(--white); padding: 12px 14px; font-family: 'Jost', sans-serif; font-size: 14px; color: var(--charcoal); border-radius: 2px; resize: vertical; outline: none; transition: border-color .25s ease; }
      .kmd-field input:focus, .kmd-field textarea:focus { border-color: var(--gold); }
      .kmd-contact-card { display: flex; gap: 14px; align-items: flex-start; background: var(--white); border: 1px solid rgba(47,58,54,0.06); padding: 16px 18px; border-radius: 2px; }

      /* ---------- Footer ---------- */
      .kmd-footer { background: linear-gradient(180deg, var(--sage), #CFE6DA); }
      .kmd-footer .kmd-logo { color: var(--gold-text); }
      .kmd-footer-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--gold-text); font-size: 1.05rem; }
      .kmd-footer-text { color: var(--slate); font-size: 14px; font-weight: 300; line-height: 1.6; }
      .kmd-footer-heading { color: var(--gold-text); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px; }
      .kmd-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
      .kmd-footer-links a { color: var(--slate); text-decoration: none; font-size: 14px; transition: color .2s ease; }
      .kmd-footer-links a:hover { color: var(--gold-text); }
      .kmd-newsletter { display: flex; max-width: 340px; border: 1px solid rgba(47,58,54,0.2); background: var(--white); }
      .kmd-newsletter input { flex: 1; background: transparent; border: none; padding: 11px 12px; color: var(--charcoal); font-size: 13px; outline: none; }
      .kmd-newsletter input::placeholder { color: var(--muted); }
      .kmd-newsletter button { background: var(--mint-btn); color: #fff; border: none; width: 42px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s ease, color .2s ease; }
      .kmd-newsletter button:hover { background: var(--gold); color: var(--charcoal); }
      .kmd-social-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(47,58,54,0.2); display: flex; align-items: center; justify-content: center; color: var(--charcoal); transition: border-color .2s ease, color .2s ease, background .2s ease; }
      .kmd-social-btn:hover { border-color: var(--gold); background: var(--gold); color: var(--charcoal); }
      .kmd-footer-bottom { border-top: 1px solid rgba(47,58,54,0.12); }
      .kmd-footer-bottom div { color: var(--muted); font-size: 12.5px; }

      /* ---------- Floating WhatsApp ---------- */
      .kmd-wa-float { position: fixed; bottom: 24px; right: 24px; z-index: 50; width: 58px; height: 58px; border-radius: 50%; background: #25D366; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 26px rgba(37,211,102,0.4); transition: transform .25s ease; }
      .kmd-wa-float:hover { transform: scale(1.08); }
      .kmd-wa-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #25D366; animation: kmd-pulse 2.2s ease-out infinite; }
      @keyframes kmd-pulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.7); opacity: 0; } }

      /* ---------- Reveal utility ---------- */
      .kmd-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s ease; }
      .kmd-reveal-in { opacity: 1; transform: translateY(0); }
      .kmd-reveal-delay { transition-delay: .15s; }

      @media (prefers-reduced-motion: reduce) {
        .kmd-reveal, .kmd-coll-card, .kmd-why-card, .kmd-masonry-item, .kmd-insta-item { transition: none !important; opacity: 1 !important; transform: none !important; }
        .kmd-wa-ring, .kmd-loader-path { animation: none; }
      }
    `}</style>
  );
}
