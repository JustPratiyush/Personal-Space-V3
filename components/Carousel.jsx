import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Highlight, external } from "./ui";

// One highlighted item at a time, auto-advancing. Rotation pauses while the
// pointer or focus is inside, when paused by the user, when the tab is hidden,
// and entirely under prefers-reduced-motion. The frame animates its height
// to the measured height of the current item.

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Frame = styled.div`
  position: relative;
  margin: 14px 0 0;
  padding: 0 6px;
  height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
  transition: height 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Slide = styled.div`
  padding: 4px 0 6px;
  animation: ${fadeIn} 200ms ease;

  ${Highlight} {
    outline: 1px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 4px 0 22px;
  font-size: 12px;
  color: inherit;

  button {
    min-width: 44px;
    min-height: 44px;
    padding: 0 6px;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-transform: uppercase;
    cursor: pointer;
  }
  button:hover {
    text-decoration: underline;
  }
  @media (min-width: 901px) and (max-height: 800px) {
    button {
      min-height: 36px;
    }
  }
`;

export default function Carousel({ items, interval = 9500, label = "Achievements" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [height, setHeight] = useState(null);
  const slideRef = useRef(null);

  useEffect(() => {
    const el = slideRef.current;
    if (!el) return undefined;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const schedule = () => {
      clearInterval(timer);
      if (reduced.matches || paused || hovered) return;
      timer = setInterval(() => {
        if (!document.hidden) setIndex((i) => (i + 1) % items.length);
      }, interval);
    };
    schedule();
    reduced.addEventListener("change", schedule);
    return () => {
      clearInterval(timer);
      reduced.removeEventListener("change", schedule);
    };
  }, [items.length, interval, paused, hovered]);

  const step = (delta) => setIndex((i) => (i + delta + items.length) % items.length);
  const item = items[index];

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(false)}
    >
      <Frame $height={height} aria-live={paused ? "polite" : "off"}>
        <Slide key={index} ref={slideRef}>
          <Highlight>
            {item.href?.startsWith("/") ? (
              <Link href={item.href}>{item.text}</Link>
            ) : item.href ? (
              <a href={item.href} {...external}>
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </Highlight>
        </Slide>
      </Frame>
      <Controls aria-label={`${label} controls`}>
        <span>
          {index + 1} of {items.length}
        </span>
        <button type="button" aria-label="Previous item" onClick={() => step(-1)}>
          &larr;
        </button>
        <button type="button" aria-label="Next item" onClick={() => step(1)}>
          &rarr;
        </button>
        <button type="button" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? "Play" : "Pause"}
        </button>
      </Controls>
    </div>
  );
}
