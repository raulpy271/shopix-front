import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@Components': path.resolve('./src/Components'),
      '@Controllers': path.resolve('./src/Controllers'),
      '@Layouts': path.resolve('./src/Layouts'),
      '@Pages': path.resolve('./src/Pages'),
      '@Theme': path.resolve('./src/Theme'),
    }
  }
})
