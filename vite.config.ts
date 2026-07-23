import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { processQRAnalyticsTrack } from "./src/lib/analytics/track";
import { processWebsiteEnquiry } from "./src/lib/enquiry/trackEnquiry";

function reyoApiPlugin(): Plugin {
  return {
    name: "reyo-api-plugin",
    configureServer(server) {
      // POST /api/track-qr
      server.middlewares.use("/api/track-qr", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const payload = JSON.parse(body || "{}");
            const headers: Record<string, string | undefined> = {};
            for (const [key, val] of Object.entries(req.headers)) {
              headers[key] = Array.isArray(val) ? val.join(", ") : val;
            }

            const result = await processQRAnalyticsTrack(payload, headers);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error("[QR API Middleware] Error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false }));
          }
        });
      });

      // POST /api/enquiry
      server.middlewares.use("/api/enquiry", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const payload = JSON.parse(body || "{}");
            const result = await processWebsiteEnquiry(payload);
            res.statusCode = result.success ? 200 : 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error("[Enquiry API Middleware] Error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, message: "Server error" }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    reyoApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
