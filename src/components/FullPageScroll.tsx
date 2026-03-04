import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface FullPageScrollProps {
  children: React.ReactNode[];
  sectionLabels?: string[];
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children, sectionLabels }) => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const total = children.length;

  // Check reduced motion preference
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback((index: number, dir: number) => {
    if (isTransitioning.current || index < 0 || index >= total || index === current) return;
    isTransitioning.current = true;
    setDirection(dir);
    setCurrent(index);
    const duration = prefersReducedMotion.current ? 100 : 800;
    setTimeout(() => { isTransitioning.current = false; }, duration);
  }, [current, total]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Wheel handler (desktop only)
  useEffect(() => {
    if (isMobile) return;
    let accumulated = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const threshold = 50;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulated += e.deltaY;
      clearTimeout(timeout);
      timeout = setTimeout(() => { accumulated = 0; }, 200);
      if (Math.abs(accumulated) >= threshold) {
        if (accumulated > 0) next();
        else prev();
        accumulated = 0;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile, next, prev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch (tablet landscape — mobile uses native scroll)
  useEffect(() => {
    if (isMobile) return;
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 60) { dy > 0 ? next() : prev(); }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchend", onTouchEnd); };
  }, [isMobile, next, prev]);

  // Mobile: render normally with scroll
  if (isMobile) {
    return <div>{children}</div>;
  }

  const reduced = prefersReducedMotion.current;
  const duration = reduced ? 0.1 : 0.8;

  const variants = {
    enter: (dir: number) => ({
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : dir > 0 ? "8%" : "-8%",
    }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : dir > 0 ? "-4%" : "4%",
    }),
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-screen overflow-y-auto"
        >
          <div className="min-h-screen">
            {children[current]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={sectionLabels?.[i] || `Section ${i + 1}`}
            className="group relative flex items-center justify-end"
          >
            {/* Tooltip */}
            {sectionLabels?.[i] && (
              <span className="absolute right-5 whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {sectionLabels[i]}
              </span>
            )}
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-2 h-2 bg-primary glow-sm"
                  : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FullPageScroll;
