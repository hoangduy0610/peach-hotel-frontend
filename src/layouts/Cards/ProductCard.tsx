import React from "react";
import "./ProductCard.scss";
import { Card, Button, Badge, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

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

        {/* Rating */}
        <div className="rating mb-3">
          <i className="bi bi-star-fill me-1"></i>
          <span>{val.rating.toFixed(1)} / 5</span>
        </div>

        {/* Category */}
        <Stack direction="horizontal" gap={2} className="mb-3">
          {val.category.map((cat, index) => (
            <Badge key={index} className="category-badge">
              {cat}
            </Badge>
          ))}
        </Stack>

        {/* Tier */}
        <div className="tier mb-3">
          <span className="label">Hạng phòng:</span>
          <Badge className={`tier-badge ${val.tier.toLowerCase()}`}>
            {val.tier}
          </Badge>
        </div>

        {/* Features */}
        <div className="features mt-3">
          <span className="label">Tiện nghi:</span>
          <div className="features-list">
            {val.features.map((feature, index) => (
              <span key={index} className="feature">
                <i className={`bi ${featureIcons[feature] || "bi-box"}`}></i> {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Price */}
        <div className="price mt-4 mb-4">
          <span className="label">Giá:</span>{" "}
          <span className="price-value">
            {val.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>{" "}
          / đêm
        </div>
      </Card.Body>

      {/* Footer with buttons */}
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => navigate("/room-details")}>
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
