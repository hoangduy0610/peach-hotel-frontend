import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Card, ListGroup, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./Booking.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { MainApiRequest } from "@/services/MainApiRequest";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState(location.state?.checkInDate ? new Date(location.state?.checkInDate) : new Date());
  const [endDate, setEndDate] = useState(location.state?.checkInDate ? new Date(location.state?.checkOutDate) : new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<any[]>([]); // State to store available services
  const [selectedServices, setSelectedServices] = useState<any[]>([]); // State to store selected services
  const [showServiceModal, setShowServiceModal] = useState(false); // State to toggle modal visibility

  const fetchUserInformation = async () => {
    const res = await MainApiRequest.get("/auth/callback");
    setFirstName(res.data.data.name.split(" ")[0]);
    setLastName(res.data.data.name.split(" ").slice(1).join(" "));
  };

  const fetchAvailableServices = async () => {
    // Dữ liệu mẫu về các dịch vụ
    const sampleServices = [
      { id: 1, name: "Spa Service", price: 100000 },
      { id: 2, name: "Room Cleaning", price: 50000 },
      { id: 3, name: "Airport Transfer", price: 200000 },
      { id: 4, name: "Breakfast", price: 75000 },
    ];

    setServices(sampleServices);
  };

  useEffect(() => {
    document.title = "Page Name  ";
    window.scroll(0, 0);
    fetchUserInformation();
    fetchAvailableServices(); // Gọi hàm này để tải dữ liệu mẫu
  }, []);

  const handleBookRoom = async () => {
    const data = {
      "userId": 1,
      "customerName": `${firstName} ${lastName}`,
      "customerPhone": phone,
      "checkIn": moment(startDate).format("YYYY-MM-DD"),
      "checkOut": moment(endDate).format("YYYY-MM-DD"),
      "roomIds": [location.state?.roomId],
      "services": selectedServices.map((service) => service.id), // Sending selected services to the backend
    };

    console.log(data);

    const res = await MainApiRequest.post("/booking", data);

    if (res.status === 200) {
      alert("Booking success");
      navigate("/");
    }
  };

  const handleSelectService = (service: any) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.some((s) => s.id === service.id)) {
        return prevSelected.filter((s) => s.id !== service.id); // Remove if already selected
      } else {
        return [...prevSelected, service]; // Add if not selected
      }
    });
  };

  return (
    <>
      <Breadcrumbs title="Booking" pagename="Booking" />
      <section className="booking-section py-5">
        <Container>
          <Row>
            <Col md="8" lg="8">
              <div className="booking-form-warp border rounded-3">
                <div className="form-title px-4 border-bottom py-3">
                  <h3 className="h4 font-bold m-0"> Your Details</h3>
                  <h5 className="font-bold m-0 my-2">
                    Room: {location.state?.roomName} - Tier: {location.state?.roomTier}
                  </h5>
                </div>

                <Form className="p-4">
                  <Row>
                    <Form.Group as={Col} md="6" controlId="firstname" className="mb-4">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder="First name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="lastname" className="mb-4">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder="Last name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="phone" as={Col} md="6">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkin" as={Col} md="6">
                      <Form.Label className="d-block">Check In</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || new Date())}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control w-100"
                        dateFormat="dd, MMMM, yyyy"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkout" as={Col} md="6">
                      <Form.Label className="d-block">Check Out</Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date || new Date())}
                        selectsEnd
                        startDate={endDate}
                        endDate={startDate}
                        dateFormat="dd, MMMM, yyyy"
                        className="form-control w-100"
                      />
                    </Form.Group>

                    {/* Add Service Selection Button */}
                    <Col md="12" className="mb-4">
                      <Button variant="primary" onClick={() => setShowServiceModal(true)}>
                        Select Services
                      </Button>
                    </Col>

                    <Col md="12">
                      <button className="primaryBtn" type="button" onClick={handleBookRoom}>
                        Next
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md="4" lg="4">
              <Card className="card-info p-0 shadow-sm bg-white">
                <Card.Header>
                  <h1 className="font-bold h4 mt-2">Price Summary</h1>
                </Card.Header>
                <Card.Body className="pb-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Base Price</span>
                      <strong>{location.state?.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Total Nights</span>
                      <strong>
                        {moment(endDate).startOf("day").diff(moment(startDate).startOf("day"), "days")}
                      </strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Total Discount</span>
                      <strong>0đ</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Taxes % Fees</span>
                      <strong>
                        {(location.state?.price * 0.1 * moment(endDate).startOf("day").diff(moment(startDate).startOf("day"), "days")).toLocaleString(
                          "vi-VN",
                          { style: "currency", currency: "VND" }
                        )}
                      </strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between py-4">
                  <span className="font-bold h5"> Payable Now</span>
                  <strong className="font-bold h5">
                    {(location.state?.price * 1.1 * moment(endDate).startOf("day").diff(moment(startDate).startOf("day"), "days")).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Services</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {services.map((service) => (
              <ListGroup.Item key={service.id} action onClick={() => handleSelectService(service)}>
                {service.name}
                {selectedServices.some((s) => s.id === service.id) && <span className="badge bg-success ms-2">Selected</span>}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServiceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Booking;
