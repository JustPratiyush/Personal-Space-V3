import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled, { css, keyframes } from "styled-components";

import { site } from "../content/site";
import { Section, pathForSection, sectionFromPath } from "../lib/sections";
import { colors, font } from "../lib/theme";
import { MOBILE_BREAKPOINT, useWindowWidth } from "../lib/useWindowWidth";
import BackgroundVideo from "./BackgroundVideo";
import Grain from "./Grain";
import { Clock, PlayTimer } from "./HudCorners";
import Navigation from "./Navigation";
import { Stage } from "./ui";
import { useEntrance } from "./useEntrance";

import About from "./sections/About";
import Essays from "./sections/Essays";
import Graveyard from "./sections/Graveyard";
import Press from "./sections/Press";
import Taste from "./sections/Taste";
import Work from "./sections/Work";

const SECTION_COMPONENTS = {
  [Section.about]: About,
  [Section.work]: Work,
  [Section.essays]: Essays,
  [Section.taste]: Taste,
  [Section.press]: Press,
  [Section.graveyard]: Graveyard,
};

const TopBar = styled.button`
  position: fixed;
  top: 0;
  z-index: 101;
  width: 100vw;
  display: grid;
  place-items: center;
  padding-top: env(safe-area-inset-top);
  border: 0;
  background: ${colors.barBackground};
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12);

  @media (min-width: 901px) {
    cursor: default;
  }
`;

const Title = styled.h2`
  padding: 15px;
  color: ${colors.text};
  font-family: ${font};
  letter-spacing: 0.25rem;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 900px) {
    font-size: 1.2rem;
    line-height: 2rem;
  }
`;

// Entrance: content rises out of a blur, the panel's glass "frosts" in.
const riseIn = keyframes`
  0% { opacity: 0; filter: blur(14px); transform: translateY(14px) scale(0.985); }
  65% { opacity: 1; }
  100% { opacity: 1; filter: blur(0); transform: none; }
`;

const frostIn = keyframes`
  from { background: rgba(220, 230, 240, 0.08); backdrop-filter: blur(2px); }
  45% { background: rgba(30, 32, 36, 0.5); backdrop-filter: blur(24px); }
  to { background: ${colors.panel}; backdrop-filter: blur(18px); }
`;

const Entrance = styled.div`
  display: contents;

  > * {
    visibility: ${({ $ready, $skip }) => ($ready || $skip ? "visible" : "hidden")};
  }

  ${({ $ready, $skip }) =>
    $ready &&
    !$skip &&
    css`
      > * {
        animation: ${riseIn} 1200ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      > button {
        animation-delay: 0ms;
      }
      > main {
        animation-delay: 100ms;
      }
      > main > section {
        animation: ${frostIn} 1200ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    > *,
    > main > section {
      animation: none !important;
    }
  }
`;

export default function App() {
  const router = useRouter();
  const videoRef = useRef(null);
  const width = useWindowWidth();
  const { ready, skip } = useEntrance(videoRef);

  const [active, setActive] = useState(() => sectionFromPath(router.asPath));
  const [mobileOpen, setMobileOpen] = useState(false);

  // "/" has no section of its own; send it to About. Otherwise follow the URL.
  useEffect(() => {
    if (router.asPath === "/") router.replace(pathForSection(Section.about));
    else setActive(sectionFromPath(router.asPath));
  }, [router]);

  const selectSection = (section) => {
    setActive(section);
    router.push(pathForSection(section));
  };

  const isMobile = width !== null && width <= MOBILE_BREAKPOINT;
  const ActiveSection = SECTION_COMPONENTS[active] ?? About;

  return (
    <>
      <BackgroundVideo ref={videoRef} src={site.backgroundVideo} poster={site.backgroundPoster} />
      <Grain />
      <Entrance $ready={ready} $skip={skip}>
        <Navigation
          active={active}
          onSelect={selectSection}
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
        />
        <TopBar
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => isMobile && setMobileOpen((open) => !open)}
        >
          <Title>
            {site.headerLabel}
            {isMobile ? (mobileOpen ? " ×" : " ☰") : ""}
          </Title>
        </TopBar>
        <Stage>
          <ActiveSection />
        </Stage>
        <Clock />
        <PlayTimer />
      </Entrance>
    </>
  );
}
