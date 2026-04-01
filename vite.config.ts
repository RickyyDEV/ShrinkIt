import vinext from "vinext";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import "./env";
export default defineConfig({
  plugins: [
    babel({
      presets: [
        reactCompilerPreset({
          target: "19",
        }),
      ],
    }),
    tailwindcss(),
    vinext(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ["pg", "pg-native"],
  },
  ssr: {
    external: ["pg", "pg-nat  ive"],
  },
});
