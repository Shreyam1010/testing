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
      const detail = (e as CustomEvent<{
        section?: string;
        collect?: (p: Promise<void>) => void;
      }>).detail;
      if (!detail?.section || detail.section === section) {
        const result = handlerRef.current();
        const promise = Promise.resolve(result).then(() => undefined);
        if (detail?.collect) detail.collect(promise);
        else void promise;
      }
    };
    window.addEventListener("admin:save", listener);
    return () => window.removeEventListener("admin:save", listener);
  }, [section]);
}
