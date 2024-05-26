const fs = require("node:fs");
const { build, analyzeMetafile } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

appBuild = async () => {
  try {
    const result = await build({
      entryPoints: ["src/**/*.ts"],
      outdir: "dist/cjs",
      minify: true,
      platform: "node",
      treeShaking: true,
      format: "cjs",
      bundle: true,
      metafile: true,
      sourcemap: true,
      plugins: [nodeExternalsPlugin()],
    });

    if (result.metafile) {
      fs.writeFileSync("./dist/metafile.json", JSON.stringify(result.metafile));
    }
    console.log("Build successful:", await analyzeMetafile(result.metafile));
    process.exit(0);
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
};

appBuild();
