import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../lib/theme";

// Two circles pinned to the pointer: a 60px frosted ring and an 11px dot.
// Over anything interactive the ring tightens to 45px and the dot grows to
// 13px. Only shown for a real mouse on hover-capable devices; hidden over
// iframes, on touch/pen input, when the window blurs or the tab is hidden.

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary';
const MOUSE_QUERY = "(any-hover: hover) and (any-pointer: fine)";

const Base = styled.div`
  position: fixed;
  z-index: 9999;
  border-radius: 50%;
  pointer-events: none;
  visibility: hidden;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
`;

const Ring = styled(Base)`
  width: ${({ $hover }) => ($hover ? 45 : 60)}px;
  height: ${({ $hover }) => ($hover ? 45 : 60)}px;
  border: 1px solid ${colors.text};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const Dot = styled(Base)`
  width: ${({ $hover }) => ($hover ? 13 : 11)}px;
  height: ${({ $hover }) => ($hover ? 13 : 11)}px;
  background-color: ${colors.text};
`;

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mouse = window.matchMedia(MOUSE_QUERY);
    const parts = () => [ringRef.current, dotRef.current].filter(Boolean);

    const hide = () => {
      document.documentElement.classList.remove("custom-cursor-active");
      parts().forEach((el) => (el.style.visibility = "hidden"));
    };
    const trackHover = (target) =>
      setHovering(target instanceof Element && Boolean(target.closest(INTERACTIVE)));

    const onMove = (e) => {
      if (!mouse.matches || e.pointerType !== "mouse" || e.target instanceof HTMLIFrameElement) {
        hide();
        return;
      }
      parts().forEach((el) => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.visibility = "visible";
      });
      document.documentElement.classList.add("custom-cursor-active");
      trackHover(e.target);
    };
    const onOver = (e) => {
      if (e.pointerType !== "mouse" || e.target instanceof HTMLIFrameElement) hide();
      trackHover(e.target);
    };
    const onOut = (e) => !e.relatedTarget && hide();
    const onVisibility = () => document.hidden && hide();
    const onMediaChange = () => !mouse.matches && hide();

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    mouse.addEventListener("change", onMediaChange);

    return () => {
      hide();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      mouse.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <>
      <Ring ref={ringRef} $hover={hovering} aria-hidden="true" className="cursor-outer" />
      <Dot ref={dotRef} $hover={hovering} aria-hidden="true" className="cursor-inner" />
    </>
  );
}
