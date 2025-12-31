import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueApexTree',
      fileName: 'vue-apextree',
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ['vue', 'apextree'],
      output: {
        globals: {
          vue: 'Vue',
          apextree: 'ApexTree',
        },
      },
    },
  },
});
