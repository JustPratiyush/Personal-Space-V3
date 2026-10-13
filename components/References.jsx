import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { colors, font, type } from "../lib/theme";
import { Panel, external } from "./ui";

// Shared by Taste, Work and Graveyard: filter tabs over a two-column grid of
// rows. Each row shows a ► on hover; rows without an href render as plain text.

// The uppercase list panel Taste, Work and Graveyard share.
export const ListPanel = styled(Panel)`
  color: ${colors.text};
  font-family: ${font};
  text-transform: uppercase;
  line-height: 1.5;

  h1 {
    font: inherit;
    font-size: ${type.headline};
    margin: 0 0 20px;
  }
  p {
    font-size: ${type.text};
    line-height: 1.6;
  }
  @media (min-width: 1100px) {
    max-width: 1100px;
    padding: 24px 32px;
  }
`;

export const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
  margin: 28px 0 16px;

  button {
    min-height: 44px;
    padding: 10px 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-transform: inherit;
    cursor: pointer;
  }
  button[aria-pressed="true"],
  button:hover,
  button:focus-visible {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  @media (min-width: 1100px) {
    margin: 16px 0 12px;
  }
`;

export const Grid = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fade} 160ms ease;

  > article {
    padding: 0 0 4px;
    border-bottom: 1px solid #ffffff25;
  }
  @media (min-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(${({ $columns = 2 }) => $columns}, minmax(0, 1fr));
    column-gap: 30px;
    > article {
      padding-bottom: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Row = styled.a`
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: 0 10px;
  align-items: baseline;
  min-height: 44px;
  padding: 8px 0;
  color: inherit;
  text-decoration: none;

  &::before {
    content: "►";
    font-size: 11px;
    visibility: hidden;
  }
  &[href]:hover::before,
  &[href]:focus-visible::before {
    visibility: visible;
  }
  h2 {
    grid-column: 2;
    margin: 0;
    font: inherit;
    font-size: ${type.title};
    line-height: 1.3;
  }
  &[href]:hover h2,
  &[href]:focus-visible h2 {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  small {
    grid-column: 2;
    margin-top: 4px;
    font: inherit;
    font-size: ${type.meta};
  }

  /* Wide screens: name left, source right on one line; a note wraps below. */
  @media (min-width: 1100px) {
    grid-template-columns: 14px minmax(0, 1fr) auto;
    min-height: 38px;

    h2 {
      grid-row: 1;
      padding-right: 14px;
    }
    small {
      grid-column: 3;
      grid-row: 1;
      max-width: 180px;
      margin-top: 0;
      text-align: right;
    }
    small + small {
      grid-column: 2 / -1;
      grid-row: 2;
      max-width: none;
      text-align: left;
      opacity: 0.75;
    }
  }
`;

// One row: `name`, then `by` (right-aligned on wide screens), then an optional `note`.
export function Reference({ name, by, note, href }) {
  const linkProps = !href ? { as: "div" } : href.startsWith("/") ? { as: Link, href } : { href, ...external };
  return (
    <article>
      <Row {...linkProps}>
        <h2>{name}</h2>
        {by && <small>{by}</small>}
        {note && <small>{note}</small>}
      </Row>
    </article>
  );
}

export function ReferenceGrid({ items, columns }) {
  return (
    <Grid $columns={columns}>
      {items.map((item) => (
        <Reference key={`${item.name}-${item.by ?? ""}-${item.href ?? ""}`} {...item} />
      ))}
    </Grid>
  );
}
