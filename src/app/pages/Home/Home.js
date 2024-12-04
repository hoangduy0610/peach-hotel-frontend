import React from "react";
import { sCount } from "./homeStore";
import RoomCard from "../../components/room-card/RoomCard.tsx";
import FeatureCard from "../../components/feature-card/FeatureCard.tsx";
import RoomListItem from "../../components/room-list-item/RoomListItem.tsx";
import "../../components/feature-card/demo.png";

export default function Home() {
  const count = sCount.use();

  const handleClick = () => {
    sCount.set((n) => (n.value += 1));
  };

  return (
    <div>
      <h1>BAO NHIEU DAO {count}</h1>
      <button onClick={handleClick}>Up</button>
      <button onClick={handleClick}>Up</button>
      <RoomCard
        priceRange="$1000 - $5000 USD"
        title="Well Furnished Apartment"
        address="100 Smart Street, LA, USA"
        bedrooms={3}
        bathrooms={1}
        parking={2}
        pets={0}
      />
      <FeatureCard
        title="Well Furnished Apartment"
        address="100 Smart Street, LA, USA"
        avatar="demo.png"
      />
      <RoomListItem/>
    </div>
  );
}
