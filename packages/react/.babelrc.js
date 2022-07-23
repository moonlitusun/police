export default {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          esmodules: true,
        },
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/typescript',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
};
