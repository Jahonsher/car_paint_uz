const { spawnSync } = require("node:child_process");
const result = spawnSync(
  process.execPath,
  [require.resolve("react-scripts/scripts/build")],
  {
    stdio: "inherit",
    env: { ...process.env, GENERATE_SOURCEMAP: "false" },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
require("./generate-sw.cjs");
require("./size-report.cjs");
