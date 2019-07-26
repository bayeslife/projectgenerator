const input = 'index.js'
const sourcemap = true

export default [{
    input,
    output: {
        file: 'dist/short-interval-control-infrastructure.mjs',
        format: 'es',
        sourcemap
    }
}, {
    input,
    output: {
        file: 'dist/short-interval-control-infrastructure.js',
        format: 'cjs',
        sourcemap
    }
},
{
    input,
    output: {
        file: 'dist/short-interval-control-infrastructure.umd.js',
        format: 'umd',
        name: 'short-interval-control-infrastructure',
        sourcemap
    }
}]
