import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, font } from "../lib/theme";

// Camcorder-style overlay: live clock + date bottom-left, "PLAY" + elapsed
// session time bottom-right. Both are hidden on mobile.

const Corner = styled.div`
  position: fixed;
  bottom: 20px;
  display: grid;
  grid-template-rows: auto auto;
  gap: 5px;
  ${({ $side }) => ($side === "left" ? "left: 25px;" : "right: 30px; justify-items: end;")}

  @media (max-width: 900px) {
    display: none;
  }
`;

const Readout = styled.h2`
  width: fit-content;
  padding: 0 5px;
  color: ${colors.text};
  font-family: ${font};
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: ${({ $align }) => $align ?? "left"};

  @media (max-width: 900px) {
    background: ${colors.background};
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const pad = (n) => String(n).padStart(2, "0");

function formatElapsed(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return [h, m, totalSeconds % 60].map(pad).join(":");
}

function formatClock(date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(":");
}

function useTick(intervalMs = 1000) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}

export function Clock() {
  useTick();
  const now = new Date();
  return (
    <Corner $side="left">
      <Readout>{formatClock(now)}</Readout>
      <Readout>{now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</Readout>
    </Corner>
  );
}

export function PlayTimer() {
  const elapsed = useTick();
  return (
    <Corner $side="right">
      <Readout $align="right">Play</Readout>
      <Readout>{formatElapsed(elapsed)}</Readout>
    </Corner>
  );
}
