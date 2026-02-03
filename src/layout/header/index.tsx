import React, { useState } from 'react';
import styles from './index.module.less';
import { AntDesignOutlined, PlayCircleOutlined, DownOutlined,MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import type { MenuProps} from 'antd';
import { Dropdown, Space, Button  } from 'antd';
import { useStore} from '../../store'


export default function HeaderCon() {
    const {collapsed, updateCollapsed} = useStore();
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
    return (
        <div className={styles.headerCon}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                fontSize: '16px',
                width: 64,
                height: 64,color: '#fff',
                }}
            />
            <div className={styles.left}>
                <PlayCircleOutlined />
                <div className={styles.nickName}>Admin</div>
            </div>
            <div className={styles.right}>
                <Dropdown menu={{ items, onClick }} trigger={['click']}>
                    <span className={styles.nickName}>Admin <DownOutlined /></span>
                </Dropdown>
            </div>
        </div>
    )
}