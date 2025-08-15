import { useState } from 'react'
import { type LoginFormType } from './utils/types';
import { loginUser } from './utils/api';

function App() {

  const [loginTest, setLoginTest] = useState<LoginFormType>({
    email: "test@gmail.com",
    password: "Admin123"
  });

  const [isLoading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true)
    try{
      const response = await loginUser(loginTest);
      console.log(response)
    }
    catch (error) {
      console.error("Login failed:", error);
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <button onClick={testLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Test Login"}
      </button>
    </>
  )
}

export default App
