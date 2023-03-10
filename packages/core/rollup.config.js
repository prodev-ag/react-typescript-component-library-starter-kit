import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
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
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["@library/icons"],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
