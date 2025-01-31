import { Card, Col, Rate, Row } from "antd";

import user1 from '../img/customer/customer (1).jpg';
import user2 from '../img/customer/customer (2).jpg';
import user3 from '../img/customer/customer (3).jpg';
import user4 from '../img/customer/customer (4).jpg';
import user5 from '../img/customer/customer (5).jpg';
import user6 from '../img/customer/customer (6).jpg';
import Title from "antd/es/typography/Title";

const testimonials = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Absolutely love the collection here! The books are fantastic.",
    image: user6,
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great variety and fast delivery. Highly recommended!",
    image: user5,
  },
  {
    name: "Anna Watson",
    rating: 5,
    comment: "The best bookstore I’ve ever shopped at! Highly recommended!",
    image: user4,
  },
  {
    name: "Emily Williams",
    rating: 5,
    comment: "A wonderful selection of books. Love the service!",
    image: user3,
  },
  {
    name: "David Brown",
    rating: 4,
    comment: "Good collection, but I wish there were more discounts.",
    image: user2,
  },
  {
    name: "Sophia Lee",
    rating: 5,
    comment: "Amazing bookstore! I found all my favorite titles here.",
    image: user1,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials bg-background py-16 rounded-lg px-4">
      <Title level={2} style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        What Our Customers Say 💬
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {testimonials.map((testimonial, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <Card
              hoverable
              className="shadow-lg rounded-2xl transition-transform transform hover:-translate-y-2"
              cover={
                <div className="flex justify-center pt-6 pl-2">
                  <img
                    className="w-24 h-24 object-cover rounded-full border-4 border-gray-300"
                    alt="customer"
                    src={testimonial.image}
                  />
                </div>
              }
            >
              <Card.Meta
                title={
                  <p className="text-center text-lg font-semibold">
                    {testimonial.name}
                  </p>
                }
                description={
                  <div className="text-center">
                    <Rate disabled defaultValue={testimonial.rating} />
                    <p className="mt-2 text-gray-600 italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
