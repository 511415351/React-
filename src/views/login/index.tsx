import { Form, Input, Button, Checkbox} from "antd";
import style from "./index.module.less";
import api from "../../api";
import type { ILoginParams } from "../../types/api";
import storage from "../../utils/storage";

const Login = () => {
    const onFinish = async(values: ILoginParams) => {
        const data = await api.login(values);
        storage.set("token", data);
        window.location.href='/welcome';
        console.log('Successs', data);
    }
    const onFinishFailed = () => {
        console.log('Failed')
    }
    return (
        <div className={style.login}>
            <div className={style.loginWrapper}>
                <div className={style.title}>Login</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            
        </div>
    );
};
export default Login;