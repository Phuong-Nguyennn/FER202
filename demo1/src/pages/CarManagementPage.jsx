import React from 'react';
import CarFilter from '../components/CarFilter';
import CarList from '../components/CarList';

export default function CarManagementPage() {
  return (
    <div>
      <h3 className="text-center mb-4">Car Management</h3>
      <CarFilter />
      <CarList />
    </div>
  );
}
