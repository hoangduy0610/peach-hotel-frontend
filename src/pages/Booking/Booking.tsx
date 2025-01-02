import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./Booking.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { MainApiRequest } from "@/services/MainApiRequest";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [startDate, setStartDate] = useState(
    location.state?.checkInDate ? new Date(location.state?.checkInDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    location.state?.checkOutDate ? new Date(location.state?.checkOutDate) : new Date()
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [cccd, setCccd] = useState("");
  const [email, setEmail] = useState("");

  const totalNights = moment(endDate).startOf("day").diff(moment(startDate).startOf("day"), "days");
  const basePrice = location.state?.price || 0;
  const taxesAndFees = basePrice * 0.1 * totalNights;
  const totalPayable = basePrice * totalNights + taxesAndFees;

  const fetchUserInformation = async () => {
    const res = await MainApiRequest.get("/auth/callback");
    setFirstName(res.data.data.name.split(" ")[0]);
    setLastName(res.data.data.name.split(" ").slice(1).join(" "));
  };

  useEffect(() => {
    document.title = "Booking";
    window.scroll(0, 0);
    fetchUserInformation();
  }, []);

  const handleBookRoom = async () => {
    const data = {
      userId: 1,
      customerName: `${firstName} ${lastName}`,
      customerPhone: phone,
      checkIn: moment(startDate).format("YYYY-MM-DD"),
      checkOut: moment(endDate).format("YYYY-MM-DD"),
      roomIds: [location.state?.roomId],
      status: "Pending",
    };

    try {
      const res = await MainApiRequest.post("/booking", data);

      if (res.status === 200) {
        alert("Booking success, proceed to payment");
        navigate("/payment", { state: { bookingData: res.data } });
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book room");
    }
  };

  return (
    <>
      <Breadcrumbs title="Booking" pagename="Booking" />
      <section className="booking-section py-5">
        <Container>
          <Row>
            <Col md="8">
              <div className="booking-form-warp border rounded-3">
                <div className="form-title px-4 border-bottom py-3">
                  <h3 className="h4 font-bold m-0">Your Details</h3>
                  <h5 className="font-bold my-2">
                    Room: {location.state?.roomName} - Tier: {location.state?.roomTier}
                  </h5>
                </div>

                <Form className="p-4">
                  <Row>
                    <Form.Group as={Col} md="6" className="mb-4">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" className="mb-4">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                      />
                    </Form.Group>

                    <div className="phone-email-group">
                      <Form.Group as={Col} md="6" className="mb-4">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number"
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                    </Form.Group>
                    </div>

                    {/* Date fields grouped in a single row */}
                    <div className="date-field-group">
                      <Form.Group as={Col} md="6" className="mb-4 date-field">
                        <Form.Label>Check In</Form.Label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date || new Date())}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="form-control"
                          dateFormat="dd, MMMM, yyyy"
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" className="mb-4 date-field">
                        <Form.Label>Check Out</Form.Label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date || new Date())}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          className="form-control"
                          dateFormat="dd, MMMM, yyyy"
                        />
                      </Form.Group>
                    </div>

                    {/* <Form.Group as={Col} md="6" className="mb-4">
                      <Form.Label>CCCD Number</Form.Label>
                      <Form.Control
                        value={cccd}
                        onChange={(e) => setCccd(e.target.value)}
                        placeholder="CCCD Number"
                      />
                    </Form.Group> */}

                    <Col md="12">
                      <button className="primaryBtn" type="button" onClick={handleBookRoom}>
                        Submit Now
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md="4">
              <Card className="card-info shadow-sm bg-white">
                <Card.Header>
                  <h1 className="font-bold h4 mt-2">Summary</h1>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Room Name</span>
                      <strong>{location.state?.roomName}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>People</span>
                      <strong>{location.state?.maxPeople}</strong>
                    </ListGroup.Item>
                    {/* Combined Check-in and Check-out into one field */}
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Dates</span>
                      <strong>
                        {moment(startDate).format("DD/MM/YYYY")} - {moment(endDate).format("DD/MM/YYYY")}
                      </strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Customer Name</span>
                      <strong>{`${firstName} ${lastName}`}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>CCCD Number</span>
                      <strong>{cccd}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Phone Number</span>
                      <strong>{phone}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Email</span>
                      <strong>{email}</strong>
                    </ListGroup.Item>
                    {/* Price Summary Section */}
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Base Price</span>
                      <strong>{basePrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Total Nights</span>
                      <strong>{totalNights}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between h5">
                      <span>Taxes & Fees</span>
                      <strong>{taxesAndFees.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <span className="font-bold h5">Payable Now</span>
                  <strong className="font-bold h5">
                    {totalPayable.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                  </strong>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Booking;
