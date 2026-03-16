import { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Form, Input, Modal, message } from 'antd';
import type { TableColumnsType } from 'antd';
import api from '../../api';
import type { IDept } from '../../types/api';
import {formatDate} from '../../utils/index';
import CreateDept from './CreateDept';
import AuthButton from '../../components/AuthButton';
import usePermission from '../../hooks/usePermission';



export default function DeptView() {
    const { hasButtonPermission } = usePermission();
    const columns: TableColumnsType<IDept> = [
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        width: '30%',
    },
    {
        title: '负责人',
        dataIndex: 'userName',
        key: 'userName',
        width: '20%',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: '15%',
        key: 'createTime',
        render: (text) => formatDate(text),
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
            const canCreate = hasButtonPermission('dept@create');
            const canEdit = hasButtonPermission('dept@edit');
            const canDelete = hasButtonPermission('dept@delete');
            if (!canCreate && !canEdit && !canDelete) {
                return null;
            }

            return (
                <Space size="middle">
                    <AuthButton code="dept@create">
                        <Button type="primary" onClick={() => handleSubCreate(record._id)}>新增</Button>
                    </AuthButton>
                    <AuthButton code="dept@edit">
                        <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                    </AuthButton>
                    <AuthButton code="dept@delete">
                        <Button danger onClick={() => handleDelete(record._id)}>删除</Button>
                    </AuthButton>
                </Space>
            );
        },
    },
    ];
    
    const [data, setData] = useState<IDept[]>([]);
    const [loading, setLoading] = useState(false);
    const deptRef = useRef<{
        openModal: (type: string, data?: IDept | {parentId?: string}) => void 
    } | null>(null);
    const [form] = Form.useForm();
    useEffect(() => {
        getDeptList();
        }, []);
    const getDeptList = async () => {
        setLoading(true);
        const data = await api.getDepList(form.getFieldsValue());
            setData(data);
        setLoading(false);
    }
    const handleReset = () => {
        console.log('Reset form');
        form.resetFields();
        getDeptList();
    }
    const handleCreate  = (id = '') => {
        console.log('Create Department');
        deptRef.current?.openModal('create', {parentId:id});
    }
    const handleSubCreate = (id: string) => {
        console.log('Create Sub Department', id);
        deptRef.current?.openModal('create', {parentId:id});
    }
    const handleEdit = (record: IDept) => {
        console.log('Edit Department', record);
        deptRef.current?.openModal('edit', record);
    }
    
    const handleDelete = (id: string) => {
        console.log('Delete Department', id);
        Modal.confirm({
            title: 'Are you sure you want to delete this department?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => handledDelOK(id),
            
        });
    }
    const handledDelOK = async (id: string) => {
        await api.deleteDept(id);
        message.success('Department deleted successfully');
        getDeptList();
    }
    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item label="Department Name" name="deptName">
                    <Input placeholder="Enter department name" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className='mr10' htmlType="submit" onClick={getDeptList}>Search</Button>
                    <Button type="primary" htmlType="reset" onClick={handleReset}>Reset</Button>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className='header'>
                    <div className='title'>Department List</div>
                    <div className='actions'>
                        <AuthButton code="dept@create">
                            <Button className='btn btn-primary' onClick={() => handleCreate()}>Add Department</Button>
                        </AuthButton>
                    </div>
                </div>
                <div className='content'>
                    <Table rowKey="_id"
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={ false}
                    />
                </div>
            </div>
            <CreateDept  mref={deptRef} updateDeptList={getDeptList}/>
        </div>
        
    )
}