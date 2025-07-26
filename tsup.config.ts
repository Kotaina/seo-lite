import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/client/index.ts',
        'src/server/index.ts'
    ],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: false,
    clean: true,
    splitting: false,
    outExtension({ format }) {
        return {
            js: format === 'cjs' ? '.cjs' : '.js'
        }
    },
})