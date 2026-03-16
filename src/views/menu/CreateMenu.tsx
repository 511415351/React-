import React, { useEffect, useState, RefObject, useImperativeHandle, use } from 'react';
import {Form, Button, Input, Modal, Select, TreeSelect, message , Radio} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type{ IDept, IUser, IMenu } from '../../types/api';
import api from '../../api';

interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IMenu | {parentId?: string}) => void } | null>;
    updateMenuList?: () => void;
}
export default function CreateMenu(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [IMenuList, setIMenuList] = useState<IMenu[]>([]);
    const [actions, setActions] = useState<string>('create');
    const getMenuList = async () => {
            const data = await api.getMenuList();
                setIMenuList(data);
        }
    const [IUserList, setIUserList] = useState([]);
    useEffect(() => {
        getMenuList();
    }, []);
    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (actions === 'edit') {
            // 编辑菜单逻辑
            await api.updateMenu(form.getFieldsValue());
            message.success('Menu updated successfully');
        } else if (actions === 'delete') {
            // 删除菜单逻辑
            await api.deleteMenu(form.getFieldsValue()._id);
            message.success('Menu deleted successfully');
        } else if (actions === 'create') {
            // 创建菜单逻辑
        await api.createMenu(form.getFieldsValue());
        message.success('Menu created successfully');
        }
        setIsModalOpen(false);              
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IMenu | {parentId?: string}) => {
        setIsModalOpen(true);
        setActions(type);
        getMenuList();
        if (data) {
            form.setFieldsValue(data);
        }
    }
    useImperativeHandle(props.mref, () => ({openModal}));
    return (
        <div>
            <Modal
                title={actions === 'create' ? 'Create Menu' : actions === 'edit' ? 'Edit Menu' : 'Delete Menu'}
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
                    <Form.Item label="Menu Parent" name="parentId">
                        <TreeSelect
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            treeData={IMenuList.map((menu: IMenu) => ({
                                title: menu.menuName,
                                value: menu._id,
                            }))}
                            fieldNames={{ label: 'title', value: 'value' }}
                        />
                    </Form.Item>
                    <Form.Item label="Menu Type" name="menuType" rules={[{ required: true, message: 'Please input the menu type!' }]}>
                        <Radio.Group>
                            <Radio value={1}>菜单</Radio>
                            <Radio value={2}>按钮</Radio>
                            <Radio value={3}>页面</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Menu Name" name="menuName" rules={[{ required: true, message: 'Please input the menu name!' }]}>
                        <Input placeholder="Enter menu name" />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                        {()=> {
                            return form.getFieldValue('menuType') === 2 ? (
                                <Form.Item label= "权限标识" name="menuCode">
                                    <Input placeholder="Enter menu code" />
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item label="Menu Icon" name="menuIcon">
                                        <Input placeholder="Enter menu icon" />
                                    </Form.Item>
                                    <Form.Item label="Menu Path" name="menuPath">
                                        <Input placeholder="Enter menu path" />
                                    </Form.Item>
                                </>
                                
                            );
                        }}
                    </Form.Item>
                    <Form.Item label="Menu Component" name="component">
                        <Input placeholder="Enter menu component Name" />
                    </Form.Item>
                    <Form.Item 
                        label="Menu Sort" 
                        name="menuSort"
                        tooltip={{title: 'The smaller the number, the higher the priority', icon: <InfoCircleOutlined />}}
                    >
                        <Input placeholder="Enter menu sort order" />
                    </Form.Item>
                    <Form.Item label="Menu Status" name="menuStatus">
                        <Radio.Group>
                            <Radio value={1}>Active</Radio>
                            <Radio value={2}>Inactive</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}