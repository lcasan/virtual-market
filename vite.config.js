import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vite.dev/config/
dotenv.config()
const PORT = process.env.PORT;

export default defineConfig({
  server: {
    port: PORT,
  },
  plugins: [react()],
})
