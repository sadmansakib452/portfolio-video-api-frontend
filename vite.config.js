import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Binds to all network interfaces, making it accessible via your IP
    // port: 3000, // Specifies the port (you can change it if needed)
  },
});
