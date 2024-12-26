import React from "react";
import { Card } from "react-bootstrap";
import "./Cards.scss";
import { NavLink } from "react-router-dom";

const Cards = ({ tier }: any) => {
  return (
    <>
      <div className="img-box">
        <NavLink className="body-text text-dark text-decoration-none" to="/rooms">
          <Card>
            <Card.Img
              variant="top"
              src={tier.image}
              className="img-fluid"
              alt={tier.name}
            />
            <Card.Title>

              {tier.name}
            </Card.Title>

            <span className="rooms">{tier.rooms}</span>
          </Card>
        </NavLink>
      </div>
    </>
  );
};

export default Cards;