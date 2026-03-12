"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface DiGA {
  id: string;
  name: string;
  url: string;
  logo: string;
  manufacturer: string;
  category: string;
}

interface DiGASearchProps {
  digas: DiGA[];
}

export function DiGASearch({ digas }: DiGASearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredDigas = useMemo(() => {
    if (!query.trim()) return digas;
    const lower = query.toLowerCase();
    return digas.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.manufacturer.toLowerCase().includes(lower) ||
        d.category.toLowerCase().includes(lower)
    );
  }, [query, digas]);

  const handleSelect = useCallback((diga: DiGA) => {
    if (diga.url) window.location.href = diga.url;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          setIsOpen(true);
          return;
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredDigas.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredDigas.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredDigas.length) {
            handleSelect(filteredDigas[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, filteredDigas, highlightedIndex, handleSelect]
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="DiGA suchen..."
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition-shadow hover:shadow-md focus:border-gray-300 focus:shadow-md"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="diga-listbox"
          aria-activedescendant={
            highlightedIndex >= 0
              ? `diga-option-${highlightedIndex}`
              : undefined
          }
          autoComplete="off"
        />
      </div>

      {isOpen && filteredDigas.length > 0 && (
        <ul
          id="diga-listbox"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-gray-200 bg-white py-2 shadow-lg"
        >
          {filteredDigas.map((diga, index) => (
            <li
              key={diga.id}
              id={`diga-option-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors ${
                index === highlightedIndex ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleSelect(diga)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Image
                src={diga.logo}
                alt=""
                width={32}
                height={32}
                className="flex-shrink-0 rounded-lg"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-gray-900">
                  {diga.name}
                </div>
                <div className="text-xs text-gray-400">{diga.category}</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query && filteredDigas.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-gray-200 bg-white p-4 text-center text-sm text-gray-400 shadow-lg">
          Keine DiGA gefunden
        </div>
      )}
    </div>
  );
}
