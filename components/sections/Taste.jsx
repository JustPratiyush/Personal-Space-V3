import { useState } from "react";
import styled from "styled-components";
import { taste } from "../../content/lists";
import { colors, type } from "../../lib/theme";
import PixelIcon from "../PixelIcon";
import { Filters, Grid, ListPanel, Reference } from "../References";
import { external } from "../ui";

// Taste's lists run long, so their names sit a step below the title size.
const TastePanel = styled(ListPanel)`
  article h2 {
    font-size: ${type.item};
  }
`;

const Collection = styled.details`
  margin-top: 16px;

  summary {
    min-height: 44px;
    padding: 12px 0;
    font-size: ${type.text};
    cursor: pointer;
  }
  summary:hover,
  summary:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  summary:focus-visible {
    outline: 1px solid currentColor;
    outline-offset: 3px;
  }
`;

const CollectionList = styled.div`
  margin: 8px 0 16px;

  > a {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) 12px;
    gap: 14px;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid ${colors.rule};
    color: inherit;
    text-decoration: none;
  }
  > a:hover strong,
  > a:focus-visible strong {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  small {
    display: block;
    margin-bottom: 5px;
    font-size: ${type.meta};
  }
  strong {
    display: block;
    font-size: ${type.item};
    font-weight: normal;
    line-height: 1.3;
  }
  svg {
    width: 28px;
    height: 28px;
  }
`;

// Opens on the tab named in the URL hash (e.g. /taste#books), else the first.
function initialGroup() {
  if (typeof window === "undefined") return taste.groups[0];
  const hash = decodeURIComponent(window.location.hash.slice(1)).replace(/-/g, " ");
  return taste.groups.includes(hash) ? hash : taste.groups[0];
}

export default function Taste() {
  const [group, setGroup] = useState(initialGroup);
  const visible = taste.references.filter((ref) => ref.group === group);

  const choose = (name) => {
    setGroup(name);
    window.history.replaceState(null, "", `#${name.replace(/ /g, "-")}`);
  };

  return (
    <TastePanel>
      <h1>taste</h1>
      {taste.intro.map((line) => (
        <p key={line}>{line}</p>
      ))}

      <Filters aria-label="Filter references">
        {taste.groups.map((name) => (
          <button key={name} type="button" aria-pressed={group === name} onClick={() => choose(name)}>
            {name}
          </button>
        ))}
      </Filters>

      <Grid key={group}>
        {visible.map((ref) => (
          <Reference key={`${ref.name}-${ref.by}`} {...ref} />
        ))}
      </Grid>

      {taste.collection && (
        <Collection>
          <summary>{taste.collection.title}</summary>
          <CollectionList>
            {taste.collection.items.map((item) => (
              <a key={item.href} href={item.href} {...external}>
                <PixelIcon kind={item.icon} />
                <span>
                  <small>{item.topic}</small>
                  <strong>{item.title}</strong>
                </span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </CollectionList>
        </Collection>
      )}
    </TastePanel>
  );
}
