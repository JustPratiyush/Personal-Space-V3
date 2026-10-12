import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 900;

// Returns null until mounted so layout decisions never run against a guessed width.
export function useWindowWidth() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
