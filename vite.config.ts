import vinext from "vinext";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss(), vinext()],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ["pg", "pg-native"],
  },
  ssr: {
    external: ["pg", "pg-native"],
  },
});
