import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  description: string;
  aspect: string;
  src: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Events",
  "Fashion",
  "Outdoor",
  "Groups",
  "Portraits",
  "Baby Shoots",
];

// ─── Gallery Items ────────────────────────────────────────────────────────────
//
//  Copy these files into:  client/public/photos/
//
//  photo-night-lights.jpg    ← IMG_20260110_182034.jpg       (night event, coloured trees)
//  photo-gateway-group.jpg   ← IMG_20251028_155026.jpg       (Gateway of India, 5 friends)
//  photo-mall-group.jpg      ← IMG_20260327_131208.jpg       (Inorbit mall, 7 friends)
//  photo-jerseys-trio.jpg    ← retouch_2026031516001718.jpg  (3 guys in #33 jerseys)
//  photo-vintage-kids.jpg    ← FB_IMG_1776745060431.jpg      (2 kids, old studio photo)
//  photo-orange-kurta.jpg    ← IMG_20260508_111424.jpg       (orange kurta, mall railing)
//  photo-arcade-smile.jpg    ← retouch_2026050912444319.jpg  (arcade, red lights, smile)
//  photo-campus-portrait.jpg ← IMG_20260407_151808.jpg       (plaid shirt, campus outdoor)
//  photo-ocean-moody.jpg     ← retouch_2026040308060454.jpg  (ocean, moody green tones)
//  photo-forest-night.jpg    ← retouch_2025092323420502.jpg  (dark forest, night portrait)
//  photo-nature-portrait.jpg ← retouch_2026022219553130.jpg  (nature closeup, warm smile)
//  photo-train-portrait.jpg  ← retouch_2026021207274406.jpg  (train window, city blur)
//  photo-staircase.jpg       ← IMG_20250919_091744.jpg       (staircase, maroon tee)
//  photo-glasses-portrait.jpg← FB_IMG_1776745087762.jpg      (black shirt, glasses, steel)
//  photo-baby-vintage.jpg    ← retouch_2026042213031088.jpg  (baby on chair, sepia)
//
// ─────────────────────────────────────────────────────────────────────────────

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Events ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Events",
    title: "Night Gala Portrait",
    description: "Vibrant coloured lights framing an evening celebration.",
    aspect: "aspect-[4/3]",
    src: "/photos/photo-night-lights.jpg",
  },
  {
    id: 2,
    category: "Events",
    title: "Gateway Celebration",
    description: "A group moment at the iconic Gateway of India, Mumbai.",
    aspect: "aspect-[4/3]",
    src: "/photos/photo-gateway-group.jpg",
  },

  // ── Groups ───────────────────────────────────────────────────────────────────
  {
    id: 3,
    category: "Groups",
    title: "Mall Squad",
    description: "Seven friends, one frame, endless memories at Inorbit.",
    aspect: "aspect-[4/3]",
    src: "/photos/photo-mall-group.jpg",
  },
  {
    id: 4,
    category: "Groups",
    title: "Matching Jerseys",
    description: "Coordinated style and pure joy — the trio in #33.",
    aspect: "aspect-[4/3]",
    src: "/photos/photo-jerseys-trio.jpg",
  },
  {
    id: 5,
    category: "Groups",
    title: "Childhood Together",
    description: "A timeless vintage print of sibling bonds.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-vintage-kids.jpg",
  },

  // ── Fashion ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    category: "Fashion",
    title: "Orange Kurta Edit",
    description: "Casual elegance against a bright mall atrium.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-orange-kurta.jpg",
  },
  {
    id: 7,
    category: "Fashion",
    title: "Arcade Glam",
    description: "Bold lights, bold smile — a candid fashion moment.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-arcade-smile.jpg",
  },
  {
    id: 8,
    category: "Fashion",
    title: "Campus Look",
    description: "Relaxed plaid and an effortless outdoor vibe.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-campus-portrait.jpg",
  },

  // ── Outdoor ───────────────────────────────────────────────────────────────────
  {
    id: 9,
    category: "Outdoor",
    title: "Moody Ocean",
    description: "A lone figure in the tide — atmospheric and still.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-ocean-moody.jpg",
  },
  {
    id: 10,
    category: "Outdoor",
    title: "Forest After Dark",
    description: "Night canopy, deep shadows, and quiet presence.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-forest-night.jpg",
  },
  {
    id: 11,
    category: "Outdoor",
    title: "Nature Closeup",
    description: "Warm bokeh and an honest smile in open air.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-nature-portrait.jpg",
  },

  // ── Portraits ─────────────────────────────────────────────────────────────────
  {
    id: 12,
    category: "Portraits",
    title: "Train Window",
    description: "City blur, natural light, and a candid glance.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-train-portrait.jpg",
  },
  {
    id: 13,
    category: "Portraits",
    title: "Staircase Study",
    description: "Minimalist architecture frames a quiet portrait.",
    aspect: "aspect-[3/4]",
    src: "/photos/photo-staircase.jpg",
  },
  {
    id: 14,
    category: "Portraits",
    title: "Industrial Gaze",
    description: "Black shirt, steel frame, and a focused stare.",
    aspect: "aspect-[1/1]",
    src: "/photos/subhani.jpg",
  },

  // ── Baby Shoots ───────────────────────────────────────────────────────────────
  {
    id: 15,
    category: "Baby Shoots",
    title: "Vintage Studio",
    description: "A timeless studio portrait — soft, sepia, and sweet.",
    aspect: "aspect-[1/1]",
    src: "/photos/photo-baby-vintage.jpg",
  },
  {
  id: 16,
  category: "Groups",
  title: "Night Portrait Trio",
  description: "Black and white group portrait under night lights.",
  aspect: "aspect-[3/4]",
  src: "/photos/photo-night-trio-bw.jpg",
},
{
  id: 17,
  category: "Events",
  title: "Cinema Moments",
  description: "Friends enjoying a memorable cinema experience.",
  aspect: "aspect-[4/3]",
  src: "/photos/photo-cinema-friends.jpg",
},
{
  id: 18,
  category: "Portraits",
  title: "Neon Night Portrait",
  description: "Creative portrait illuminated by colorful lights.",
  aspect: "aspect-[3/4]",
  src: "/photos/photo-neon-girl.jpg",
},
{
  id: 19,
  category: "Portraits",
  title: "Traditional Beauty",
  description: "Elegant traditional portrait with natural light.",
  aspect: "aspect-[3/4]",
  src: "/photos/photo-purple-traditional.jpg",
},
{
  id: 20,
  category: "Portraits",
  title: "Motion Portrait",
  description: "Dynamic black and white motion blur portrait.",
  aspect: "aspect-[3/4]",
  src: "/photos/photo-motion-blur-portrait.jpg",
},
{
  id: 21,
  category: "Outdoor",
  title: "Beach Dream",
  description: "Relaxing beach portrait with ocean waves.",
  aspect: "aspect-[3/4]",
  src: "/photos/photo-beach-dream.jpg",
},
{
  id: 22,
  category: "Events",
  title: "Birthday Celebration",
  description: "Birthday memories captured with classmates.",
  aspect: "aspect-[4/3]",
  src: "/photos/photo-birthday-classmates.jpg",
},
{
  id: 23,
  category: "Groups",
  title: "Campus Friends",
  description: "Friends gathered together on campus.",
  aspect: "aspect-[4/3]",
  src: "/photos/photo-campus-friends-row.jpg",
},
  
];

// ─── Component ────────────────────────────────────────────────────────────────

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [lbImageLoaded, setLbImageLoaded] = useState(false);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem =
    selectedIndex !== null ? filtered[selectedIndex] : null;

  // ── Lightbox navigation ────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setLbImageLoaded(false);
      setSelectedIndex((selectedIndex + 1) % filtered.length);
    }
  }, [selectedIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setLbImageLoaded(false);
      setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
    }
  }, [selectedIndex, filtered.length]);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    setLbImageLoaded(false);
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────────────

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev, closeLightbox]);

  // ── Lock body scroll when lightbox open ───────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  // ── Reset selection on category change ────────────────────────────────────

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedIndex(null);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="pt-32">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-background/60 to-background" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.35em] text-terracotta mb-6 block">
              Our Work
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              The Portfolio
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              A curated selection of our finest work across portraits, fashion,
              events, and beyond. Every image is a story waiting to be told.
            </p>
          </SectionReveal>
          <SectionReveal delay={500}>
            <div className="mt-8 flex items-center justify-center gap-3 text-muted-foreground font-nav text-xs uppercase tracking-[0.2em]">
              <span>{GALLERY_ITEMS.length} photographs</span>
              <span className="w-1 h-1 rounded-full bg-terracotta inline-block" />
              <span>{CATEGORIES.length - 1} categories</span>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Sticky Category Filter ────────────────────────────────────────── */}
      <section className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-5 py-2 rounded-full font-nav text-xs uppercase tracking-[0.15em] transition-all duration-300",
                  activeCategory === cat
                    ? "bg-terracotta text-ivory shadow-lg shadow-terracotta/20"
                    : "text-white/40 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Count ───────────────────────────────────────────────────── */}
      <div className="container px-6 pt-6 pb-2">
        <p className="font-nav text-xs uppercase tracking-[0.2em] text-muted-foreground text-right">
          {filtered.length} photos
        </p>
      </div>

      {/* ── Masonry Gallery ───────────────────────────────────────────────── */}
      <section className="py-4 pb-24">
        <div className="container px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
            {filtered.map((item, i) => (
              <SectionReveal key={item.id} delay={(i % 8) * 40}>
                <button
                  onClick={() => {
                    setLbImageLoaded(false);
                    setSelectedIndex(i);
                  }}
                  className="block w-full mb-3 group relative overflow-hidden rounded-xl border border-white/5 hover:border-terracotta/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  aria-label={`Open ${item.title}`}
                >
                  <div className={cn(item.aspect, "relative overflow-hidden bg-espresso/60")}>
                    {/* Skeleton shimmer */}
                    {!imageLoaded[item.id] && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-espresso/80 to-background/60" />
                    )}

                    {/* Photo */}
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      onLoad={() =>
                        setImageLoaded((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        "group-hover:scale-[1.04]",
                        imageLoaded[item.id] ? "opacity-100" : "opacity-0"
                      )}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-start justify-end p-4 text-left">
                      <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-terracotta mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-base text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-white/60 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-terracotta/80">
                        <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span className="font-nav text-[10px] uppercase tracking-widest">View</span>
                      </div>
                    </div>
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-heading text-2xl text-white/20 font-light">
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${selectedItem.title}`}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 text-white/30 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 z-10 text-white/30 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 z-10 text-white/30 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Next photo"
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1} />
          </button>

          {/* Image */}
          <div
            className="relative flex flex-col items-center justify-center w-full h-full px-16 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Spinner */}
            {!lbImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
              </div>
            )}

            <img
              key={selectedItem.id}
              src={selectedItem.src}
              alt={selectedItem.title}
              onLoad={() => setLbImageLoaded(true)}
              className={cn(
                "max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl transition-opacity duration-500",
                lbImageLoaded ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Caption */}
            <div
              className={cn(
                "mt-5 text-center transition-opacity duration-500",
                lbImageLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="font-nav text-[11px] uppercase tracking-[0.25em] text-terracotta block mb-1">
                {selectedItem.category}
              </span>
              <h2 className="font-heading text-xl md:text-2xl text-white font-light">
                {selectedItem.title}
              </h2>
              <p className="font-body text-sm text-white/40 mt-1 max-w-md mx-auto">
                {selectedItem.description}
              </p>
            </div>
          </div>

          {/* Dot strip navigator */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLbImageLoaded(false);
                  setSelectedIndex(i);
                }}
                aria-label={`Go to photo ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === selectedIndex
                    ? "w-5 h-1.5 bg-terracotta"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
                )}
              />
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-5 right-6 text-white/20 font-nav text-[10px] tracking-widest hidden md:block">
            ← → navigate &nbsp;·&nbsp; esc close
          </div>
        </div>
      )}

    </main>
  );
};

export default Portfolio;