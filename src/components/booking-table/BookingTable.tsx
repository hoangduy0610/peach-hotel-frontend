// src/app/components/BookingTable.tsx
import React from 'react';
import './BookingTable.css';

interface Booking {
  customerName: string;
  reservationCode: string;
  customerPhone: string;
  checkIn: string;
  checkOut: string;
  rooms: {
    roomTier: {
      name: string;

    }
  }[];
  status: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <table className="booking-table">
      <thead>
        <tr>

          <th>Guest</th>
          <th>Reservation Code</th>
          <th>Phone Number</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Room Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td>{booking.customerName}</td>
            <td>{booking.reservationCode}</td>
            <td>{booking.customerPhone}</td>
            <td>{booking.checkIn.split('T')[0]}</td>
            <td>{booking.checkOut.split('T')[0]}</td>
            <td>{booking.rooms[0].roomTier.name}</td>
            <td>{booking.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
