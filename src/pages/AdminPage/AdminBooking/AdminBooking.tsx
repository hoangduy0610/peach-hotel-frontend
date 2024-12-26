// src/app/pages/AdminPage/Booking/Booking.tsx
import React, { useEffect, useState } from 'react';
import './AdminBooking.css';
import BookingFilterPanel from '@/components/BookingFilterPanel/BookingFilterPanel';
import BookingTable from '@/components/booking-table/BookingTable';
import { MainApiRequest } from '@/services/MainApiRequest';

const initialBookings = [
  { guest: 'John Doe', phoneNumber: '0123456789', checkIn: '2024-12-26', checkOut: '2024-12-30', roomType: 'Deluxe', status: 'Booked' },
  { guest: 'Jane Smith', phoneNumber: '0123456789', checkIn: '2024-12-21', checkOut: '2024-12-23', roomType: 'Standard', status: 'Canceled' },
  { guest: 'Alice Johnson', phoneNumber: '0123456789', checkIn: '2024-12-19', checkOut: '2024-12-22', roomType: 'Suite', status: 'Refunded' },
];

const AdminBooking = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [bookingList, setBookingList] = useState<any[]>([]);

  const filteredBookings = initialBookings.filter(booking => 
    selectedFilter === 'All' || booking.status === selectedFilter
  );
  const fetchBookingList = async()=>{
    const res = await MainApiRequest.get('/booking/list');
    setBookingList(res.data)
  }
  useEffect(()=>{
    fetchBookingList()
  },[])


  return (
    <div className="booking-container">
      <h1>Booking Management</h1>
      <BookingFilterPanel 
        selectedFilter={selectedFilter} 
        onFilterChange={setSelectedFilter} 
      />
      <BookingTable bookings={bookingList} />
    </div>
  );
};

export default AdminBooking;
