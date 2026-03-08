import React, { useEffect, useState, RefObject, useImperativeHandle, use } from 'react';
import {Form,  Modal,  message ,Tree} from 'antd';
import type {  TreeDataNode, TreeProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import{ IPermission, type IMenu, type IRole } from '../../types/api';
import api from '../../api/roleApi';
import apiMenu from '../../api';


interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IRole ) => void }>;
    updateMenuList?: () => void;
}
export default function SetPermission(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [menuList, setMenuList] =useState<IMenu[]>([]);
    const [checkedKeys, setCheckKeys]= useState<string[]>([]);
    const [permission,setPermission]=useState<IPermission>();
    const [roleInfo, setRoleInfo] = useState<IRole>();
    const getMenuList = async () => {
        const data = await apiMenu.getMenuList();
        setMenuList(data);
    }
    const getRoleList = async () => {
            const data = await api.getRoleList();
                setIRoleList(data);
        }
    useEffect(() => {
        getMenuList();
    }, []);
    const handleOk = async () => {
        if(permission){
            await api.updataPermission(permission);
            message.success('设置成功');
        }
        setIsModalOpen(false);              
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IRole) => {
        setIsModalOpen(true);
        setRoleInfo(data);
        getRoleList();
        getMenuList();
        setCheckKeys(data?.permissionList.checkedKeys||[]);
        if (data) {
            form.setFieldsValue(data);
        }
    }
    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        setCheckKeys(checkedKeys);
        const checkedKeysTemp: string[]=[];
        const halfCheckedKeysTemp:string[]=[];
        info.checkedNodes.map((node:IMenu)=>{
            if(node.menuType===2){
                checkedKeysTemp.push(node._id);
            } else{
                halfCheckedKeysTemp.push(node._id);
            }
        });
        setPermission({
            _id:roleInfo?._id || '',
            permissionList:{
                checkedKeys:checkedKeysTemp,
                halfCheckedKeys:halfCheckedKeysTemp.concat(info.halfCheckedKeys),
            }
        })
    };
    useImperativeHandle(props.mref, () => ({openModal}));
    return (
        <div>
            <Modal
                title="SetPermission"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} labelAlign="right" labelCol={{ span: 6 }} initialValues={{menuType:1, menuStatus:1}}>
                    <Form.Item label="RoleName">
                        
                    </Form.Item>
                    <Form.Item label="Permission"  >
                        <Tree
                            checkable
                            onCheck={onCheck}
                            defaultExpandAll
                            checkedKeys={checkedKeys}                            
                            fieldNames={{
                                key:'_id',
                                children:'children',
                                title:'menuName',
                            }}
                            treeData={menuList as unknown as TreeDataNode[]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}