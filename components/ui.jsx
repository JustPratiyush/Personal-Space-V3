import styled from "styled-components";
import { colors, font } from "../lib/theme";

// Content area to the right of the fixed side navigation.
export const Stage = styled.main`
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
  padding: 80px 44px 32px 164px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 20px;

  @media (min-width: 901px) and (max-width: 1199px) {
    padding-left: 154px;
    padding-right: 24px;
  }
  @media (min-width: 901px) and (max-height: 760px) {
    padding-top: 68px;
    padding-bottom: 20px;
  }
  @media (max-width: 900px) {
    align-content: start;
    padding: calc(88px + env(safe-area-inset-top)) max(12px, env(safe-area-inset-right))
      calc(64px + env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
  }
`;

// Frosted-glass card every section renders inside.
export const Panel = styled.section`
  position: relative;
  z-index: 0;
  width: 100%;
  max-width: 800px;
  min-width: 0;
  padding: clamp(22px, 3vw, 36px);
  background: ${colors.panel};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid ${colors.panelBorder};
  border-radius: 4px;
  overflow-wrap: anywhere;

  ul {
    list-style: none;
  }
`;

// Base text run used by About, Darkroom, Seafronts and Works.
export const Text = styled.span`
  color: ${colors.text};
  font-family: ${font};
  text-transform: uppercase;
  line-height: 1.5;
`;

export const Paragraph = styled.p`
  margin-bottom: 0.7em;
`;

// Inverted label; `clone` keeps the padding on every wrapped line.
export const Highlight = styled(Text)`
  background: ${colors.text};
  color: ${colors.background};
  padding: 3px 6px 4px 5px;
  width: fit-content;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;

  a,
  a:visited {
    color: ${colors.background};
    text-decoration: none;
  }
`;

export const SoftLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-decoration-color: ${colors.linkUnderline};
  text-underline-offset: 4px;
  transition: text-decoration-color 180ms ease;

  &:hover {
    text-decoration-color: currentColor;
  }
`;

export const external = { target: "_blank", rel: "noopener noreferrer" };
