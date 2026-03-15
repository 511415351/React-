import styles from './index.module.less';
import { DownOutlined,MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import type { BreadcrumbProps, MenuProps } from 'antd';
import { Dropdown, Switch, Button, Breadcrumb  } from 'antd';
import { useStore} from '../../store'
import { Link, useLocation } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';
import { findTreePath } from '../../utils';


export default function HeaderCon() {
    const {collapsed, updateCollapsed, isDarkMode, toggleDarkMode} = useStore();
    const location = useLocation();
    const { menuList } = usePermission();
    const currentPathMenus = findTreePath(menuList, location.pathname);
    const dynamicBreadcrumbItems: BreadcrumbProps['items'] = currentPathMenus.map((item) => ({
        title: item.path ? <Link to={item.path}>{item.menuName}</Link> : item.menuName,
    }));

    const breadcrumbItems: BreadcrumbProps['items'] = [
        {
            title: <Link to="/welcome">首页</Link>,
        },
        ...dynamicBreadcrumbItems,
    ];

    const items: MenuProps['items'] = [
        {
            label: '123@gmail.com',
            key: 'email',
        },
        {
            label: 'Logout',
            key: 'logout',
        },
    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key);
    }
    const toggleCollapsed = () => {
        updateCollapsed();
    }
    const toggleDarkModeChange = (isDark: boolean) => {
        if(isDark) {
            toggleDarkMode(isDark);
            document.documentElement.dataset.theme = 'dark';
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.dataset.theme = 'light';
            document.documentElement.classList.remove('dark');
            toggleDarkMode(isDark);
        }
    }
    return (
        <div className={styles.headerCon}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: 'var(--dark-color)',
                }}
            />
            <div className={styles.left}>
                <Breadcrumb
                    className={styles.breadcrumb}
                    items={breadcrumbItems}
                />
            </div>
            <div className={styles.right}>
                <Switch 
                    checkedChildren="暗色" 
                    unCheckedChildren="默认" 
                    defaultChecked 
                    checked={isDarkMode}
                    onChange={toggleDarkModeChange}
                />
                <Dropdown menu={{ items, onClick }} trigger={['click']}>
                    <span className={styles.nickName}>Admin <DownOutlined /></span>
                </Dropdown>
            </div>
        </div>
    )
}