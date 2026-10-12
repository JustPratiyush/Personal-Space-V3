import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { type } from "../lib/theme";

// A year of GitHub contributions: rounded squares that fill the panel's width,
// month names centred over their weeks, then the total and a Less–More key
// under a rule. Data comes from a public mirror of the contribution calendar;
// if it fails, nothing renders.

// Grid geometry in SVG units. The SVG scales to the width, never below one
// unit per pixel; narrower screens scroll.
const CELL = 10;
const GAP = 3;
const RADIUS = 2;
const PITCH = CELL + GAP;

// No contributions, then the four levels. The first is translucent so empty
// days stay visible wherever the footage behind the panel is bright; on black
// it lands at #181b22.
const LEVELS = ["rgba(186, 216, 241, 0.1)", "#28432a", "#3e6c34", "#66a445", "#85d158"];

const DAY_MS = 24 * 60 * 60 * 1000;

// Fetched once per visit, so leaving the tab and coming back doesn't refetch.
const cache = {};

const Wrap = styled.div`
  margin: 10px 0 20px;
  font-size: ${type.meta};
  line-height: 1.2;
`;

const Scroller = styled.div`
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: thin;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Calendar = styled.div`
  min-width: ${({ $width }) => $width}px;
`;

const Months = styled.div`
  position: relative;
  height: 1.2em;
  margin-bottom: 14px;
  color: #71717a;

  span {
    position: absolute;
    left: clamp(1.5ch, var(--x), calc(100% - 1.5ch));
    transform: translateX(-50%);
    white-space: nowrap;
  }
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  color: #a1a1aa;

  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  b {
    color: #f4f4f5;
  }
`;

const Key = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  i {
    width: 13px;
    height: 13px;
    border-radius: 3px;
  }
  i:first-of-type {
    margin-left: 6px;
  }
  i:last-of-type {
    margin-right: 6px;
  }
`;

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const asDate = (s) => new Date(`${s}T00:00:00Z`);

export default function Heatmap({ user }) {
  const [data, setData] = useState(() => cache[user] ?? null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (cache[user]) return;
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json?.contributions?.length) return;
        cache[user] = json;
        setData(json);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  // Start scrolled to the most recent weeks on narrow screens.
  useEffect(() => {
    if (data && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  if (!data) return null;

  const days = data.contributions;
  const start = asDate(days[0].date);
  const offset = start.getUTCDay(); // weeks run Sunday to Saturday, top to bottom
  const weeks = Math.ceil((offset + days.length) / 7);
  const width = weeks * PITCH - GAP;
  const height = 7 * PITCH - GAP;

  // A week belongs to the month its Sunday falls in; each month's name sits
  // over the middle of its weeks. One-week months at the edges go unlabelled.
  const months = [];
  for (let w = 0; w < weeks; w++) {
    const label = monthFmt.format(new Date(start.getTime() + (w * 7 - offset) * DAY_MS));
    const last = months[months.length - 1];
    if (last?.label === label) last.to = w;
    else months.push({ label, from: w, to: w });
  }

  const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
  const firstYear = days[0].date.slice(0, 4);
  const lastYear = days[days.length - 1].date.slice(0, 4);
  const years = firstYear === lastYear ? firstYear : `${firstYear}-${lastYear.slice(2)}`;
  const summary = `contribution${total === 1 ? "" : "s"} in ${years}`;

  return (
    <Wrap>
      <Scroller ref={scrollRef}>
        <Calendar $width={width}>
          <Months aria-hidden="true">
            {months
              .filter((m) => m.to > m.from)
              .map((m) => (
                <span key={m.from} style={{ "--x": `${(((m.from + m.to) * PITCH + CELL) / 2 / width) * 100}%` }}>
                  {m.label}
                </span>
              ))}
          </Months>
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`GitHub contributions: ${total} in ${years}`}>
            {days.map((d, i) => (
              <rect
                key={d.date}
                x={Math.floor((offset + i) / 7) * PITCH}
                y={((offset + i) % 7) * PITCH}
                width={CELL}
                height={CELL}
                rx={RADIUS}
                fill={LEVELS[d.level] ?? LEVELS[0]}
              >
                <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
              </rect>
            ))}
          </svg>
        </Calendar>
      </Scroller>
      <Foot>
        <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
          <b>{total.toLocaleString("en-US")}</b> {summary}
        </a>
        <Key aria-hidden="true">
          Less
          {LEVELS.map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
          More
        </Key>
      </Foot>
    </Wrap>
  );
}
