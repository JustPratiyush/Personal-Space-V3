import { useEffect } from "react";
import styled from "styled-components";
import { NAV_LABELS, NAV_SECTIONS, Section } from "../lib/sections";
import { colors, font } from "../lib/theme";
import { MOBILE_BREAKPOINT, useWindowWidth } from "../lib/useWindowWidth";

// z-index keeps the nav above <Stage>, which becomes a stacking context while
// its entrance animation runs and spans the full width behind the nav.
const SideList = styled.nav`
  position: fixed;
  z-index: 2;
  left: 22px;
  height: 100vh;
  display: grid;
  align-content: center;
  gap: 6px;
  text-transform: uppercase;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Overlay = styled.nav`
  position: fixed;
  inset: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: grid;
  align-content: start;
  place-items: baseline;
  padding: calc(90px + env(safe-area-inset-top)) max(24px, env(safe-area-inset-right))
    calc(32px + env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left));
  background: ${colors.background};
  text-transform: uppercase;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 18px auto;
  align-items: center;
  color: ${colors.text};
  font-family: ${font};
  letter-spacing: 0.12rem;
`;

const Marker = styled.div`
  place-self: center;
`;

// The current section is underlined rather than recoloured.
const Item = styled.button`
  min-height: 44px;
  padding: 10px 6px;
  border: 0;
  background: transparent;
  color: ${colors.text};
  font-family: ${font};
  font-size: ${({ $large }) => ($large ? "clamp(22px, 5vw, 36px)" : "1rem")};
  font-weight: bold;
  letter-spacing: 0.12rem;
  line-height: 1.4;
  text-align: left;
  text-transform: inherit;
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
  text-underline-offset: 6px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// The graveyard isn't in the nav; it lives under Work.
const NAV_PARENT = { [Section.graveyard]: Section.work };

function NavItems({ active, onSelect, large }) {
  const current = NAV_PARENT[active] ?? active;
  return NAV_SECTIONS.map((section) => {
    const isActive = section === current;
    return (
      <Row key={section}>
        <Marker aria-hidden="true">{isActive ? " ► " : null}</Marker>
        <Item
          type="button"
          $active={isActive}
          $large={large}
          aria-current={isActive ? "page" : undefined}
          onClick={() => onSelect(section)}
        >
          {NAV_LABELS[section] ?? section}
        </Item>
      </Row>
    );
  });
}

export default function Navigation({ active, onSelect, mobileOpen, onMobileOpenChange }) {
  const width = useWindowWidth();

  // Close the overlay if the window grows past the mobile breakpoint.
  useEffect(() => {
    if (mobileOpen && width !== null && width > MOBILE_BREAKPOINT) onMobileOpenChange(false);
  }, [width, mobileOpen, onMobileOpenChange]);

  // Lock page scroll while the overlay is open; Escape closes it.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onMobileOpenChange(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, onMobileOpenChange]);

  const select = (section) => {
    onMobileOpenChange(false);
    if (section !== active) onSelect(section);
  };

  return (
    <>
      <SideList aria-label="Sections">
        <NavItems active={active} onSelect={select} />
      </SideList>
      {mobileOpen && (
        <Overlay id="mobile-navigation" aria-label="Main navigation">
          <NavItems active={active} onSelect={select} large />
        </Overlay>
      )}
    </>
  );
}
