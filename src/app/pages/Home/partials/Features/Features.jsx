import React from "react";
import "./Features.scss";

import feature1 from "../../../../assets/deal.png";
import feature2 from "../../../../assets/location.png";
import feature3 from "../../../../assets/medal.png";
import { Card, Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Features = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay:false,
    autoplaySpeed:1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow:false,
          nextArrow:false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:false,
          nextArrow:false,
        },
      },
    ],
  };

  const featureList = [
    {
      id: 0,
      image: feature1,
      title: "Discover the possibilities",
      des: "With nearly half a million attractions, hotels & more, you're sure to find joy.",
    },
    {
      id: 1,
      image: feature2,
      title: "Enjoy deals & delights",
      des: "Quality activities. Great prices. Plus, earn credits to save more.",
    },
    {
      id: 2,
      image: feature3,
      title: "Exploring made easyt",
      des: "Book last minute, skip lines &amp; get free cancellation for easier exploring.",
    },
  ];

  return (
    <>
    
      <section className="feature-section">
        <Container>
          <Row>
            <Col md="12">
              <Slider {...settings}>
                {featureList.map((feature, inx) => {
                  return (
                    <Card key={inx}>
                      <Card.Img
                        variant="top"
                        src={feature.image}
                        className="img-fluid"
                        alt={feature.title}
                      />
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.des}</Card.Text>
                    </Card>
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Features;