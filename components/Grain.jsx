import styled, { keyframes } from "styled-components";

// Film-grain overlay: an oversized noise texture jittered with a stepped
// animation so it reads as flicker rather than motion. The alpha mapping is
// tuned to the production texture's measured density: ~17% of pixels carry a
// speck, average opacity ~4%, grey ~0.3.
const NOISE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 -4 1.6"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`
)}`;

const jitter = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  30% { transform: translate(3%, -15%); }
  50% { transform: translate(12%, 9%); }
  70% { transform: translate(9%, 4%); }
  90% { transform: translate(-1%, 7%); }
`;

const Frame = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

const Noise = styled.div`
  position: absolute;
  left: -50vw;
  top: -50vh;
  width: 400vw;
  height: 400vh;
  background-image: url("${NOISE}");
  animation: ${jitter} 1.5s steps(6) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export default function Grain() {
  return (
    <Frame aria-hidden="true">
      <Noise />
    </Frame>
  );
}
