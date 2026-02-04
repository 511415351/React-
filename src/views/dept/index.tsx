import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { Button, Space, Switch, Table, Form, Input } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import api from '../../api';
import type { IDept } from '../../types/api';
import {formatDate} from '../../utils/index';


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
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleSubCreate(record.id)}>新增</Button>
        <Button type="primary" onClick={() => handleEdit(record.id)}>编辑</Button>
        <Button danger onClick={() => handleDelete(record.id)}>删除</Button>
      </Space>
    ),
  },
];
const handleSubCreate = (id: string) => {
    console.log('Create Sub Department', id);
}
const handleEdit = (id: string) => {
    console.log('Edit Department', id);
}
const handleDelete = (id: string) => {
    console.log('Delete Department', id);
}

export default function DeptView() {
    const [data, setData] = useState<IDept[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        getDeptList();
        }, []);
    const getDeptList = async () => {
        const data = await api.getDepList(form.getFieldsValue());
            setData(data);
    }
    const handleReset = () => {
        console.log('Reset form');
        form.resetFields();
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
                        <button className='btn btn-primary'>Add Department</button>
                    </div>
                </div>
                <div className='content'>
                    <Table rowKey="_id"
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </div>
        
    )
}