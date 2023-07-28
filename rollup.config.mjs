import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `bundle.js`,
      dir: 'dist',
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
