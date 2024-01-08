import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const manifestForPlugin = {
  registerType: "autoUpdate",
  includeAssets: [
    "favicon.ico",
    "/android-chrome-192x192.png",
    "apple-touch-icon.png",
  ],
  manifest: {
    name: "admin Dashboard",
    short_name: "Dashboard",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
