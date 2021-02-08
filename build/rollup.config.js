import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify-es';
import resolve from 'rollup-plugin-node-resolve';
import nodent from 'rollup-plugin-nodent';

import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/entry.js',
  external: ['vue', 'lodash', 'd3', 'vue-drag-drop', 'vuedraggable'],
  output: {
    name: 'VueColormind',
    exports: 'named',
    globals: {
      vue: 'Vue',
      lodash: '_',
      d3: 'd3',
      'vue-drag-drop': 'VueDragDrop',
      vuedraggable: 'vuedraggable',
      '@hotpink/vue-mono-ui': 'VueMonoUi',
    },
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    buble({
      objectAssign: 'Object.assign',
      transforms: {
        asyncAwait: false,
        forOf: false,
      },
    }),
    resolve(),
    nodent({
      promises: true,
      noRuntime: true,
    }),
  ],
};

if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
