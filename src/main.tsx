import { createRoot } from 'react-dom/client'
import './styles/theme.less'
import './index.css'
import './components/Message/index.tsx'
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useStore } from './store';
import router from './router/index.tsx';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />)
