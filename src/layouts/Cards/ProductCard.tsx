import React from "react";
import "./ProductCard.scss";
import { Card, Button, Badge, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Anchorage from "@/assets/view1.jpg";
import { Rate } from 'antd';

interface ProductCardProps {
  val: {
    id: number,
    name: string,
    floor: 0,
    price: 0,
    roomTier: {
      name: string;
      description: string;
    }
    rating: 0,
    isBalcony: boolean,
    isBathroom: boolean,
    isAirConditioner: boolean,
    isFreeWifi: boolean,
    isTelevision: boolean,
    isRefrigerator: boolean,
    isBreakfast: boolean,
    isLunch: boolean,
    isDinner: boolean,
    isSnack: boolean,
    isDrink: boolean,
    isParking: boolean,
    isSwimmingPool: boolean,
    isGym: boolean,
    isSpa: boolean,
    isLaundry: boolean,
    isCarRental: boolean,
    isBusService: boolean
  }
  checkInDate?: string;
  checkOutDate?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ val, checkInDate, checkOutDate }) => {
  const navigate = useNavigate();
  const featureIcons: { [key: string]: string } = {
    TV: "bi-tv",
    Conditioner: "bi-fan",
    Bathtub: "bi-droplet",
    Wifi: "bi-wifi",
    Refrigerator: "bi-box",
    Breakfast: "bi-bowl",
    Lunch: "bi-cup",
    Dinner: "bi-spoon",
    Snack: "bi-basket",
    Drink: "bi-cup-straw",
    Parking: "bi-parking",
    SwimmingPool: "bi-pool",
    Gym: "bi-droplet-half",
    Spa: "bi-spa",
  };
  console.log('val', val);

  return (
    <Card className="rounded-3 shadow-sm product-card">
      <Card.Img
        variant="top"
        // src={val.image}
        src={Anchorage}
        className="img-fluid"
        alt={`Image of ${val.name}`}
      />
      <Card.Body>
        <Card.Title>
          <NavLink
            className="body-text text-dark text-decoration-none"
            to="/details"
          >
            {val.name}
          </NavLink>
        </Card.Title>

        {/* Rating */}
        <div className="rating mb-3">
          {Array.from({ length: 5 }, (_, index) => {
            const fullStars = Math.floor(val.rating); // Replace 3.5 with val.rating
            const hasHalfStar = val.rating % 1 !== 0; // Replace 3.5 with val.rating
            if (index < fullStars) {
              return <i className="bi bi-star-fill text-warning" key={index}></i>;
            } else if (index === fullStars && hasHalfStar) {
              return <i className="bi bi-star-half text-warning" key={index}></i>;
            } else {
              return <i className="bi bi-star text-warning" key={index}></i>;
            }
          })}
          <span className="ms-2">{val.rating} / 5</span> {/* Replace 3.5 with val.rating */}
        </div>

        {/* Category */}
        {/* <Stack direction="horizontal" gap={2} className="mb-3">
          {val.category.map((cat, index) => (
            <Badge key={index} className="category-badge">
              {cat}
            </Badge>
          ))}
        </Stack> */}

        {/* Tier */}
        <div className="tier mb-3">
          <span className="label">Hạng phòng:</span>
          <Badge className={`tier-badge ${val.roomTier.name.toLowerCase()}`}>
            {val.roomTier.name}
          </Badge>
        </div>

        {/* Features */}
        <div className="features mt-3">
          <span className="label">Tiện nghi:</span>
          <div className="features-list mt-3">
            {/* {val.features.map((feature, index) => (
              <span key={index} className="feature">
                <i className={`bi ${featureIcons[feature] || "bi-box"}`}></i> {feature}
              </span>
            ))} */}
            {
              val.isAirConditioner && <span className="feature">
                <i className="bi bi-fan"></i> Điều hòa
              </span>
            }
            {
              val.isBalcony && <span className="feature">
                <i className="bi bi-house-door"></i> Ban công
              </span>
            }
            {
              val.isBathroom && <span className="feature">
                <i className="bi bi-droplet"></i> Phòng tắm
              </span>
            }
            {
              val.isFreeWifi && <span className="feature">
                <i className="bi bi-wifi"></i> Wifi miễn phí
              </span>
            }
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
        <Button variant="primary" onClick={() => navigate(`/room/${val.id}`)}>
          Xem chi tiết
        </Button>
        <Button variant="success" onClick={() => navigate("/booking", {
          state: {
            roomId: val.id,
            roomTier: val.roomTier.name,
            roomName: val.name,
            checkInDate,
            checkOutDate,
            price: val.price
          }
        })}>
          Đặt phòng
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
