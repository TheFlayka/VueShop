import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
              @import "./src/assets/_vars.scss";
            `,
			},
		},
	},
	resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
