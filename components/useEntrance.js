import { useEffect, useState } from "react";

// The UI stays hidden until the background video actually starts playing
// (or a 1.8s fallback fires), then reveals after a short beat. The reveal runs
// once per page load: client-side route changes skip it.
let hasPlayedThisLoad = false;

const FALLBACK_MS = 1800;
const SETTLE_MS = 550;

export function useEntrance(videoRef) {
  const [skip] = useState(hasPlayedThisLoad);
  const [ready, setReady] = useState(hasPlayedThisLoad);

  useEffect(() => {
    if (skip) return undefined;

    const reveal = () => {
      hasPlayedThisLoad = true;
      setReady(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return undefined;
    }

    let started = false;
    let settleTimer;
    const start = () => {
      if (started) return;
      started = true;
      settleTimer = setTimeout(reveal, SETTLE_MS);
    };

    const video = videoRef.current;
    video?.addEventListener("playing", start, { once: true });
    if (video && !video.paused && video.readyState >= 2) start();
    const fallbackTimer = setTimeout(start, FALLBACK_MS);

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(settleTimer);
      video?.removeEventListener("playing", start);
    };
  }, [skip, videoRef]);

  return { ready, skip };
}
