
import { ConvexReactClient } from "convex/react";

// In Vite-powered frontends environment variables exposed to the client must
// be prefixed with VITE_. Read the client env first, then fall back to
// server-side process.env if available (useful for SSR or Node contexts).
const clientEnv = (typeof import.meta !== "undefined" && (import.meta as any).env) ? (import.meta as any).env : undefined;
const convexUrl = (clientEnv && clientEnv.VITE_CONVEX_URL) || process.env.CONVEX_URL;

if (!convexUrl) {
    // Provide a clear runtime message to help the developer fix the issue.
    throw new Error(
        "No Convex address provided. Set VITE_CONVEX_URL in your .env/.env.local or run `npx convex dev` to generate it."
    );
}

// Initialize the Convex client with the resolved URL.
export const convex = new ConvexReactClient(convexUrl);

export default convex;
