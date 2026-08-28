import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import "./media-gallery.css";

const MEDIA = [
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.11.05 AM (1).jpeg", title: "Hum teen ka moment", label: "PHOTO 01", size: "tall" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.12.53 AM.mp4", title: "Memory 02", label: "VIDEO 01", size: "wide" },
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.11.05 AM.jpeg", title: "Memory 03", label: "PHOTO 02", size: "square" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.13.05 AM.mp4", title: "Memory 04", label: "VIDEO 02", size: "tall" },
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.11.19 AM (1).jpeg", title: "Memory 05", label: "PHOTO 03", size: "wide" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.21.27 AM.mp4", title: "Memory 06", label: "VIDEO 03", size: "square" },
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.11.19 AM.jpeg", title: "Memory 07", label: "PHOTO 04", size: "tall" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.21.37 AM.mp4", title: "Memory 08", label: "VIDEO 04", size: "wide" },
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.12.11 AM (1).jpeg", title: "Memory 09", label: "PHOTO 05", size: "square" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.21.53 AM.mp4", title: "Memory 10", label: "VIDEO 05", size: "tall" },
  { type: "photo", src: "/images/WhatsApp Image 2026-08-28 at 10.12.11 AM.jpeg", title: "Memory 11", label: "PHOTO 06", size: "wide" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 10.23.03 AM.mp4", title: "Memory 12", label: "VIDEO 06", size: "square" },
  { type: "photo", src: "/images/c9651736-2cb8-48e1-8e83-cefd3090118d.jpg", title: "Memory 13", label: "PHOTO 07", size: "tall" },
  { type: "video", src: "/images/WhatsApp Video 2026-08-28 at 8.45.49 AM.mp4", title: "Memory 14", label: "VIDEO 07", size: "wide" },
];

export default function MediaGallery() {
  const [active, setActive] = useState(null);

  const open = (index) => {
    setActive(index);
    window.dispatchEvent(new Event("rakhi:memory-open"));
  };

  const close = (goNext = false) => {
    setActive(null);
    window.dispatchEvent(new Event("rakhi:memory-close"));
    if (goNext) {
      setTimeout(() => {
        document.getElementById("after-memories")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const prev = () => setActive((i) => (i > 0 ? i - 1 : i));

  const next = () => {
    if (active === MEDIA.length - 1) {
      close(true);
      return;
    }
    setActive((i) => i + 1);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="media-gallery">
        {MEDIA.map((item, index) => (
          <motion.button
            className={`media-tile media-${item.size}`}
            key={`${item.label}-${item.title}`}
            onClick={() => open(index)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: Math.min(index, 8) * 0.07, duration: 0.55 }}
            whileHover={{ y: -7 }}
            whileTap={{ scale: 0.985 }}
          >
            <div className="media-visual">
              {item.type === "video" ? <video src={item.src} muted playsInline preload="metadata" /> : <img src={item.src} alt={item.title} loading="lazy" />}
              <div className="media-shade" />
              <div className="media-topline">
                <span>{item.type === "video" ? <Film size={14} /> : <Camera size={14} />} {item.label}</span>
                {item.type === "video" && <span className="play-pill"><Play size={12} fill="currentColor" /> VIDEO</span>}
              </div>
              <div className="media-caption">
                <span>{item.type === "video" ? "PLAY THIS MEMORY" : "OPEN THIS MEMORY"}</span>
                <h3>{item.title}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div className="media-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => close()}>
            <button className="media-close" onClick={() => close()}><X size={21} /></button>
            <button className="media-arrow media-prev" disabled={active === 0} onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft size={24} /></button>
            <motion.div className="media-lightbox-card" initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .97 }} onClick={(e) => e.stopPropagation()}>
              <div className="media-lightbox-visual">
                {MEDIA[active].type === "video" ? <video key={MEDIA[active].src} src={MEDIA[active].src} controls autoPlay playsInline /> : <img src={MEDIA[active].src} alt={MEDIA[active].title} />}
              </div>
              <div className="media-lightbox-copy">
                <span>{MEDIA[active].label} · {active + 1} / {MEDIA.length}</span>
                <h2>{MEDIA[active].title}</h2>
                <p>Your memory description goes here.</p>
              </div>
            </motion.div>
            <button className="media-arrow media-next" onClick={(e) => { e.stopPropagation(); next(); }}>{active === MEDIA.length - 1 ? <X size={24} /> : <ChevronRight size={24} />}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
