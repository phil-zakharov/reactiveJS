import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: [
    {
      file: `dist/bundle.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'default',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    esbuild(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
