import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // 1. Import plugin

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate', // Tự động cập nhật khi có nội dung mới
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Vroomcars',
                short_name: 'AppShortName',
                description: 'Mô tả ngắn về ứng dụng React PWA',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-192x192.png', // Bạn phải chuẩn bị icon này trong thư mục public
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png', // Bạn phải chuẩn bị icon này trong thư mục public
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
})
