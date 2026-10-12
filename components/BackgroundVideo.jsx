import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(ellipse at 30% 20%, #2a2f3a 0%, #0b0b0d 70%);
`;

const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

// Full-bleed muted looping video behind everything, dimmed to 40% black.
// Falls back to a gradient if the file is missing. Browsers may pause muted
// autoplay while the page is hidden; it resumes when the page is visible again.
const BackgroundVideo = forwardRef(function BackgroundVideo({ src, poster }, forwardedRef) {
  const [failed, setFailed] = useState(false);
  const localRef = useRef(null);

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    const resume = () => {
      const video = localRef.current;
      if (video && video.paused && !document.hidden) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    return () => {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
    };
  }, []);

  return (
    <Layer aria-hidden="true">
      {!failed && (
        <Video
          ref={setRefs}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
        </Video>
      )}
      <Dim />
    </Layer>
  );
});

export default BackgroundVideo;
