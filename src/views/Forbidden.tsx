import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function Forbidden() {
    const navigate = useNavigate();
    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                background: 'linear-gradient(160deg, #f5f7fa 0%, #eef2f7 100%)',
            }}
        >
            <Result
                style={{
                    width: 'min(680px, 100%)',
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 14px 40px rgba(15, 23, 42, 0.08)',
                }}
                status="403"
                title="403"
                subTitle="抱歉，你没有权限访问该页面。"
                extra={
                    <Button type="primary" onClick={() => navigate(-1)}>
                        返回上一页
                    </Button>
                }
            />
        </div>
    );
}
export default Forbidden;
