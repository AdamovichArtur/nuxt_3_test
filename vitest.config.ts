import { defineConfig } from 'vitest/config'
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            packagePresets: ['lodash'],
            imports: [

                'vue',
                'vitest',
                'pinia',
                {
                    '#imports': [
                        'useNuxtApp',
                        'useBaseFetch',
                        'useRuntimeConfig',
                        'useState',
                        'useCookie',
                        'useLazyAsyncData',
                    ],
                },
                 ],
        }),
    ],
    coverage: {
        all: true,
    },
     test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./scripts/test/setup.ts']
    
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "#imports": path.resolve(__dirname, './imports-mock.ts'),
            "~": path.resolve(__dirname, "./"),
            
        },
    }
})