import React from "react";
import { Rate } from "antd";
import { HeartOutlined } from '@ant-design/icons';
import { FaBed, FaTv, FaBath, FaWifi, FaExpandArrowsAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import "./RoomListItem.scss";

const RoomListItem = () => {
  return (
    <div className="list-item-card">
      <div className="list-item-image">
        <div className="image-placeholder">Xem thêm ảnh</div>
        <HeartOutlined className="feature-card__favorite-icon" />
      </div>
      <div className="list-item-details">
        <h3 className="list-item-title">Miss u - Thao thức vì em</h3>
        <div className="list-item-rating">
          <span>Đánh giá:</span>
          <Rate disabled defaultValue={4} />
          <span className="rating-value">4/5</span>
        </div>
        <div className="list-item-info">
          <span><FaBed /> 1 giường đơn  </span>
          <span><FaExpandArrowsAlt /> 30m²</span>
        </div>
        <div className="list-item-icons">
          <span><FaTv /></span>
          <span><FaBath /></span>
          <span><TbAirConditioning /></span>
          <span><FaWifi /></span>
        </div>
        <div className="list-item-price">
          Giá chỉ từ: <span className="price">5.000.000 ₫/đêm</span>
        </div>
        <div className="list-item-actions">
          <button className="details-button">Xem chi tiết</button>
          <button className="book-button">Đặt phòng</button>
        </div>
      </div>
    </div>
  );
};

export default RoomListItem;
