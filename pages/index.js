import dynamic from "next/dynamic";

// Every route in the original build is this same one-liner: the whole site is
// a single client-only component, so nothing but the shell is server-rendered.
export default dynamic(() => import("../components/App"), { ssr: false });
