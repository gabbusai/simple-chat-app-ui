
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/api'
import { useAuthContext } from '../../utils/AuthContext'
import { Button, Form, Input } from 'antd';
import type { LoginFormType } from '../../utils/types';
import toast, { Toaster } from 'react-hot-toast';


function Login() {
    const {setUser, setToken} = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async (values: LoginFormType) => {
        const { email, password } = values;

        const response = await loginUser({ email, password });
        if (response.success) {
            setToken(response.data.token);
            setUser(response.data.user);
            navigate('/home');
        } else {
            console.error("Login failed:", response);
            toast.error(response.error);
        }
    };

  return (
    <div className='h-screen w-screen bg-zinc-950 grid place-items-center'>
    <Toaster />
      <Form onFinish={handleLogin}>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}


export default Login
