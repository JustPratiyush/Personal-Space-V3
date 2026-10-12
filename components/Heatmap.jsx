import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// A year of GitHub contributions in GitHub's own greens, gray on hover. Data
// comes from a public mirror of the contribution calendar; if it fails,
// nothing renders.

const CELL = 9;
const GAP = 2;

const Wrap = styled.div`
  margin: 4px 0 26px;
  font-size: 11px;
`;

const Scroller = styled.div`
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
`;

const Months = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${CELL}px;
  gap: ${GAP}px;
  width: max-content;
  height: 15px;
  font-size: 10px;
  opacity: 0.6;
  white-space: nowrap;
`;

const Cells = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${CELL}px;
  grid-template-rows: repeat(7, ${CELL}px);
  gap: ${GAP}px;
  width: max-content;
  transition: filter 400ms ease;

  &:hover {
    filter: grayscale(1);
  }

  i {
    display: block;
    background: rgba(255, 255, 255, 0.07);
  }
  i.pad {
    background: none;
  }
  /* GitHub's dark-mode contribution scale */
  i[data-l="1"] { background: #0e4429; }
  i[data-l="2"] { background: #006d32; }
  i[data-l="3"] { background: #26a641; }
  i[data-l="4"] { background: #39d353; }
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;

  a {
    color: inherit;
    text-underline-offset: 4px;
    white-space: nowrap;
  }
`;

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const asDate = (s) => new Date(`${s}T00:00:00Z`);

export default function Heatmap({ user }) {
  const [data, setData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => json?.contributions?.length && setData(json))
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  // Start scrolled to the most recent weeks on narrow screens.
  useEffect(() => {
    if (data && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  if (!data) return null;

  const days = data.contributions;
  const cells = Array(asDate(days[0].date).getUTCDay()).fill(null).concat(days);
  const weeks = Math.ceil(cells.length / 7);
  let lastMonth = "";
  const months = Array.from({ length: weeks }, (_, w) => {
    const first = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    if (!first) return "";
    const day = asDate(first.date);
    const label = monthFmt.format(day);
    if (label === lastMonth || day.getUTCDate() > 7) return "";
    lastMonth = label;
    return label;
  });
  const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);

  return (
    <Wrap>
      <Scroller ref={scrollRef}>
        <Months aria-hidden="true">
          {months.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </Months>
        <Cells role="img" aria-label={`GitHub contributions: ${total} in the last year`}>
          {cells.map((c, i) =>
            c ? (
              <i key={c.date} data-l={c.level} title={`${c.count} contribution${c.count === 1 ? "" : "s"} on ${c.date}`} />
            ) : (
              <i key={`pad-${i}`} className="pad" />
            )
          )}
        </Cells>
      </Scroller>
      <Foot>
        <span>{total.toLocaleString("en-US")} contributions in the last year</span>
        <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </Foot>
    </Wrap>
  );
}
