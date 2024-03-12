import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
const root = __dirname;
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(root, "src/components"),
      "@hooks": path.resolve(root, "src/hooks"),
      "@utils": path.resolve(root, "src/utils"),
      "@pages": path.resolve(root, "src/pages"),
      "@services": path.resolve(root, "src/services"),
      "@assets": path.resolve(root, "src/assets"),
      "@styles": path.resolve(root, "src/styles"),
    },
  },
})
