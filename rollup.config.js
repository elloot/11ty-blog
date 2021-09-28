import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/main.js',
  output: {
    file: '_site/js/bundle.js',
    format: 'iife'
  },
  plugins: [terser()]
};
