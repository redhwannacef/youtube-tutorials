import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import * as fs from "node:fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), readme()],
});

function readme(): Plugin {
  let readmeFile: string;
  let outputFile: string;
  return {
    name: "readme-plugin",

    configResolved(config) {
      readmeFile = path.resolve(config.root, "../README.md");
      outputFile = path.resolve(config.publicDir, "README.md");
    },

    configureServer(server) {
      server.watcher.add(readmeFile);
      server.watcher.on("change", async (file) => {
        if (file === readmeFile) await fs.copyFile(readmeFile, outputFile);
      });
    },

    async buildStart() {
      await fs.copyFile(readmeFile, outputFile);
    },

    handleHotUpdate({ file, server }) {
      if (file === outputFile)
        server.hot.send({ type: "custom", event: "readme-update" });
    },
  };
}
