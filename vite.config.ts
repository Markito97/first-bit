import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  base: "first-bit",
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3005,
  },
});
