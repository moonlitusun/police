import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const { NODE_ENV } = process.env;

export default defineConfig({
  input: 'src/index.jsx',
  output: [
    // {
    //   file: 'dist/index.js',
    //   format: 'umd',
    //   name: 'QuoteClient'
    // },
    {
      file: 'dist/es/index.js',
      format: 'es',
    }
  ],
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx', 'jsx'],
    }),
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    // }),
    commonjs({
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
    }),
  ],
  external: [
    'react',
  ]
});
