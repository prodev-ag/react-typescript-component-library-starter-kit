import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import autoExternal from "rollup-plugin-auto-external";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "rollup-plugin-commonjs";

import pkg from "./package.json";

export default [
  {
    input: "lib/core/src/index.js",

    output: [
      {
        file: pkg.main,
        format: "umd",
        name: "@library-core",
        sourcemap: true,
        plugins: [uglify()],
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      peerDepsExternal(),
      autoExternal(),
      url({
        include: ["**/*.woff", "**/*.woff2"],
        limit: Infinity,
      }),
      resolve(),
      postcss({
        plugins: [],
      }),
      sourcemaps(),
      resolve(),
      commonjs(),
    ],
    external: ["@library/icons"],
  },
  {
    input: "lib/core/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      peerDepsExternal(),
      autoExternal(),
      postcss({
        extensions: [".css"],
      }),
      dts(),
    ],
  },
];
