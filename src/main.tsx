import { createRoot } from 'react-dom/client'
import './styles/theme.less'
import './index.css'
import './components/Message/index.tsx'
import {  RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
