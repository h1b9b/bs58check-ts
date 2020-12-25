import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/bs58check.ts',
    external: ['crypto', 'buffer'],
    plugins: [
      resolve(),      // so Rollup can find `bs58`
      commonjs(),     // so Rollup can convert `bs58` to an ES module
      typescript(),   // so Rollup can convert TypeScript to JavaScript
    ],
    output: {
      name: 'bs58check-ts',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals: {
        crypto: 'crypto',
        buffer: 'buffer',
      }
    }
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/bs58check.ts',
    external: ['bs58', 'crypto'],
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }) // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ]
  }
];
