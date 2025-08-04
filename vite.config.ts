import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.bin"],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"), // 경로는 실제 폴더 위치에 맞게 수정
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".glb")) {
            return "models/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
