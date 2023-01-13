import {terser} from 'rollup-plugin-terser';

function convertBookmarklet() {
  return {
    name: 'convert-bookmarklet',
    generateBundle(options, bundle, isWrite) {
      Object.values(bundle).forEach(v =>
        v.code = 'javascript:' + encodeURIComponent(v.code)
      );
    },
    writeBundle(options, bundle) {
      Object.keys(bundle).forEach(k => console.log(k + ' : ' + bundle[k].code.length + ' bytes'));
    }
  };
}
export default {
  input: 'src/tablefilter.js',
  output: [
    {
      file: 'dist/tablefilter.dist.js',
      plugins: [
        terser(),
        convertBookmarklet()
      ]
    }
  ]
};

