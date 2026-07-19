import { useEffect, useRef, useState } from "react";
import { Calculator, X, Minus } from "lucide-react";

// Desmos API demo key from their public documentation examples.
const DESMOS_API_KEY = "dcb31709b452b1cf9dc26972add0fda6";
const DESMOS_SRC = `https://www.desmos.com/api/v1.10/calculator.js?apiKey=${DESMOS_API_KEY}`;

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (el: HTMLElement, opts?: Record<string, unknown>) => { destroy: () => void };
    };
  }
}

let scriptPromise: Promise<void> | null = null;
function loadDesmos(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.Desmos) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${DESMOS_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Desmos")));
      return;
    }
    const s = document.createElement("script");
    s.src = DESMOS_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Desmos"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function DesmosCalculator() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({ x: 24, y: 96 }));
  const [size] = useState({ w: 460, h: 520 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calcElRef = useRef<HTMLDivElement | null>(null);
  const calcRef = useRef<{ destroy: () => void } | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  // Initialize Desmos when opened
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadDesmos()
      .then(() => {
        if (cancelled || !calcElRef.current || calcRef.current || !window.Desmos) return;
        calcRef.current = window.Desmos.GraphingCalculator(calcElRef.current, {
          expressionsCollapsed: false,
          border: false,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Clamp position within viewport on open/resize
  useEffect(() => {
    if (!open) return;
    const clamp = () => {
      setPos((p) => ({
        x: Math.min(Math.max(8, p.x), Math.max(8, window.innerWidth - size.w - 8)),
        y: Math.min(Math.max(8, p.y), Math.max(8, window.innerHeight - 60)),
      }));
    };
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [open, size.w]);

  // Destroy calculator when fully closed
  useEffect(() => {
    if (open) return;
    calcRef.current?.destroy();
    calcRef.current = null;
  }, [open]);

  useEffect(() => {
    return () => {
      calcRef.current?.destroy();
      calcRef.current = null;
    };
  }, []);

  function onDragStart(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  }
  function onDragMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const nextX = Math.min(Math.max(8, dragRef.current.origX + dx), window.innerWidth - size.w - 8);
    const nextY = Math.min(Math.max(8, dragRef.current.origY + dy), window.innerHeight - 60);
    setPos({ x: nextX, y: nextY });
  }
  function onDragEnd() {
    dragRef.current = null;
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
          aria-label="Open Desmos calculator"
        >
          <Calculator className="h-4 w-4" /> Calculator
        </button>
      )}

      {open && (
        <div
          ref={containerRef}
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          style={{
            left: pos.x,
            top: pos.y,
            width: size.w,
            height: minimized ? "auto" : size.h,
          }}
        >
          <div
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            className="flex cursor-move select-none items-center justify-between border-b border-border bg-muted/60 px-3 py-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calculator className="h-4 w-4 text-primary" />
              Desmos Calculator
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized((m) => !m)}
                className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                aria-label={minimized ? "Restore calculator" : "Minimize calculator"}
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                aria-label="Close calculator"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={calcElRef}
            className="h-full w-full flex-1"
            style={{ minHeight: minimized ? 0 : 460, display: minimized ? "none" : "block" }}
          />
        </div>
      )}
    </>
  );
}
