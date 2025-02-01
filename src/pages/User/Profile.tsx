/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, Row, Typography } from "antd";
import { toast } from "sonner";
import ServiceHeader from "../../components/ServiceHeader";
import BSInput from "../../components/form/BSInput";
import { logOut } from "../../redux/features/auth/authSlice";
import { useChangeUserPasswordMutation } from "../../redux/features/user/userApi";
import { useAppDispatch } from "../../redux/hooks";
import BookStoreFooter from "../Footer";
const { Title } = Typography

type Tvalues = {
    currentPassword: string,
    confirmPassword: string,
    newPassword: string
}

const Profile = () => {
    const [changePassword] = useChangeUserPasswordMutation()
    const dispatch = useAppDispatch()

    const [passwordForm] = Form.useForm();

    const toastId = 'pass'



    const handlePasswordChange = async (values: Tvalues) => {
        toast.loading('Changing Password', { id: toastId })
        toast.loading('Changing Password', { id: toastId })
        const data = {
            newPassword: values.confirmPassword,
            oldPassword: values.currentPassword
        }


        try {

            const response = await changePassword(data).unwrap();
            console.log(response);
            toast.success("Password changed successfully!", { id: toastId });
            dispatch(logOut())
            passwordForm.resetFields(); // Reset form on success
        } catch (error: any) {

            toast.error(error?.data?.message || "Failed to change password. Please try again.", { id: toastId });
        }

    };

    return (
        <>
            <div className="bg-background rounded-lg p-2 md:p-4 mx-auto md:pb-8 min-h-[60vh]">
                {/* Heading Section */}
                <ServiceHeader title="Update Profile" text="Manage your profile information and password." />


                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <Row gutter={[32, 32]} justify="center" align="top">
                        {/* Profile Information Section */}


                        {/* Change Password Section */}
                        <Col xs={24} md={12} className="space-y-6">
                            <Title level={3} style={{ textAlign: "center", color: "#333" }}>Change Password</Title>

                            <Form
                                form={passwordForm}
                                onFinish={handlePasswordChange}
                                className="space-y-4"
                            >
                                {/* Current Password Field */}
                                <BSInput
                                    type="password"
                                    name="currentPassword"
                                    label="Current Password"
                                    placeholder="Enter your current password"
                                    rules={[
                                        { required: true, message: "Please enter your current password" },
                                    ]}
                                    labelPosition="top" // Label on top
                                />

                                {/* New Password Field */}
                                <BSInput
                                    type="password"
                                    name="newPassword"
                                    label="New Password"
                                    placeholder="Enter your new password"
                                    rules={[
                                        { required: true, message: "Please enter your new password" },
                                        { min: 6, message: "Password must be at least 6 characters" },
                                    ]}
                                    labelPosition="top" // Label on top
                                />

                                {/* Confirm New Password Field */}
                                <BSInput
                                    type="password"
                                    name="confirmPassword"
                                    label="Confirm New Password"
                                    placeholder="Confirm your new password"
                                    rules={[
                                        { required: true, message: "Please confirm your new password" },
                                        ({ getFieldValue }: any) => ({
                                            validator(_: any, value: any) {
                                                if (!value || getFieldValue("newPassword") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject("The two passwords do not match");
                                            },
                                        }),
                                    ]}
                                    labelPosition="top" // Label on top
                                />

                                {/* Change Password Button */}
                                <div className="text-center">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-200"
                                    >
                                        Change Password
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
            <BookStoreFooter />
        </>

    );
};


export default Profile;