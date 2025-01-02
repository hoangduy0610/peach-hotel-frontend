import React, { useState, useEffect } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import "./Room.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import Filters from "./Filters";
import ProductCard from "@/layouts/Cards/ProductCard";
import { popularsData } from "@/modules/data";
import { useLocation, useNavigate } from "react-router-dom";
import { MainApiRequest } from "@/services/MainApiRequest";
import Search from "@/layouts/Search/Search";

const Rooms = () => {
  const navigate = useNavigate();

  const {
    state,
  } = useLocation();

  const startDate = state?.startDate || new Date();
  const endDate = state?.endDate || new Date();

  const [show, setShow] = useState(false);
  const [roomList, setRoomList] = useState<any[]>([]);

  const handleClose = () => setShow(false);

  const fetchListRooms = async () => {
    let optionalParams = "";
    if (state?.tier) {
      optionalParams += `&roomTierId=${state.tier}`;
    }
    if (state?.guest) {
      optionalParams += `&guestNum=${state.guest}`;
    }
    const res = await MainApiRequest.get(`/room/filter-available?checkInDate=${startDate.toISOString()}&checkOutDate=${endDate.toISOString()}${optionalParams}`);
    console.log(res.data);
    setRoomList(res.data);
  };

  useEffect(() => {
    document.title = " Hotel   ";
    window.scroll(0, 0);

    fetchListRooms();
  }, []);

  return (
    <>
      <Breadcrumbs title="Hotel" pagename="Hotel" />
      <section className="py-5 room_list">
        <Search />
        <Container>
          <Col>
            <Row>
                {roomList.map((val, inx) => {
                  return (
                    <Col md={3} sm={6} xs={12} className="mb-5" key={inx}>
                      <ProductCard val={val} checkInDate={startDate} checkOutDate={endDate}/>
                    </Col>
                  );
                })}
              </Row>
            </Col>
        </Container>
      </section>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Search />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Rooms;