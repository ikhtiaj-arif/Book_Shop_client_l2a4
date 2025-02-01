import { Card, Col, Divider, Row, Typography } from "antd";
import CustomButton from "../components/buttons/CustomButton";
import SecondaryBtn from "../components/buttons/SecondaryBtn";
import ServiceHeader from "../components/ServiceHeader";
import bgImg from "../img/Bookshop-pana.png";
import BookStoreFooter from "./Footer";

const { Text, Title } = Typography


const About = () => {
    return (
       <>
        <div className="bg-background rounded-lg p-2 md:p-4 mx-auto">
            {/* Heading Section */}
            <ServiceHeader title="About Us" text="Discover more about this book and make it yours today." />

            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-md'>
                <Row gutter={[32, 32]} justify="center" align="top">
                    {/* About Image */}
                    <Col xs={24} md={11} className="">
                        <Card
                            style={{ border: 0 }}
                            cover={
                                <img
                                    alt="About Us"
                                    src={bgImg} // Replace with your image path
                                    className="w-full h-full max-w-[32rem] object-cover rounded-lg"
                                />
                            }
                            className=""
                        >
                        </Card>
                    </Col>

                    {/* About Details */}
                    <Col xs={24} md={11} className="p-6">
                        <Card bordered={false} style={{ border: 0, boxShadow: 'none' }} className="h-full">
                            <Title level={3} style={{ textAlign: "center", color: "#333" }}>Our Story</Title>

                            <Text strong className="text-text">Founded in 2023, our mission is to provide exceptional service and quality products to our customers.</Text>
                            <div className="mb-4">
                                <Text className="text-text-accent">We believe in innovation, sustainability, and customer satisfaction.</Text>
                            </div>
                            <Divider className="my-4" />

                            {/* Mission and Values */}
                            <div className="mb-4">

                                <Title level={3} style={{ textAlign: "left", color: "#333" }}>
                                    Our Mission
                                </Title>
                                <Text strong className="text-text">
                                    To deliver high-quality products that inspire and empower our customers.
                                </Text>
                            </div>

                            <div className="mb-4">

                                <Title level={3} style={{ textAlign: "left", color: "#333" }}>
                                    Our Values
                                </Title>
                                <ul className="list-disc list-inside text-lg text-text">
                                    <Text strong className="text-text">  <li>Customer Focus</li></Text>
                                    <Text strong className="text-text">  <li>Innovation</li></Text>
                                    <Text strong className="text-text"> <li>Sustainability</li></Text>
                                    <Text strong className="text-text">
                                        <li>Integrity</li></Text>



                                </ul>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-auto w-full flex items-center space-x-4">
                                <CustomButton
                                    text="Learn More"
                                    onClick={() => { }}
                                />
                                <SecondaryBtn
                                    text="Contact Us"
                                    onClick={() => { }}
                                    type="default"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Additional Information Section */}
            <div className="mt-8 h-24 max-w-6xl mb-8 mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">


                    <Title level={3} style={{ textAlign: "left", color: "#333" }}>
                        Why Choose Us?
                    </Title>

                    <Text strong className="text-text"> We are committed to excellence in every aspect of our business. From our products to our customer service, we strive to exceed expectations.
                    </Text>
                </div>
            </div>
        </div>

        <BookStoreFooter />
       
       </>
    );
};

export default About;