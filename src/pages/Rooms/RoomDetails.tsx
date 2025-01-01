import React, { useEffect, useState } from "react";
import "./Room.scss";
import ImageGallery from "react-image-gallery";
import { Container, Row, Col, Tab, Card, Stack, ListGroup } from "react-bootstrap";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import { NavLink, useParams } from "react-router-dom";
import { MainApiRequest } from "@/services/MainApiRequest";

// interface RoomDetail {
//   roomTierId: number;
//   name: string;
//   //description: string;
//   floor: number;
//   price: number;
//   rating: number;
//   reviews: number;
//   images: { original: string }[];
//   features: { [key: string]: boolean };
//   included?: string[];
//   exclusion?: string[];
// }


const RoomDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [roomDetail, setRoomDetail] = useState<any>();

  const fetchRoomDetail = async () => {
    const res = await MainApiRequest.get(`/room/${id}`);
    console.log(res.data);
    setRoomDetail(res.data);
  };

  useEffect(() => {
    document.title = "Room Details";
    window.scroll(0, 0);
    
    fetchRoomDetail();  
  }, []);

  return (
    <>
      <Breadcrumbs
        title={roomDetail?.name || "Room"}
        pagename={<NavLink to="/hotel">Room</NavLink>}
        childpagename={roomDetail?.name || "Room"}
      />

      <section className="room_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{roomDetail?.name || ""}</h1>
            <ImageGallery
              items={roomDetail?.images || []}
              showNav={false}
              showBullets={false}
              showPlayButton={false}
            />

            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row className="py-5">
                <Col md={8}>
                  <Tab.Content className="mt-4">
                    <div className="room_details">
                      <h3 className="font-bold mb-2 h3 border-bottom pb-2">Overview</h3>
                      {/* <p>{roomDetail?.description}</p> */}
                      <h5 className="font-bold mb-2 h5 mt-3">Features</h5>
                      <ul>
                        {Object.entries(roomDetail?.features || {}).map(([key, value]) =>
                          value ? <li key={key}>{key.replace("is", "").replace(/([A-Z])/g, " $1")}</li> : null
                        )}
                      </ul>
                    </div>

                    {/* Inclusions & Exclusions */}
                    <div className="room_details">
                      <h1 className="font-bold h3 border-bottom pb-2">Inclusions & Exclusions</h1>

                      {/* Inclusions */}
                      {roomDetail?.included && (
                        <>
                          <h5 className="font-bold mt-3">Inclusion</h5>
                          {roomDetail.included.map((item: string, index: number) => (
                            <ListGroup.Item
                              className="border-0 pt-0 d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-check-lg me-2 text-success"></i>
                              {item}
                            </ListGroup.Item>
                          ))}
                        </>
                      )}

                      {/* Exclusions */}
                      {roomDetail?.exclusion && (
                        <>
                          <h5 className="font-bold mt-3">Exclusion</h5>
                          {roomDetail.exclusion.map((item: string, index: number) => (
                            <ListGroup.Item
                              className="border-0 pt-0 d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-x-lg me-2 text-danger"></i>
                              {item}
                            </ListGroup.Item>
                          ))}
                        </>
                      )}
                    </div>
                  </Tab.Content>
                </Col>

                {/* Sidebar */}
                <Col md={4}>
                  <aside>
                    {/* Price Info */}
                    <Card className="rounded-3 p-2 shadow-sm mb-4">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold h2">${roomDetail?.price || "N/A"}</h1>
                          <span className="fs-4">/person</span>
                        </Stack>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          {/* Rating */}
                          <div>
                            <span className="fw-bold">{roomDetail?.rating || "N/A"}</span>
                            {[...Array(Math.floor(roomDetail?.rating || 0))].map(
                              (_, i) => (
                                <i
                                  key={i}
                                  className="bi bi-star-fill text-warning"
                                ></i>
                              )
                            )}
                            {(roomDetail?.rating || 0) % 1 > 0 && (
                              <i className="bi bi-star-half text-warning"></i>
                            )}
                          </div>
                          <h5>({roomDetail?.reviews || 0} reviews)</h5>
                        </div>
                        <NavLink
                          to="/booking"
                          className="primaryBtn w-100 fw-bold text-center"
                        >
                          Book Now
                        </NavLink>
                      </Card.Body>
                    </Card>

                    {/* Help Info */}
                    <Card className="shadow-sm">
                      <Card.Body>
                        <h3 className="font-bold mb-3">Need Help?</h3>
                        <ListGroup>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-telephone me-1"></i> Call us:{" "}
                            <strong>+91 123 456 789</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-alarm me-1"></i> Timing:{" "}
                            <strong>10AM to 7PM</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <strong>
                              <i className="bi bi-headset me-1"></i> Let us call
                              you
                            </strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-calendar-check me-1"></i>{" "}
                            <strong>Book Appointments</strong>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RoomDetails;
