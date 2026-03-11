import { useRef, useState } from 'react';
import { useAntdTable } from 'ahooks';
import { Form, Input,Space,Button ,Table, Modal, message} from 'antd';
import type { TableColumnsType } from 'antd';
import api from '../../api/roleApi';
import type { IMenu, IRole, IRoleSearchParams } from '../../types/api';
import styles from './index.module.less';
import CreateRole from './CreateRole';
import SetPermission from './SetPermission';

export default function RoleView() {
    const [form] = Form.useForm();
    const roleRef = useRef<{
        openModal:(type: string, data?:IRole| {parnetId:string}) => void
    }>(null);
    const PermissionRef = useRef<{
        openModal:(type: string, data?:IMenu) => void
    }>(null);
    const columns: TableColumnsType<IRole> = [
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            key: 'roleName',
            width: '30%',
        },
        {
            title: 'remarks',
            dataIndex: 'remarks',
            key: 'remarks',
        },
        {
            title: 'createTime',
            dataIndex: 'createTime',
            width: '20%',
        },
        {
            title: 'updateTime',
            dataIndex: 'updateTime',
            width: '20%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            key: 'operation',
            render: (_, record) => (
            <Space size="middle">
                <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                <Button type="primary" onClick={() => handlePermission(record)}>权限设置</Button>
                <Button danger onClick={() => handleDelete(record._id)}>删除</Button>
            </Space>
            ),
        },    
    ];
    const getRoleData = async ({current, pageSize}: {current:number; pageSize:number},formData: IRoleSearchParams) => {
        const data = await api.getRoleList({...formData,pageNum:current,pageSize:pageSize});
        //setData(data);
        return {
            list:data.list,
            total:data.page.total,
        }
    };
    const {tableProps, search} = useAntdTable(getRoleData,{
        form,
        defaultPageSize:10,
    })
    const handleCreate = () => {
        // 打开创建角色的模态框
        roleRef.current?.openModal('create');
    };
    const handleSubCreate = (parentId: string) => {
        // 打开创建子角色的模态框，并传递 parentId
        PermissionRef.current?.openModal(parentId);
    };
    const handleEdit = (record: IRole) => {
        // 打开编辑角色的模态框，并传递 record 数据
        roleRef.current?.openModal('edit',record);
    };
    const handlePermission = (record: IRole) => {
        // 打开权限设置的模态框，并传递 record 数据
        PermissionRef.current?.openModal('setPermission',record);
    };
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this role?',
            content: 'Are you sure you want to delete this role?',
            onCancel: () => {
                message.info('Deletion cancelled');
            },
             onOk: () => {
                api.deleteRole({_id:id}).then(() => {
                    message.success('Role deleted successfully');
                    search.submit();
                }).catch(() => {
                    message.error('Failed to delete role');
                }
                );             },
        });
    }
    return (
        <div className="role-wrap">
            <Form form={form} className="search-form" layout="inline" labelAlign="right" labelCol={{ span: 6 }} initialValues={{roleStatus:1}}>
                <Form.Item label="Role Name" name="roleName">
                    <Input placeholder="Enter role name" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" className='mr10' htmlType="submit" onClick={search.submit}>Search</Button>
                        <Button type="primary" htmlType="reset" onClick={search.reset}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className='header'>
                    <div className='title'>Role List</div>
                    <div className='actions'>
                        <Button className='btn btn-primary' onClick={handleCreate}>Add Role</Button>
                    </div>
                </div>
                <div className='content'>
                    <Table 
                        bordered 
                        rowKey="_id"
                        columns={columns}
                        {...tableProps}
                    />
                </div>
            </div>
            <CreateRole mref={roleRef} update={search.submit}/>
            <SetPermission mref={PermissionRef} update={search.submit}/>
        </div>
    );
}