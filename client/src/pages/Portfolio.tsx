import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Weddings",
  "Pre-Weddings",
  "Fashion",
  "Events",
  "Corporate",
  "Baby Shoots",
  "Outdoor",
];

interface GalleryItem {
  category: string;
  title: string;
  aspect: string;
}

const galleryItems: GalleryItem[] = [
  { category: "Weddings", title: "Royal Palace Wedding", aspect: "aspect-[3/4]" },
  { category: "Pre-Weddings", title: "Sunset Love Story", aspect: "aspect-[4/5]" },
  { category: "Fashion", title: "Editorial Collection", aspect: "aspect-[3/4]" },
  { category: "Weddings", title: "Beachside Vows", aspect: "aspect-[4/3]" },
  { category: "Events", title: "Gala Celebration", aspect: "aspect-[1/1]" },
  { category: "Fashion", title: "Runway Highlights", aspect: "aspect-[3/4]" },
  { category: "Pre-Weddings", title: "Mountain Escape", aspect: "aspect-[4/5]" },
  { category: "Corporate", title: "Annual Summit", aspect: "aspect-[4/3]" },
  { category: "Baby Shoots", title: "Little Princess", aspect: "aspect-[3/4]" },
  { category: "Weddings", title: "Temple Ceremony", aspect: "aspect-[1/1]" },
  { category: "Outdoor", title: "Golden Hour Magic", aspect: "aspect-[4/3]" },
  { category: "Fashion", title: "Bridal Couture", aspect: "aspect-[3/4]" },
  { category: "Events", title: "Sangeet Night", aspect: "aspect-[4/5]" },
  { category: "Corporate", title: "Product Launch", aspect: "aspect-[1/1]" },
  { category: "Baby Shoots", title: "Twin Joy", aspect: "aspect-[3/4]" },
  { category: "Pre-Weddings", title: "Heritage Romance", aspect: "aspect-[3/4]" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem = selectedIndex !== null ? filtered[selectedIndex] : null;

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Our Work
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              The Portfolio
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              A curated selection of our finest work across weddings, fashion, events, and beyond. 
              Every image is a story waiting to be told.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full font-nav text-xs uppercase tracking-[0.15em] transition-all duration-300",
                  activeCategory === cat
                    ? "bg-terracotta text-ivory"
                    : "text-white/50 hover:text-white border border-white/10 hover:border-white/30",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-8">
        <div className="container px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filtered.map((item, i) => (
              <SectionReveal key={i} delay={(i % 8) * 50}>
                <button
                  onClick={() => setSelectedIndex(i)}
                  className="block w-full mb-4 group relative overflow-hidden rounded-2xl border border-white/5 hover:border-terracotta/30 transition-all duration-500"
                >
                  <div className={`${item.aspect} bg-gradient-to-br from-espresso to-background relative overflow-hidden`}>
                    {/* Placeholder gradient representing photos */}
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 via-transparent to-terracotta/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Grid3X3 className="h-8 w-8 text-terracotta/20 mb-3" strokeWidth={1} />
                      <span className="text-ivory/20 font-heading text-lg">{item.category}</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                      <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-terracotta mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-xl text-white">{item.title}</h3>
                    </div>
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          >
            <X className="h-8 w-8" strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-10 w-10" strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 text-white/40 hover:text-white transition-colors"
          >
            <ChevronRight className="h-10 w-10" strokeWidth={1} />
          </button>

          <div className="max-w-4xl w-full mx-12" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] bg-gradient-to-br from-espresso to-background rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center p-12">
                <Grid3X3 className="h-16 w-16 text-terracotta/10 mx-auto mb-6" strokeWidth={1} />
                <span className="font-nav text-xs uppercase tracking-[0.2em] text-terracotta block mb-2">
                  {selectedItem.category}
                </span>
                <h2 className="font-heading text-3xl text-white">{selectedItem.title}</h2>
                <p className="text-muted-foreground font-body mt-4">
                  Full-resolution images would display here with zoom and pan capabilities.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-white/40 font-nav text-xs">
            {selectedIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
};

export default Portfolio;
