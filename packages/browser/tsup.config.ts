import { defineConfig } from '../../tsup.base';

export default defineConfig({
  base: {
    entry: [
      'src/index.ts',
    ],
    format: ['esm', 'cjs'],
    dts: true,
    legacyOutput: true,
  },
});
