import React from 'react';
import { Card } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { FaBed, FaBath, FaCar, FaDog } from 'react-icons/fa';
import './RoomCard.scss';

const { Meta } = Card;

interface RoomCardProps {
  priceRange: string;
  title: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  pets: number;
}

const RoomCard: React.FC<RoomCardProps> = ({
  priceRange,
  title,
  address,
  bedrooms,
  bathrooms,
  parking,
  pets,
}) => {
  return (
    <Card
      hoverable
      className="room-card"
      cover={
        <div className="room-card__image-container">
          <img
            alt={title}
            src=""
            className="room-card__image"
          />
          <HeartOutlined className="room-card__favorite-icon" />
          <div className="room-card__price">{priceRange}</div>
        </div>
      }
    >
      <Meta title={title} description={address} className="room-card__meta" />
      <div className="room-card__info">
        <div className="room-card__info-item">
          <span role="img" aria-label="bedroom"><FaBed /></span> {bedrooms}
        </div>
        <div className="room-card__info-item">
          <span role="img" aria-label="bathroom"><FaBath /></span> {bathrooms}
        </div>
        <div className="room-card__info-item">
          <span role="img" aria-label="parking"><FaCar /></span> {parking}
        </div>
        <div className="room-card__info-item">
          <span role="img" aria-label="pets"><FaDog /></span> {pets}
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
