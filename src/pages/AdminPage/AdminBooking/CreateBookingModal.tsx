import { SelectAdditionalService } from "@/pages/Booking/SelectAdditionalService";
import { MainApiRequest } from "@/services/MainApiRequest";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./AdminBooking.scss";
export const CreateBookingModal = ({
    openCreateBookingModal,
    onOKCreateBooking,
    onCancelCreateBooking
}: {
    openCreateBookingModal: boolean,
    onOKCreateBooking: (data: any) => void,
    onCancelCreateBooking: () => void
}) => {
    const [form] = Form.useForm();
    const [serviceTiers, setServiceTiers] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Date>(moment().startOf('day').toDate());
    const [endDate, setEndDate] = useState<Date>(moment().add(5, 'days').startOf('day').toDate());
    const [showServiceModal, setShowServiceModal] = useState(false); // State to toggle modal visibility
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [isLoadingTierList, setIsLoadingTierList] = useState(false);

    const handleCreateBooking = () => {
        if (!form.getFieldValue('userId') || !selectedRoom) {
            message.error('Please fill in all required fields!');
            return;
        }
        const bookingData = {
            userId: form.getFieldValue('userId'),
            customerName: customers.find(customer => customer.id === form.getFieldValue('userId')).name,
            customerPhone: form.getFieldValue('customerPhone'),
            checkIn: moment(startDate).startOf('day').toISOString(),
            checkOut: moment(endDate).startOf('day').toISOString(),
            roomIds: [
                selectedRoom?.id
            ],
            serviceIds: selectedServices.map(service => service.id),
        }

        onOKCreateBooking(bookingData);
    }

    const [rooms, setRooms] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

    const fetchRooms = async () => {
        const res = await MainApiRequest.get('/room/filter-available', {
            params: {
                checkInDate: moment(startDate).startOf('day').toISOString(),
                checkOutDate: moment(endDate).startOf('day').toISOString(),
            }
        });
        setRooms(res.data);
    };

    const fetchAvailableServices = async () => {
        setIsLoadingTierList(true);
        const res = await MainApiRequest.get("/service/tier/list");
        setServiceTiers(res.data);
        setIsLoadingTierList(false);
    };

    const fetchCustomers = async () => {
        const res = await MainApiRequest.get('/user/list');
        setCustomers(res.data);
    };

    useEffect(() => {
        fetchCustomers();
        fetchRooms();
        fetchAvailableServices();
    }, []);

    const handleOnChangeCustomer = (value: any) => {
        const customer = customers.find(customer => customer.id === value);
        form.setFieldsValue({
            customerPhone: customer.phone,
            // customerEmail: customer.email
        });
    }

    const handleChangeRoom = (value: any) => {
        const room = rooms.find(room => room.id === value);
        setSelectedRoom(room);
    }

    return (
        <>
            <SelectAdditionalService
                isLoadingTier={isLoadingTierList}
                showServiceModal={showServiceModal}
                tierList={serviceTiers}
                onOk={(service: any[]) => {
                    setSelectedServices([...selectedServices, ...service]);
                }}
                onCancel={() => setShowServiceModal(false)}
            />
            <Modal
                className="booking-modal"
                title="Create Booking"
                open={openCreateBookingModal}
                onOk={() => handleCreateBooking()}
                onCancel={() => onCancelCreateBooking()}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label='Customer'
                        name='userId'
                        rules={[{ required: true, message: 'Please input customer name!' }]}
                    >
                        <Select onChange={handleOnChangeCustomer}>
                            {
                                customers.map(customer => (
                                    <Select.Option key={customer.id} value={customer.id}>{customer.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Phone Number'
                        name='customerPhone'
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                        <Input type='text' readOnly disabled />
                    </Form.Item>
                    <div className="field-row">
                    <Form.Item
                        label='Check In'
                        name='checkIn'
                        rules={[{ required: true, message: 'Please select check-in date!' }]}
                    >
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date || new Date())}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                        />
                    </Form.Item>
                    <Form.Item
                        label='Check Out'
                        name='checkOut'
                        rules={[{ required: true, message: 'Please select check-out date!' }]}
                    >
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date || new Date())}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                        />
                    </Form.Item>
                    </div>
                    <div className="field-row1">
                        <Select onChange={handleChangeRoom}>
                            {
                                rooms.map(room => (
                                    <Select.Option 
                                        key={room.id} 
                                        value={room.id}
                                    >
                                        {room.name} - Capacity: {room.roomTier.capacity}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                        <Button onClick={fetchRooms}>
                            Fetch Rooms
                        </Button>
                    </div>
                    <Form.Item label={'Room Pricing'}>
                        <Input type='text' value={selectedRoom?.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} readOnly disabled />
                    </Form.Item>
                </Form>

                <Button onClick={() => setShowServiceModal(true)} className="my-2">
                    <i className="bi bi-plus-circle-fill"></i> Select Additional Services
                </Button>
                <Table
                    columns={[
                        { title: "Service", dataIndex: "name" },
                        { title: "Price", dataIndex: "price", render: (price) => price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <Button
                                    onClick={() => setSelectedServices(selectedServices.filter((service) => service.id !== record.id))}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            ),
                        }
                    ]}
                    dataSource={selectedServices}
                    pagination={false}
                />
                <span className="my-2">
                    <strong className="fw-bold">Subtotal : </strong>
                    {
                        (selectedServices.reduce((acc, service) => acc + service.price, 0) + (selectedRoom?.price || 0)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                    }
                </span>
            </Modal>
        </>
    );
}