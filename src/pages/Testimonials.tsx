// src/components/Testimonials.js
import React from 'react';
import { Card, Row, Col, Rate } from 'antd';

const Testimonials = () => {
    const testimonials = [
        {
          name: 'John Doe',
          rating: 5,
          comment: 'Great service, I love the products!',
          image: 'https://via.placeholder.com/100',
        },
        {
          name: 'Jane Smith',
          rating: 4,
          comment: 'Good quality and fast delivery!',
          image: 'https://via.placeholder.com/100',
        },
        {
          name: 'Michael Johnson',
          rating: 5,
          comment: 'Amazing experience! Will definitely return.',
          image: 'https://via.placeholder.com/100',
        },
      ];
      
  return (
    <div className="testimonials" style={{ padding: '40px 0', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center' }}>What Our Customers Say</h2>
      <Row gutter={[16, 16]} justify="center">
        {testimonials.map((testimonial, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              cover={<img alt="customer" src={testimonial.image} />}
            >
              <Card.Meta
                title={testimonial.name}
                description={
                  <>
                    <Rate disabled defaultValue={testimonial.rating} />
                    <p>{testimonial.comment}</p>
                  </>
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
