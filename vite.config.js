import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": {
        target: "https://tripatra-test-go-71a9e24956bc.herokuapp.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
