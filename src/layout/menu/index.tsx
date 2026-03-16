import styles from './index.module.less';
import { createElement } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import { useStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';
import type { IMenu } from '../../types/api';

type MenuItem = Required<MenuProps>['items'][number];

function renderIcon(iconName?: string) {
    if (!iconName) {
        return undefined;
    }

    const iconMap = Icons as unknown as Record<string, (props: object) => ReturnType<typeof createElement>>;
    const IconComponent = iconMap[iconName];
    return IconComponent ? createElement(IconComponent, {}) : undefined;
}

function buildMenuItems(menuList: IMenu[]): MenuItem[] {
    return menuList
        .filter((item) => item.menuType === 1 && item.menuState === 1)
        .sort((prev, next) => prev.orderBy - next.orderBy)
        .map((item) => {
            const children = Array.isArray(item.children) ? buildMenuItems(item.children) : undefined;
            return {
                key: item.path || item._id,
                label: item.menuName,
                icon: renderIcon(item.icon || item.menuIcon),
                children: children?.length ? children : undefined,
            };
        });
}

function findOpenKeysByPath(list: IMenu[], targetPath: string, parentKeys: string[] = []): string[] {
    for (const item of list) {
        if (item.path === targetPath) {
            return parentKeys;
        }

        if (Array.isArray(item.children) && item.children.length > 0) {
            const nextParents = item.path ? parentKeys : [...parentKeys, item._id];
            const childResult = findOpenKeysByPath(item.children, targetPath, nextParents);
            if (childResult.length > 0 || item.children.some((child) => child.path === targetPath)) {
                return childResult;
            }
        }
    }

    return [];
}

const SiberMenu = () => {
    const navgiate = useNavigate();
    const location = useLocation();
    const { collapsed, currentMenu, setCurrentMenu } = useStore();
    const { menuList } = usePermission();
    const items = buildMenuItems(menuList);

    const menuClick = ({key}: {key: string}) => {
        if (!key.startsWith('/')) {
            return;
        }
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
                selectedKeys={[location.pathname || currentMenu]}
                defaultOpenKeys={findOpenKeysByPath(menuList, location.pathname || currentMenu)}
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