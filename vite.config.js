import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            publicDirectory: 'httpdocs',
            input: ['resources/js/admin/dashboard.jsx', 'resources/js/site/site.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
