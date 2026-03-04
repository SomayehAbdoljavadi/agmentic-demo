import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";

interface FullPageScrollProps {
  children: React.ReactNode[];
  sectionLabels?: string[];
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children, sectionLabels }) => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showContinueHint, setShowContinueHint] = useState(false);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const total = children.length;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout>>();
  const edgeScrollCount = useRef(0);
  const lastEdgeTime = useRef(0);

  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Track internal scroll position for continue hint
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      const hasOverflow = el.scrollHeight > el.clientHeight + 10;
      setShowContinueHint(hasOverflow && nearBottom && current < total - 1);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [current, total]);

  // Reset hint and scroll position on section change
  useEffect(() => {
    setShowContinueHint(false);
    edgeScrollCount.current = 0;
  }, [current]);

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

  // Check if internal container can scroll in a direction
  const canScrollInternally = useCallback((dir: "down" | "up"): boolean => {
    const el = sectionRef.current;
    if (!el) return false;
    const hasOverflow = el.scrollHeight > el.clientHeight + 5;
    if (!hasOverflow) return false;
    if (dir === "down") return el.scrollHeight - el.scrollTop - el.clientHeight > 3;
    return el.scrollTop > 3;
  }, []);

  // Smooth internal scroll by a step
  const scrollInternally = useCallback((deltaY: number) => {
    const el = sectionRef.current;
    if (!el) return;
    // Scroll by a comfortable amount (like half viewport)
    const step = Math.min(Math.abs(deltaY) * 3, el.clientHeight * 0.4);
    el.scrollBy({ top: deltaY > 0 ? step : -step, behavior: "smooth" });
  }, []);

  // Wheel handler with internal scroll support
  useEffect(() => {
    if (isMobile) return;
    const threshold = 50;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // Check if we can scroll internally first
      if (goingDown && canScrollInternally("down")) {
        scrollInternally(e.deltaY);
        wheelAccum.current = 0;
        edgeScrollCount.current = 0;
        return;
      }
      if (goingUp && canScrollInternally("up")) {
        scrollInternally(e.deltaY);
        wheelAccum.current = 0;
        edgeScrollCount.current = 0;
        return;
      }

      // At edge - require a couple of scroll events at edge to confirm intent
      const now = Date.now();
      if (now - lastEdgeTime.current > 500) {
        edgeScrollCount.current = 0;
      }
      lastEdgeTime.current = now;
      edgeScrollCount.current++;

      // Need at least 2 edge scrolls to trigger section change (prevents accidental jumps)
      const el = sectionRef.current;
      const hasOverflow = el && el.scrollHeight > el.clientHeight + 5;
      const edgeThreshold = hasOverflow ? 2 : 1;

      if (edgeScrollCount.current < edgeThreshold) return;

      wheelAccum.current += e.deltaY;
      clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => { wheelAccum.current = 0; }, 200);

      if (Math.abs(wheelAccum.current) >= threshold) {
        if (wheelAccum.current > 0) next();
        else prev();
        wheelAccum.current = 0;
        edgeScrollCount.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile, next, prev, canScrollInternally, scrollInternally]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (canScrollInternally("down")) {
          scrollInternally(100);
          return;
        }
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (canScrollInternally("up")) {
          scrollInternally(-100);
          return;
        }
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, canScrollInternally, scrollInternally]);

  // Touch (tablet)
  useEffect(() => {
    if (isMobile) return;
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 60) return;
      if (dy > 0) {
        if (canScrollInternally("down")) return;
        next();
      } else {
        if (canScrollInternally("up")) return;
        prev();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchend", onTouchEnd); };
  }, [isMobile, next, prev, canScrollInternally]);

  // Mobile: native scroll
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
          className="absolute inset-0 w-full h-screen"
        >
          <div
            ref={sectionRef}
            className="h-screen overflow-y-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="min-h-screen">
              {children[current]}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Continue hint */}
      <AnimatePresence>
        {showContinueHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Continue</span>
            <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dot indicators with progress */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={sectionLabels?.[i] || `Section ${i + 1}`}
            className="group relative flex items-center justify-end"
          >
            {sectionLabels?.[i] && (
              <span className="absolute right-5 whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {sectionLabels[i]}
              </span>
            )}
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-2 h-2 bg-primary glow-sm"
                  : i < current
                    ? "w-1.5 h-1.5 bg-primary/40"
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
