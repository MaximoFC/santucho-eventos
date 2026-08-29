"use client";

import Lenis from "lenis";
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import { NAVBAR_SCROLL_THRESHOLD } from "@/lib/scroll";

type ScrollToOptions = {
    offset?: number;
    duration?: number;
};

type ScrollContextValue = {
    scrolled: boolean;
    scrollTo: (target: string | number, opts?: ScrollToOptions) => void;
};

const ScrollContext = createContext<ScrollContextValue>({
    scrolled: false,
    scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const [scrolled, setScrolled] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
        });

        lenisRef.current = lenis;

        lenis.on("scroll", ({ scroll }: { scroll: number }) => {
            setScrolled((current) => {
                if (!current && scroll > NAVBAR_SCROLL_THRESHOLD) {
                    return true;
                }

                if (current && scroll < NAVBAR_SCROLL_THRESHOLD - 40) {
                    return false;
                }

                return current;
            });
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    function scrollTo(target: string | number, opts?: ScrollToOptions) {
        lenisRef.current?.scrollTo(target, {
            offset: opts?.offset ?? 0,
            duration: opts?.duration ?? 1.2,
        });
    }

    return (
        <ScrollContext.Provider value={{ scrolled, scrollTo }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useSmoothScroll() {
    return useContext(ScrollContext);
}