import React from 'react';
import "./ProductCard.scss";
import { Card, Button, Badge, Stack } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  val: {
    image: string;
    title: string;
    rating: number;
    category: string[];
    price: number;
    tier: string;
    features: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ val }) => {
  const navigate = useNavigate();
  const featureIcons: { [key: string]: string } = {
    TV: "bi-tv",
    Conditioner: "bi-fan",
    Bathtub: "bi-droplet",
    Wifi: "bi-wifi",
  };

  return (
    <Card className="rounded-3 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={val.image}
        className="img-fluid"
        alt={`Image of ${val.title}`}
      />
      <Card.Body>
        <Card.Title>
          <NavLink
            className="body-text text-dark text-decoration-none"
            to="/details"
          >
            {val.title}
          </NavLink>
        </Card.Title>

        <div className="rating">
          <i className="bi bi-star-fill me-1"></i>
          <span>{val.rating.toFixed(1)} / 5</span>
        </div>

        <Stack direction="horizontal" gap={2} className="mb-3">
          {val.category.map((cat, index) => (
            <Badge key={index} className="category-badge">
              {cat}
            </Badge>
          ))}
        </Stack>

        <p className="price">
          {val.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}{' '}
          / đêm
        </p>

        <Badge className={`tier-badge ${val.tier.toLowerCase()}`}>
          {val.tier}
        </Badge>

        <div className="features mt-3">
          {val.features.map((feature, index) => (
            <span key={index} className="feature">
              <i className={`bi ${featureIcons[feature] || 'bi-box'}`}></i> {feature}
            </span>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
      <Button variant="primary" onClick={() => navigate("/details")}>
        Xem chi tiết
      </Button>
      <Button variant="success" onClick={() => navigate("/booking")}>
        Đặt phòng
      </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
