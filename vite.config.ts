import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // comment off just for dev purpose
  // server: {
  //   port: parseInt(process.env.PORT) || 3000,
  //   host: true,
  // },
});
