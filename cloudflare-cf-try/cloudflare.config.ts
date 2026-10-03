import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "xxx",
    "compatibilityDate": "2026-09-30",
    "observability": {
      "enabled": true
    }
  }
});
