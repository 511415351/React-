import styles from './index.module.less';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, UserOutlined, SolutionOutlined, LaptopOutlined, HomeOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../store';

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
            type: 'group',
            icon: <UserOutlined />,
        },
        {
            key: '/menuList',
            label: 'Menu List',
            type: 'group',
            children: [
            { key: '/menu1', label: 'Option 3' },
            { key: '/menu2', label: 'Option 4' },
            ],
            icon: <MailOutlined />,
        },
        {
            key: '/roleList',
            label: 'Role List',
            type: 'group',
            icon: <SolutionOutlined />,
        },
        {
            key: '/deptList',
            label: 'Dept List',
            type: 'group',
            icon: <LaptopOutlined />,
        }
        ],
    },
  
];

const SiberMenu = () => {
    const { collapsed } = useStore();
    return (
        <div className={styles.siberMenu}>
            <div className={styles.logo}>
                <img src="" className={styles.img} alt="" />
                {collapsed ? '': <span >企业中台</span>}
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}
export default SiberMenu;