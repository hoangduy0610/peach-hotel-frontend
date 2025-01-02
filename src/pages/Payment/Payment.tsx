import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, ListGroup, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "./Payment.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();


    // Extract values from location.state and set default values
    const { 
        checkInDate = null, 
        checkOutDate = null, 
        price = 0, 
        roomName = "N/A", 
        roomTier = "N/A" 
    } = location.state || {};


    // Validate values before calculations
    const totalNights = checkInDate && checkOutDate 
        ? moment(checkOutDate).startOf('day').diff(moment(checkInDate).startOf('day'), 'days') 
        : 0;

    const taxesAndFees = price * 0.1 * totalNights;
    const payableNow = price * 1.1 * totalNights;

    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    const handlePayment = () => {
        alert("Payment successful!");
        navigate("/");
    };

    useEffect(() => {
        document.title = "Payment Page";
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Breadcrumbs title="Payment" pagename="Payment" />
            <section className="payment-section py-5">
            <Container>
                <Row>
                <Col md="8" lg="8">
                    <div className="payment-details border rounded-3 p-4">
                    <h3 className="h4 font-bold mb-4">Payment Details</h3>
                    <Form>
                        <Form.Group className="mb-4">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="bankTransfer">Bank Transfer</option>
                            <option value="paypal">PayPal</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter your card number" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                        <Form.Label>Expiration Date</Form.Label>
                        <Row>
                            <Col>
                            <Form.Control type="text" placeholder="MM" />
                            </Col>
                            <Col>
                            <Form.Control type="text" placeholder="YY" />
                            </Col>
                        </Row>
                        </Form.Group>
                        <Form.Group className="mb-4">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="password" placeholder="Enter CVV" />
                        </Form.Group>
                        <button
                        type="button"
                        className="primaryBtn w-100 h-40 " 
                        onClick={handlePayment}
                        >
                        Pay Now
                        </button>
                    </Form>
                    </div>
                </Col>
                <Col md="4" lg="4">
                    <Card className="card-info p-0 shadow-sm bg-white">
                    <Card.Header>
                        <h1 className="font-bold h4 mt-2">Summary</h1>
                    </Card.Header>
                    <Card.Body className="pb-0">
                        <ListGroup>
                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                            <span>Room</span>
                            <strong>{roomName} - {roomTier}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                            <span>Total Nights</span>
                            <strong>{totalNights}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                            <span>Base Price</span>
                            <strong>{price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                            <span>Taxes & Fees</span>
                            <strong>{taxesAndFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
                        </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between py-4">
                        <span className="font-bold h5">Total Payment</span>
                        <strong className="font-bold h5">
                        {payableNow.toLocaleString("en-US", { style: "currency", currency: "USD" })}
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

export default Payment;
