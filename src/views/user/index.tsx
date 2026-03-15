import { Button, Table, Form, Input, Select, Space, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';
import api from '../../api';
import { formatDate as formatDateToChinese } from '../../utils/index';
import CreateUser from './CreateUser';
import { useAntdTable } from 'ahooks';
import type{ IUser, IUserSearchParams } from '../../types/api';
import AuthButton from '../../components/AuthButton';
import usePermission from '../../hooks/usePermission';

export default function UserList() {
    const [form] = Form.useForm();
    const [userIds, setUserIds] = useState<number[]>([]);
    const { hasButtonPermission } = usePermission();
    const userRef = useRef<{
        openModal: (type: string, data?: IUser) => void;
    }>();

    const getTableData = (
        { current, pageSize }: { current: number; pageSize: number },
        formData: IUserSearchParams
    ) => {
        return api
            .getUserList({
                ...formData,
                pageNum: current,
                pageSize: pageSize,
            })
            .then((data) => {
                return {
                    total: data.page.total,
                    list: data.list,
                };
            });
    };

    const { tableProps, search } = useAntdTable(getTableData, {
        form,
        defaultPageSize: 10,
    });

    // 创建用户
    const handleCreate = () => {
        userRef.current?.openModal('create');
    };

    // 编辑用户
    const handleEdit = (record: IUser) => {
        userRef.current?.openModal('edit', record);
    };

    // 删除用户
    const handleDel = (userId: number) => {
        Modal.confirm({
            title: '删除确认',
            content: <span>确认删除该用户吗？</span>,
            onOk: () => {
                handleUserDelSubmit([userId]);
            },
        });
    };

    // 批量删除确认
    const handlePatchConfirm = () => {
        if (userIds.length === 0) {
            message.error('请选择要删除的用户');
            return;
        }
        Modal.confirm({
            title: '删除确认',
            content: <span>确认删除该批用户吗？</span>,
            onOk: () => {
                handleUserDelSubmit(userIds);
            },
        });
    };

    // 公共删除用户接口
    const handleUserDelSubmit = async (ids: number[]) => {
        await api.delUser({
            userIds: ids,
        });
        message.success('删除成功');
        setUserIds([]);
        search.reset();
    };

    const columns: ColumnsType<IUser> = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户邮箱',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户',
                }[role];
            },
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
            render(state: number) {
                return {
                    1: '在职',
                    2: '离职',
                    3: '试用期',
                }[state];
            },
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime: string) {
                return formatDateToChinese(createTime);
            },
        },
        {
            title: '操作',
            key: 'address',
            render(record: IUser) {
                const canEdit = hasButtonPermission('user@edit');
                const canDelete = hasButtonPermission('user@delete');
                if (!canEdit && !canDelete) {
                    return null;
                }

                return (
                    <Space>
                        <AuthButton code="user@edit">
                            <Button type="text" onClick={() => handleEdit(record)}>
                                编辑
                            </Button>
                        </AuthButton>
                        <AuthButton code="user@delete">
                            <Button type="text" danger onClick={() => handleDel(record.userId)}>
                                删除
                            </Button>
                        </AuthButton>
                    </Space>
                );
            },
        },
    ];
    return (
        <div className="user-list">
            <Form className="search-form" form={form} initialValues={{ state: 1 }} layout="inline">
                <Form.Item name="userId" label="用户ID">
                    <Input placeholder="请输入用户ID" />
                </Form.Item>
                <Form.Item name="userName" label="用户名称">
                    <Input placeholder="请输入用户名称" />
                </Form.Item>
                <Form.Item name="state" label="状态">
                    <Select style={{ width: 120 }}>
                        <Select.Option value={0}>所有</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" onClick={search.submit}>
                            搜索
                        </Button>
                        <Button type="default" onClick={search.reset}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">用户列表</div>
                    <div className="action">
                        <AuthButton code="user@create">
                            <Button type="primary" onClick={handleCreate}>
                                新增
                            </Button>
                        </AuthButton>
                        <AuthButton code="user@delete">
                            <Button type="primary" danger onClick={handlePatchConfirm}>
                                批量删除
                            </Button>
                        </AuthButton>
                    </div>
                </div>
                <Table
                    bordered
                    rowKey="userId"
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: userIds,
                        onChange: (selectedRowKeys: React.Key[]) => {
                            setUserIds(selectedRowKeys as number[]);
                        },
                    }}
                    columns={columns}
                    {...tableProps}
                />
            </div>
            <CreateUser
                mref={userRef}
                update={() => {
                    search.reset();
                }}
            />
        </div>
    );
}
