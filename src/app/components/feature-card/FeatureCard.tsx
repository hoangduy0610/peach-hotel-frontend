import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import './FeatureCard.scss';

interface FeatureCardProps {
  title: string;
  image: string;
  address: string;
  avatar: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, image, address, avatar }) => {
  return (
    <div className="feature-card">
      <div className="feature-card__image-container">
        <img src={image} alt={title} className="feature-card__image" />
        <HeartOutlined className="feature-card__favorite-icon" />
        <div className="feature-card__info">
            <img src={avatar} alt="Avatar" className="feature-card__avatar" />
            <div className="feature-card__title">{title}</div>
            <div className="feature-card__address">{address}</div>
        </div>
        
      </div>
    </div>
  );
};

export default FeatureCard;
