import { useEffect, useRef } from "react";

type Section =
  | "hero"
  | "about"
  | "events"
  | "classes"
  | "gallery"
  | "blog"
  | "contact"
  | "services";

export function useAdminSave(section: Section, handler: () => void | Promise<void>) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<{ section?: string }>).detail;
      if (!detail?.section || detail.section === section) {
        void handlerRef.current();
      }
    };
    window.addEventListener("admin:save", listener);
    return () => window.removeEventListener("admin:save", listener);
  }, [section]);
}
