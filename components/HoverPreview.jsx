import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors, font } from "../lib/theme";
import { Highlight, external } from "./ui";

// Inline highlighted terms that open a small paper-coloured card on hover or
// focus. The card sits above the trigger when it clears the 74px top bar,
// otherwise below, clamped to the viewport. A 200ms grace period lets the
// pointer travel from the trigger into the card.

const CARD_WIDTH = 220;
const TOP_BAR = 74;
const CLOSE_DELAY_MS = 200;

const pop = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`;

const Trigger = styled.button`
  border: 0;
  padding: 0;
  background: none;
  font: inherit;
  text-transform: inherit;
  color: inherit;
  cursor: pointer;
`;

const Card = styled.div`
  position: fixed;
  z-index: 10000;
  width: ${CARD_WIDTH}px;
  max-width: calc(100vw - 24px);
  max-height: calc(100dvh - 86px);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 5px;
  background: ${colors.card};
  color: ${colors.cardText};
  box-shadow: 0 8px 24px #0006;
  font: 12px/1.45 ${font};
  text-transform: uppercase;
  animation: ${pop} 140ms ease;

  img {
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  img.portrait {
    height: 180px;
    object-fit: contain;
    background: #161616;
  }
  p {
    margin: 0;
    padding: 8px 5px 4px;
  }
  a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 5px;
    color: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

function estimateHeight(item) {
  return (item.portrait ? 240 : item.image ? 210 : 235) + (item.href ? 50 : 0);
}

function placeCard(item, rect) {
  const height = estimateHeight(item);
  const left = Math.max(12, Math.min(rect.left, window.innerWidth - CARD_WIDTH - 12));
  const above = rect.top - height - 10;
  const top = above > TOP_BAR ? above : Math.min(rect.bottom + 10, window.innerHeight - height - 12);
  return { left, top: Math.max(TOP_BAR, top) };
}

export function useHoverPreview() {
  const [open, setOpen] = useState(null);
  const closeTimer = useRef();
  const cardRef = useRef(null);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (!cardRef.current?.contains(document.activeElement)) setOpen(null);
    }, CLOSE_DELAY_MS);
  };
  const show = (item, element) => {
    cancelClose();
    setOpen({ item, ...placeCard(item, element.getBoundingClientRect()) });
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    const onScroll = () => setOpen(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  const triggerProps = (item) => ({
    onMouseEnter: (e) => show(item, e.currentTarget),
    onMouseLeave: scheduleClose,
    onFocus: (e) => show(item, e.currentTarget),
    onBlur: scheduleClose,
    "aria-expanded": open?.item === item,
  });

  const card = open && (
    <Card
      ref={cardRef}
      role="dialog"
      aria-label={open.item.label}
      style={{ left: open.left, top: open.top }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {open.item.image && <img src={open.item.image} alt="" className={open.item.portrait ? "portrait" : undefined} />}
      <p>{open.item.note}</p>
      {open.item.href && (
        <a href={open.item.href} {...external} onBlur={scheduleClose}>
          Visit &rarr;
        </a>
      )}
    </Card>
  );

  return { triggerProps, card };
}

export function PreviewTerm({ item, triggerProps }) {
  return (
    <Trigger type="button" {...triggerProps(item)}>
      <Highlight>{item.label}</Highlight>
    </Trigger>
  );
}
