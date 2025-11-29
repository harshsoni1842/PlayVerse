import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [
    tailwindcss(), react(

    ),
  ],
})

