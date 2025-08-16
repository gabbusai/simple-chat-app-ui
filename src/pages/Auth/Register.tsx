
import { useNavigate } from 'react-router-dom';
import { type RegisterFormType } from '../../utils/types';
import { Button, Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../utils/api';

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormType) => {
    const { name, email, password, password_confirmation } = values;
      const response = await registerUser({ name, email, password, password_confirmation });

      if(response.success) {
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        toast.error(response.error);
      }
  }

  return (
    <div className='h-screen w-screen bg-zinc-950'>
      <Toaster />
      <Form className='flex flex-col items-center justify-center h-full' onFinish={handleRegister}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" name="password_confirmation" rules={[{ required: true, message: 'Please confirm your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
