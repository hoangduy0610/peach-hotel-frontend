import React, { useState, useEffect } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import "./Room.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import Filters from "./Filters";
import ProductCard from "@/layouts/Cards/ProductCard";
import { popularsData } from "@/modules/data";
import { useLocation, useNavigate } from "react-router-dom";
import { MainApiRequest } from "@/services/MainApiRequest";

const Rooms = () => {
  const navigate = useNavigate();

  const {
    state: { tier, guest, startDate, endDate },
  } = useLocation();

  const [show, setShow] = useState(false);
  const [roomList, setRoomList] = useState<any[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchListRooms = async () => {
    const res = await MainApiRequest.get(`/room/filter-available?checkInDate=${startDate.toISOString()}&checkOutDate=${endDate.toISOString()}&roomTierId=${tier}&guestNum=${guest}`);
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
        <Container>
          <Row>
            <Col xl="3" lg="4" md="12" sm="12">
              <div className="d-lg-none d-block">
                <button className="primaryBtn mb-4" onClick={handleShow}>
                  <i className="bi bi-funnel"></i> Filters
                </button>
              </div>
              <div className="filters d-lg-block d-none">
                <Filters />
              </div>

            </Col>
            <Col xl="9" lg="8" md="12" sm="12">
              <Row>
                {roomList.map((val, inx) => {
                  return (
                    <Col xl={4} lg={6} md={6} sm={6} className="mb-5" key={inx}>
                      <ProductCard val={val} checkInDate={startDate} checkOutDate={endDate}/>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filters />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Rooms;