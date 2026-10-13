import { press } from "../content/lists";
import { work } from "../content/work";
import { Section } from "./sections";

// Pictures a section shows first, asked for in its page's HTML so they arrive
// before the background video starts streaming and crowds them out.
export const PRELOADS = {
  [Section.work]: work.items.flatMap((item) => item.image ?? item.icon ?? item.poster?.src ?? []),
  [Section.press]: press.coverage.flatMap((item) => [item.photo?.src, item.poster?.src, item.clipping?.src].filter(Boolean)),
};
