# xsd-ts

Written in Typescript and comes transpiled to both UMD and ES6 modules with dynamic imports.

For a slight performace bump when knowing which loader to use and not using a bundler for your main project it is possible to run `npm run rollup`. Running this command generates the following directories:

- `dist/es`: optimized ES modules for use in contexts supporting standard import/export, such as modern browsers.
- `dist/amd`: when using AMD as the module loader this should minimize the number of roundtrips.
- `dist/system`: when using SystemJS as the module loader this should minimize the number of roundtrips.
- `dist/cjs`: when using CommonJS as the module loader, such as in node.js, this should minimize the number of files read.