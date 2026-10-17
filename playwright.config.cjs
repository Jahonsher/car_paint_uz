const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  timeout: 45000,
  workers: 1,
  fullyParallel: false,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173",
    channel: "chrome",
    headless: true,
    viewport: { width: 1440, height: 1000 },
    serviceWorkers: "block",
    trace: "retain-on-failure",
  },
  outputDir: "test-results",
  reporter: "list",
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "node scripts/preview.cjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 20000,
  },
});
