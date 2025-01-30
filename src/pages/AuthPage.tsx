import { Card, Col, Row } from 'antd';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomButton from '../components/buttons/CustomButtonLogin';
import BSInput from '../components/form/BSInputLogin';
import PHForm from '../components/form/PHForm';
import loginIllustration from '../img/Bookshop-pana.png';
import { useLoginMutation, useRegistrationMutation } from '../redux/features/auth/authApi';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';
import BSInputLogin from '../components/form/BSInputLogin';
import CustomButtonLogin from '../components/buttons/CustomButtonLogin';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const [register] = useRegistrationMutation();

  const defaultLoginValues = {
    email: '',
    password: '',
  };

  const defaultRegisterValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in');
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      localStorage.setItem('accessToken', res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/`);
      toast.success('Logged in', { id: toastId });
    } catch (err) {
      toast.error(`${err.data?.message || 'Something went wrong'}`, { id: toastId });
      console.log(err);
    }
  };

  const handleRegister = async (data: FieldValues) => {
    const toastId = toast.loading('Registering');
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      toast.success(`${res?.message}`, { id: toastId });
      setIsLogin(true); // Switch to login after successful registration
    } catch (err) {
      toast.error(`${err.data?.message || 'Something went wrong'}`, { id: toastId });
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 h-full flex items-center justify-center">
      <Row
        justify="center"
        align="middle"
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        style={{ maxWidth: '900px', width: '100%', height: '80vh' }}
      >
        {/* Left Section: Illustration */}
        <Col xs={0} md={12} className="hidden md:block">
          <img
            src={loginIllustration}
            alt="Auth Illustration"
            className="h-full w-full object-cover"
          />
        </Col>

        {/* Right Section: Form */}
        <Col xs={24} md={12} className="p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {isLogin
              ? 'Please log in to your account'
              : 'Register to access our features'}
          </p>
          <Card bordered={false} className="shadow-none">
            <PHForm
              onSubmit={isLogin ? handleLogin : handleRegister}
              defaultValues={isLogin ? defaultLoginValues : defaultRegisterValues}
            >
              {!isLogin && (
                <BSInput
                  placeholder='Enter your name'
                  type="text"
                  name="name"
                  label="Name"

                />
              )}
              <BSInputLogin
                placeholder='Enter your email'
                type="text"
                name="email"
                label="Email"

              />
              <BSInputLogin
                placeholder='Enter your password'
                type="password"
                name="password"
                label="Password"

              />
              {/* <Button
                htmlType="submit"
                type="primary"
                className="w-full py-2 h-12 px-4 mt-auto text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark transition-all"
              >
                {isLogin ? 'Login' : 'Register'}
              </Button> */}
              <CustomButtonLogin isLogin={isLogin} />
            </PHForm>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-medium cursor-pointer hover:underline"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </span>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AuthPage;