"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  ["dimensional-lumber", "Dimensional"],
  ["treated-lumber", "Treated"],
  ["hardwood-lumber", "Hardwood"],
  ["softwood-lumber", "Softwood"],
  ["semi-hardwood-lumber", "Semi-Hardwood"],
  ["southern-yellow-pine", "Yellow Pine"],
  ["mouldings-title", "Mouldings"],
  ["pallets-title", "Pallets"],
  ["export-title", "Export"],
] as const;

export function LumberNavigation({ availableIds }: { availableIds: string[] }) {
  const visibleCategories = categories.filter(([id]) => id === "export-title" || availableIds.includes(id === "mouldings-title" ? "lumber-mouldings-dressed-lumber" : id === "pallets-title" ? "timber-pallets" : id));
  const [active, setActive] = useState("");
  const links = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = links.current;
    const selected = container?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    if (!container || !selected) return;
    const bounds = container.getBoundingClientRect();
    const item = selected.getBoundingClientRect();
    if (item.left < bounds.left) container.scrollLeft -= bounds.left - item.left + 16;
    if (item.right > bounds.right) container.scrollLeft += item.right - bounds.right + 16;
  }, [active]);

  useEffect(() => {
    const targets = categories.map(([id]) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item));
    const update = () => {
      const offset = document.querySelector(".lumber-navigation")?.getBoundingClientRect().bottom ?? 150;
      const passed = targets.filter((target) => target.getBoundingClientRect().top <= offset + 48);
      const requested = targets.find((target) => target.id === window.location.hash.slice(1));
      const requestedBounds = requested?.getBoundingClientRect();
      setActive(requested && requestedBounds && requestedBounds.top <= offset + 48 && requestedBounds.bottom > offset
        ? requested.id
        : passed.at(-1)?.id ?? "");
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { update(); frame = 0; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [availableIds]);

  return (
    <nav className="lumber-navigation" aria-label="Lumber categories">
      <div ref={links}>
        {visibleCategories.map(([id, label]) => (
          <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
