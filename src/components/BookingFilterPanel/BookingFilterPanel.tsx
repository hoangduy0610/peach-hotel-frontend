import React from 'react';
import './BookingFilterPanel.css';
interface BookingFilterPanelProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const BookingFilterPanel: React.FC<BookingFilterPanelProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="booking-filter-panel">
      <button 
        className={selectedFilter === 'All' ? 'active' : ''} 
        onClick={() => onFilterChange('All')}
      >
        All booking
      </button>
      <button 
        className={selectedFilter === 'Booked' ? 'active' : ''} 
        onClick={() => onFilterChange('Booked')}
      >
        Booked
      </button>
      <button 
        className={selectedFilter === 'Canceled' ? 'active' : ''} 
        onClick={() => onFilterChange('Canceled')}
      >
        Canceled
      </button>
      <button 
        className={selectedFilter === 'Refunded' ? 'active' : ''} 
        onClick={() => onFilterChange('Refunded')}
      >
        Refunded
      </button>
      <button 
        className={selectedFilter === 'Pending' ? 'active' : ''} 
        onClick={() => onFilterChange('Pending')}
      >
        Pending
      </button>
    </div>
  );
};

export default BookingFilterPanel;
