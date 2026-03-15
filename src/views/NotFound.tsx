import { Button, Result, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                background:
                    'radial-gradient(circle at 20% 10%, #e8f3ff 0%, transparent 40%), radial-gradient(circle at 80% 85%, #fff2e8 0%, transparent 35%), #f7f9fc',
            }}
        >
            <Result
                style={{
                    width: 'min(760px, 100%)',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    boxShadow: '0 18px 42px rgba(16, 24, 40, 0.08)',
                }}
                status="404"
                title="页面走丢了"
                subTitle="你访问的地址不存在，可能已被移动或删除。"
                extra={
                    <Space>
                        <Button onClick={() => navigate(-1)}>返回上一页</Button>
                        <Button type="primary" onClick={() => navigate('/welcome')}>
                            回到首页
                        </Button>
                    </Space>
                }
            />
        </div>
    );
}
export default NotFound;