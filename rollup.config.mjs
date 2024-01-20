import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  // browser-friendly UMD build
  {
    input: 'src/bs58check.ts',
    external: ['crypto', 'buffer'],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
    ],
    output: {
      name: 'bs58check-ts',
      file: 'dist/bs58check-ts.umd.js',
      exports: 'named',
      format: 'umd',
      globals: {
        crypto: 'crypto',
        buffer: 'buffer',
      }
    }
  },
  {
    input: 'src/bs58check.ts',
    external: ['bs58', 'crypto'],
    plugins: [
      typescript()
    ],
    output: [
      {
        file: 'dist/bs58check-ts.cjs.js',
        exports: 'named',
        format: 'cjs'
      },
      {
        file: 'dist/bs58check-ts.esm.js',
        exports: 'named',
        format: 'es'
      }
    ]
  }
];
