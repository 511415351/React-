import React, { useEffect, useState, RefObject, useImperativeHandle, use } from 'react';
import {Form, Button, Input, Modal, Select, TreeSelect, message } from 'antd';
import { IDept, IUser } from '../../types/api';
import api from '../../api';

interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IDept | {parentId?: string}) => void }>;
    updateDeptList?: () => void;
}
export default function CreateDept(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [IDept, setIDept] = useState<IDept[]>([]);
    const [actions, setActions] = useState<string>('create');
    const getDeptList = async () => {
            const data = await api.getDepList();
                setIDept(data);
        }
    const [IUserList, setIUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);
    const getUserList = async () => {
            const data = await api.getAllUser();
                setIUserList(data);
        }
    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (actions === 'edit') {
            // 编辑部门逻辑
            await api.updateDept(form.getFieldsValue());
            message.success('Department updated successfully');
        } else if (actions === 'delete') {
            // 删除部门逻辑
            await api.deleteDept(form.getFieldsValue()._id);
            message.success('Department deleted successfully');
        } else if (actions === 'create') {
            // 创建部门逻辑
        await api.createDept(form.getFieldsValue());
        message.success('Department created successfully');
        }
        setIsModalOpen(false);              
        handleCancel();
        props.updateDeptList();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IDept | {parentId?: string}) => {
        setIsModalOpen(true);
        setActions(type);
        getDeptList();
        if (data) {
            form.setFieldsValue(data);
        }
    }
    useImperativeHandle(props.mref, () => ({openModal}));
    return (
        <div>
            <Modal
                title={actions === 'create' ? 'Create Department' : actions === 'edit' ? 'Edit Department' : 'Delete Department'}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} labelAlign="right" labelCol={{ span: 6 }} >
                    <Form.Item name="_id" style={{ display: 'none' }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item label="Department Parent" name="parentId">
                        <TreeSelect
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            treeData={IDept}
                            fieldNames={{label: 'deptName', value: '_id'}}
                        />
                    </Form.Item>
                    <Form.Item label="Department Name" name="deptName" rules={[{ required: true, message: 'Please input the department name!' }]}>
                        <Input placeholder="Enter department name" />
                    </Form.Item>
                    <Form.Item label="Department Manager" name="userName" rules={[{ required: true, message: 'Please select the department manager!' }]}>
                        <Select placeholder="Select department manager" style={{ width: '100%' }}>
                            {IUserList.map((user: IUser) => (
                                <Select.Option key={user._id} value={user.userName}>
                                    {user.userName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}