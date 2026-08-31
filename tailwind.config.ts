import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { fontFamily: { serif: ["var(--font-serif)", "serif"], sans: ["var(--font-sans)", "sans-serif"] }, colors: { ivory: "var(--ivory)", ink: "var(--ink)", sand: "var(--sand)", taupe: "var(--taupe)", gold: "var(--gold)" } } }, plugins: [] } satisfies Config;
