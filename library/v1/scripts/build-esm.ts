import { build } from "esbuild";
import { rmSync, mkdirSync } from "fs";

const outdir = "dist";

async function main() {
	rmSync(outdir, { recursive: true, force: true });
	mkdirSync(outdir, { recursive: true });

	const shared = {
		bundle: true,
		format: "iife" as const,
		target: "es2020",
		sourcemap: true,
		minify: true,
	};

	await Promise.all([
		build({
			...shared,
			entryPoints: ["src/esm/three-ds.ts"],
			outfile: `${outdir}/payconductor-3ds.js`,
		}),
		build({
			...shared,
			entryPoints: ["src/esm/handler.ts"],
			outfile: `${outdir}/payconductor-tokenizer.js`,
		}),
	]);

	console.log("Build complete: dist/");
}

main();
