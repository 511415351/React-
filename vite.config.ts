import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'


// const viteMckServer = () : Plugin => {
//   return {
//     name: 'vite-mock-server',
//     configureServer(server) {
//       server.middlewares.use((req, res, next) => {
//         if (req.url === '/api/users/login' && req.method === 'POST') {
//           let body = '';
//           req.on('data', chunk => {
//             body += chunk.toString();
//           });
//           req.on('end', () => {
//             const { username, password } = JSON.parse(body);
//             if (username === 'admin' && password === 'password') {
//               res.setHeader('Content-Type', 'application/json');
//               res.end(JSON.stringify({ success: true, message: 'Login successful' }));
//             } else {
//               res.setHeader('Content-Type', 'application/json');
//               res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
//             }
//           });
//         } else {
//           next();
//         }
//       });
//     },
//   };
// }

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://m1.apifoxmock.com/m1/7525447-7261837-default',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
  plugins: [react()],
})
