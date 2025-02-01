import { Col, Form, Row, Typography } from 'antd';

import ServiceHeader from '../components/ServiceHeader';
import BSInput from '../components/form/BSInput';
import BookStoreFooter from './Footer';



const { Title, Text } = Typography

const Contact = () => {
    return (

        <>
            <div className="bg-background rounded-lg p-2 md:p-4  mx-auto">
                {/* Heading Section */}
                <ServiceHeader title="Contact Us" text="  Have questions or need assistance? We're here to help!" />


                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 md:px-12 mb-4">
                    <Row gutter={[32, 32]} justify="space-between" align="top">
                        {/* Contact Information */}
                        <Col xs={24} md={11} className="space-y-6 ">
                            <div>
                                <Title level={3} style={{ textAlign: "center", color: "#333" }}>Get in Touch</Title>

                                <Text strong className="text-text " style={{ textAlign: "center" }}>
                                    Reach out to us for any inquiries, feedback, or support. We're always happy to hear from
                                    our readers and customers.
                                </Text>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-text">Email Us</p>
                                        <p className="text-text">support@bokshop.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-text">Call Us</p>
                                        <p className="text-text">+1 (123) 456-7890</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-text">Visit Us</p>
                                        <p className="text-text">123 Book Street, Library City, LC 12345</p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Contact Form */}
                        <Col xs={24} md={11} className="space-y-2 ">
                            <Title level={3} style={{ textAlign: "center", color: "#333" }}>Send Us a Message</Title>

                            <Form className="space-y-4">
                                {/* Name Field */}
                                <div>

                                    <Text strong className="text-text" >Your Name
                                    </Text>
                                    <BSInput
                                        type="text"
                                        name="name"
                                        label=""
                                        placeholder="John Doe"
                                        rules={[{ required: true, message: "Please enter your name" }]}
                                    />
                                </div>

                                {/* Email Field */}
                                <div>

                                    <Text strong className="text-text">Your Email
                                    </Text>
                                    <BSInput
                                        type="email"
                                        name="email"
                                        label=""
                                        placeholder="johndoe@example.com"
                                        rules={[
                                            { required: true, message: "Please enter your email" },
                                            { type: "email", message: "Please enter a valid email" },
                                        ]}
                                    />
                                </div>
                                {/* Message Field */}
                                <div>
                                    <Text strong className="text-text">Your Message
                                    </Text>
                                    <BSInput
                                        type="textarea"
                                        name="message"
                                        label=""
                                        placeholder="Write your message here..."
                                        rules={[{ required: true, message: "Please enter your message" }]}
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-200"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div >

            <BookStoreFooter />

        </>

    );
};

export default Contact;