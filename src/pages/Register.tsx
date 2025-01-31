// import { Button, Row } from 'antd';
// import { FieldValues } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import PHForm from '../components/form/PHForm';
// import PHInput from '../components/form/PHInputs';
// import { useRegistrationMutation } from '../redux/features/auth/authApi';
// import { useAppDispatch } from '../redux/hooks';


// const Register = () => {
//     // const navigate = useNavigate()

//     // const { register, handleSubmit } = useForm({
//     //     defaultValues: {
//     //         userId: 'A-0002',
//     //         password: '1234'
//     //     }
//     // })




//     const [register] = useRegistrationMutation()

//     // const dispatch = useAppDispatch()

//     const onSubmit = async (data: FieldValues) => {
//         const toastId = toast.loading('Registering')
//         try {
//             const userInfo = {
//                 name: data.name,
//                 email: data.email,
//                 password: data.password
//             }
//             const res = await register(userInfo).unwrap()
//             console.log(res);

//             // const user = verifyToken(res?.data?.accessToken) as TUser
//             // localStorage.setItem('accessToken', res?.data?.accessToken)
//             // dispatch(setUser({ user: user, token: res.data.accessToken }))
//             // navigate(`/`)
//             toast.success(`${res?.message}`, { id: toastId })

//         } catch (err) {
//             toast.error(`${err.data.message}` || 'something went wrong', { id: toastId })
//             console.log(err);
//         }
//         // console.log(data);
//     }

//     return (
//         <Row justify="center" align='middle' style={{ height: " 100vh" }}>
//             <PHForm onSubmit={onSubmit} >
//                 <PHInput type='text' name='name' label='Name' />
//                 <PHInput type='text' name='email' label='Email' />
//                 <PHInput type='password' name='password' label='Password' />
//                 <Button htmlType='submit' >Login</Button>
//             </PHForm></Row>
//     );
// };

// export default Register;