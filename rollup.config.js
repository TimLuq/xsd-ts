export default {
    experimentalCodeSplitting: true,
    experimentalDynamicImport: true,
    input: [
        "build/parser.js",
        "build/index.js"
    ],
    output: [
        {
            dir: 'dist/es',
            format: 'es',
            name: 'xsd-ts'
        }, {
            dir: 'dist/system',
            format: 'system',
            name: 'xsd-ts'
        }, {
            dir: 'dist/amd',
            format: 'amd',
            name: 'xsd-ts',
            amd: {
                id: "xsd-ts"
            }
        }, {
            dir: 'dist/cjs',
            format: 'cjs',
            name: 'xsd-ts'
        }
    ]
};