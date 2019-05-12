const input = 'index.js'
const sourcemap = true

export default [{
    input,
    output: {
        file: 'dist/{{projectname}}.mjs',
        format: 'es',
        sourcemap
    }
}, {
    input,
    output: {
        file: 'dist/{{projectname}}.js',
        format: 'cjs',
        sourcemap
    }
},
{
    input,
    output: {
        file: 'dist/{{projectname}}.umd.js',
        format: 'umd',
        name: '{{projectname}}',
        sourcemap
    }
}]
