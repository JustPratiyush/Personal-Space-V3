import styled from "styled-components";
import { type } from "../lib/theme";
import { fade } from "./References";

// Rows with their text on the left and a picture or Instagram post on the
// right, stacked on narrow screens: Work's projects and reels, and Press.
export const Showcase = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fade} 160ms ease;

  > article {
    display: grid;
    gap: 16px 32px;
    padding: 24px 0;
    border-bottom: 1px solid #ffffff25;
  }
  h2 {
    margin: 0 0 6px;
    font: inherit;
    font-size: ${type.title};
    line-height: 1.3;
  }
  h2 a {
    color: inherit;
    text-decoration: none;
  }
  h2 a:hover,
  h2 a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  small {
    display: block;
    margin-bottom: 14px;
    font-size: ${type.meta};
    opacity: 0.75;
  }
  p {
    max-width: 60ch;
    margin: 0 0 10px;
  }
  @media (min-width: 700px) {
    > article {
      grid-template-columns: minmax(0, 1fr) 350px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// A row's links: "Play it ↗  GitHub ↗".
export const Links = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;

  a {
    color: inherit;
    text-underline-offset: 4px;
  }
`;
