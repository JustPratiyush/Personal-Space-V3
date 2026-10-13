import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { work } from "../../content/work";
import { colors, type } from "../../lib/theme";
import Heatmap from "../Heatmap";
import InstagramEmbed from "../InstagramEmbed";
import PixelIcon from "../PixelIcon";
import { Filters, Grid, ListPanel, Reference } from "../References";
import { Links, Showcase } from "../Showcase";
import { Highlight, external } from "../ui";

// Divides the tabs from the Shipped tab's heatmap, as the rows' top border does
// on the other tabs.
const Rule = styled.hr`
  margin: 0 0 14px;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Intro = styled.p`
  margin: 0 0 22px;
`;

// The way into the graveyard: deep red, behind a tombstone. `&&` keeps the red
// and the underline over Highlight's plain black links.
const GraveyardLink = styled(Link)`
  &&,
  &&:visited {
    color: ${colors.graveyard};
    text-decoration: underline;
  }
  text-underline-offset: 4px;
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    vertical-align: -2px;
  }
`;

// A project's screenshot, or its icon on a plain card, in one 16:10 frame.
const Shot = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: left top;
  border: 1px solid rgba(255, 255, 255, 0.09);
`;

const IconCard = styled.div`
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.04);

  img {
    width: 112px;
    height: 112px;
    border-radius: 22%;
  }
`;

const Stats = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  margin: 14px 0;

  dt {
    font-size: ${type.title};
  }
  dd {
    margin: 2px 0 0;
    font-size: ${type.meta};
    opacity: 0.75;
  }
`;

// The title links to the post, or to the item's first link.
function ShowcaseItem({ item }) {
  const href = item.instagram ?? item.links?.[0]?.href;
  const lines = item.body ?? (item.note ? [item.note] : []);

  return (
    <article>
      <div>
        <h2>
          <a href={href} {...external}>
            {item.name}
          </a>
        </h2>
        <small>{item.by}</small>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {item.stats && (
          <Stats>
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </Stats>
        )}
        {item.links && (
          <Links>
            {item.links.map((link) => (
              <a key={link.href} href={link.href} {...external}>
                {link.label} ↗
              </a>
            ))}
          </Links>
        )}
      </div>
      {item.instagram ? (
        <InstagramEmbed permalink={item.instagram} poster={item.poster} alt={item.name} />
      ) : item.icon ? (
        <IconCard>
          <img src={item.icon} alt="" width="256" height="256" />
        </IconCard>
      ) : (
        <Shot src={item.image} alt={item.imageAlt} width="960" height="600" loading="lazy" />
      )}
    </article>
  );
}

export default function Work({ contributions }) {
  const [group, setGroup] = useState(work.groups[0]);
  const visible = work.items.filter((item) => item.group === group);
  const showcase = visible.filter((item) => item.image || item.icon || item.instagram);
  const rows = visible.filter((item) => !item.image && !item.icon && !item.instagram);

  return (
    <ListPanel>
      <h1>work</h1>

      <Filters aria-label="Filter work">
        {work.groups.map((name) => (
          <button key={name} type="button" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </button>
        ))}
      </Filters>

      {work.heatmapGroup === group && (
        <>
          <Rule />
          <Heatmap user={work.githubUser} initialData={contributions} />
          <Intro>
            <Highlight>
              {work.intro}{" "}
              <GraveyardLink href="/graveyard">
                <PixelIcon kind="tombstone" />
                graveyard
              </GraveyardLink>
              .
            </Highlight>
          </Intro>
        </>
      )}

      {showcase.length > 0 && (
        <Showcase key={group}>
          {showcase.map((item) => (
            <ShowcaseItem key={item.name} item={item} />
          ))}
        </Showcase>
      )}

      {rows.length > 0 && (
        <Grid key={group}>
          {rows.map((item) => (
            <Reference key={`${item.name}-${item.by}`} {...item} />
          ))}
        </Grid>
      )}
    </ListPanel>
  );
}
