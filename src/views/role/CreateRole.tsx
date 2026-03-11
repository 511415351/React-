import React, { useEffect, useState, RefObject, useImperativeHandle, use } from 'react';
import {Form, Button, Input, Modal, Select, TreeSelect, message , Radio} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type{   IRole } from '../../types/api';
import api from '../../api/roleApi';

interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IRole | {parentId?: string}) => void }>;
    updateMenuList?: () => void;
}
export default function CreateRole(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [roledata,setIRoleList]=useState()
    const [actions, setActions] = useState<string>('create');
    const getRoleList = async () => {
            const data = await api.getRoleList();
                setIRoleList(data);
        }
    useEffect(() => {
        getRoleList();
    }, []);
    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (actions === 'edit') {
            // 编辑角色逻辑
            await api.editRole(form.getFieldsValue());
            message.success('Menu updated successfully');
        } else if (actions === 'create') {
            // 创建角色逻辑
        await api.createRole(form.getFieldsValue());
        message.success('Menu created successfully');
        }
        setIsModalOpen(false);              
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IRole| {parentId?: string}) => {
        setIsModalOpen(true);
        setActions(type);
        getRoleList();
        if (data) {
            form.setFieldsValue(data);
        }
    }
    useImperativeHandle(props.mref, () => ({openModal}));
    return (
        <div>
            <Modal
                title={actions === 'create' ? 'Create Role' : actions === 'edit' ? 'Edit Role' : 'Delete Role'}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} labelAlign="right" labelCol={{ span: 6 }} initialValues={{menuType:1, menuStatus:1}}>
                    <Form.Item name="_id" style={{ display: 'none' }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: 'Please input the role name!' }]}>
                        <Input placeholder='Please input the Role Name'></Input>
                    </Form.Item>
                    <Form.Item label="remark" name="remark" >
                        <Input.TextArea placeholder="Enter remark" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}