import styles from './index.module.less';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, UserOutlined, SolutionOutlined, LaptopOutlined, HomeOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {key: '/dashboard', label: 'Dashboard', icon: <HomeOutlined />},
    {
        key: '/user',
        label: 'USER',
        icon: <UsergroupDeleteOutlined />,
        children: [
        {
            key: '/userList',
            label: 'User List',
            icon: <UserOutlined />,
        },
        {
            key: '/menuList',
            label: 'Menu List',
            icon: <MailOutlined />,
        },
        {
            key: '/roleList',
            label: 'Role List',
            icon: <SolutionOutlined />,
        },
        {
            key: '/deptList',
            label: 'Dept List',
            icon: <LaptopOutlined />,
        }
        ],
    },
  
];

const SiberMenu = () => {
    const navgiate = useNavigate();
    const { collapsed, currentMenu, setCurrentMenu } = useStore();
    const menuClick = ({key}: {key: string}) => {
        setCurrentMenu(key);
        navgiate(key);
    }
    return (
        <div className={styles.siberMenu}>
            <div className={styles.logo}>
                <img src="" className={styles.img} alt="" />
                {collapsed ? '': <span >企业中台</span>}
            </div>
            <Menu
                defaultSelectedKeys={[currentMenu]}
                defaultOpenKeys={['sub1']}
                onClick={ menuClick}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}
export default SiberMenu;