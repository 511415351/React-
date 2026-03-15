import { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Form, Input, Modal, message, Select } from 'antd';
import type { TableColumnsType } from 'antd';
import api from '../../api';
import type { IMenu } from '../../types/api';
import {formatDate} from '../../utils/index';
import CreateMenu from './CreateMenu';
import AuthButton from '../../components/AuthButton';
import usePermission from '../../hooks/usePermission';



export default function MenuView() {
    const { hasButtonPermission } = usePermission();
    const columns: TableColumnsType<IMenu> = [
    {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        width: '15%',
    },
    {
        title: '菜单图标',
        dataIndex: 'icon',
        key: 'menuIcon',
        render: (_, record) => record.icon || record.menuIcon,
    },
    {
        title: '菜单类型',
        dataIndex: 'menuType',
        key: 'menuType',
        render: (text: number) => {
            return {
                1: '菜单',
                2: '按钮',
                3: '页面',
            }[text] || '未知';
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: '15%',
        key: 'createTime',
        render: (text) => formatDate(text),
    },
    {
        title: '权限标识',
        dataIndex: 'menuCode',
        key: 'menuCode',
    },
    {
        title: '路由地址',
        dataIndex: 'path',
        key: 'menuPath',
        render: (_, record) => record.path || record.menuPath,
    },
    {
        title: '组件名称',
        dataIndex: 'component',
        key: 'component',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: '15%',
        key: 'updateTime',
        render: (text) => formatDate(text),
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        key: 'operation',
        render: (_, record) => {
            const canCreate = hasButtonPermission('menu@create');
            const canEdit = hasButtonPermission('menu@edit');
            const canDelete = hasButtonPermission('menu@delete');
            if (!canCreate && !canEdit && !canDelete) {
                return null;
            }

            return (
                <Space size="middle">
                    <AuthButton code="menu@create">
                        <Button type="primary" onClick={() => handleSubCreate(record._id)}>新增</Button>
                    </AuthButton>
                    <AuthButton code="menu@edit">
                        <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                    </AuthButton>
                    <AuthButton code="menu@delete">
                        <Button danger onClick={() => handleDelete(record._id)}>删除</Button>
                    </AuthButton>
                </Space>
            );
        },
    },
    ];
    
    const [data, setData] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef<{
        openModal: (type: string, data?: IMenu | {parentId?: string}) => void 
    }>(null);
    const [form] = Form.useForm();
    useEffect(() => {
        getMenuList();
        }, []);
    const getMenuList = async () => {
        setLoading(true);
        const data = await api.getMenuList(form.getFieldsValue());
            setData(data);
        setLoading(false);
    }
    const handleReset = () => {
        console.log('Reset form');
        form.resetFields();
        getMenuList();
    }
    const handleCreate  = (id = '') => {
        console.log('Create Menu');
        menuRef.current?.openModal('create', {parentId:id});
    }
    const handleSubCreate = (id: string) => {
        console.log('Create Sub Menu', id);
        menuRef.current?.openModal('create', {parentId:id});
    }
    const handleEdit = (record: IMenu) => {
        console.log('Edit Menu', record);
        menuRef.current?.openModal('edit', record);
    }
    
    const handleDelete = (id: string) => {
        console.log('Delete Menu', id);
        Modal.confirm({
            title: 'Are you sure you want to delete this menu?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => handledDelOK(id),
            
        });
    }
    const handledDelOK = async (id: string) => {
        await api.deleteMenu({ _id: id });
        message.success('Menu deleted successfully');
        getMenuList();
    }
    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item label="Menu Name" name="menuName">
                    <Input placeholder="Enter menu name" />
                </Form.Item>
                <Form.Item name="menuState" valuePropName="checked">
                    <Select placeholder="Select menu status" style={{ width: 120 }}>
                        <Select.Option value={1}>Active</Select.Option>
                        <Select.Option value={2}>Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className='mr10' htmlType="submit" onClick={getMenuList}>Search</Button>
                    <Button type="primary" htmlType="reset" onClick={handleReset}>Reset</Button>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className='header'>
                    <div className='title'>Menu List</div>
                    <div className='actions'>
                        <AuthButton code="menu@create">
                            <Button className='btn btn-primary' onClick={() => handleCreate()}>Add Menu</Button>
                        </AuthButton>
                    </div>
                </div>
                <div className='content'>
                    <Table 
                        bordered 
                        rowKey="_id"
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={ false}
                    />
                </div>
            </div>
            <CreateMenu  mref={menuRef} updateMenuList={getMenuList}/>
        </div>
        
    )
}