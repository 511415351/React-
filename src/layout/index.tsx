import { useEffect } from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import style from './index.module.less';
import HeaderCon from './header';
import FooterCon from './footer';
import { useStore } from '../store'
import SiberMenu from './menu';
import api from '../api/index';
import usePermission from '../hooks/usePermission';

const { Sider } = Layout;
const PUBLIC_PATHS = new Set(['/welcome', '/login', '/403']);

export default function LayoutCon(){
    const { collapsed, setUserInfo } = useStore();
    const location = useLocation();
    const { menuPaths } = usePermission();
    const isPublicPath = PUBLIC_PATHS.has(location.pathname);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await api.getUserInfo();
            setUserInfo(data);
        };

        void getUserInfo();
    }, [setUserInfo]);

    if (isPublicPath) {
        return (
            <Layout className={style.layout}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <   SiberMenu />
            </Sider>
            <Layout>
                <HeaderCon />
                <div className={style.content}>
                    <div className="wrapper">
                        <Outlet />
                    </div>
                </div>
                <FooterCon />
            </Layout>
        </Layout>
        );
    }

    if (menuPaths.length === 0) {
        return <Navigate to="/login" replace />;
    }

    if (!menuPaths.includes(location.pathname)) {
        return <Navigate to="/403" replace />;
    }

    return (
        <Layout className={style.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <   SiberMenu />
        </Sider>
        <Layout>
            <HeaderCon />
            <div className={style.content}>
                <div className="wrapper">
                    <Outlet />
                </div>
                
            </div>
            <FooterCon />
        </Layout>
    </Layout>
    );
}