import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, ListGroup, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "./Payment.scss";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import { Button } from "antd";
import LoadingOverlay from "@achmadk/react-loading-overlay";
import { MainApiRequest } from "@/services/MainApiRequest";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [discountCode, setDiscountCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Extract values from location.state and set default values
    const data = location?.state?.bookingData || {};
    const [price, setPrice] = useState(data.total || 0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const roomName = data.rooms[0].name || "";
    const roomTier = location?.state?.tierName || "";
    const checkInDate = moment(data.checkIn).startOf('day') || moment().startOf('day').toDate();
    const checkOutDate = moment(data.checkOut).startOf('day') || moment().startOf('day').add(1, 'days').toDate();


    // Validate values before calculations
    const totalNights = checkInDate && checkOutDate
        ? moment(checkOutDate).diff(moment(checkInDate), 'days')
        : 0;

    const taxesAndFees = price / 10;
    const payableNow = price - taxesAndFees;

    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    const handlePayment = async () => {
        const user = await MainApiRequest.get("/auth/callback");

        if (!user?.data?.data) {
            alert("Please login to continue payment");
            navigate("/login");
            return;
        }

        const res = await MainApiRequest.post("/payment", {
            "description": "Thanh toan dich vu Peach Hotel",
            "userId": user.data.data.id,
            "bookingId": location?.state?.bookingData?.id,
        });

        if (res.status !== 200) {
            alert("Payment failed!");
            return;
        }

        alert("Payment successful!");
        navigate("/");
    };

    useEffect(() => {
        document.title = "Payment Page";
        window.scrollTo(0, 0);
    }, []);

    const applyDiscount = async () => {
        setIsLoading(true);
        const bookingId = location?.state?.bookingData?.id;
        if (!bookingId) {
            setIsLoading(false);
            alert("Invalid booking data");
            return;
        }

        const res = await MainApiRequest.post(`/booking/coupon/${bookingId}?code=${discountCode}`).catch((err) => {
            console.error("Failed to apply discount:", err);
            return null;
        });
        if (res && res.status === 200) {
            alert("Discount applied successfully!");
            if (res.data.coupon.promote.type === "PERCENT") {
                setDiscountedPrice(price * res.data.coupon.promote.discount / 100);
            } else {
                setDiscountedPrice(res.data.coupon.promote.discount);
            }
        } else {
            alert("Invalid discount code!");
        }
        setIsLoading(false);
    }

    return (
        <LoadingOverlay
            active={isLoading}
            spinner
        >
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
                                            <span>Total Price</span>
                                            <strong>{payableNow.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span>Taxes & Fees</span>
                                            <strong>{taxesAndFees.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 justify-content-between h5 pt-0">
                                            <Form.Label>Discount Code</Form.Label>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <Form.Control type="text" placeholder="Enter code" onChange={(e) => setDiscountCode(e.target.value)} value={discountCode} />
                                                <button className="btn btn-success" onClick={applyDiscount}>Apply</button>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span>Discount</span>
                                            <strong>{discountedPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between py-4">
                                    <span className="font-bold h5">Total Payment</span>
                                    <strong className="font-bold h5">
                                        {(price - discountedPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </strong>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </LoadingOverlay>
    );
};

export default Payment;
