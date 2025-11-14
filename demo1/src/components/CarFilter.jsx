import React, { useState, useContext, useEffect } from 'react';
import { CarContext } from '../context/CarContext';

function CarFilter() {
  const { filterByPrice } = useContext(CarContext);
  const [price, setPrice] = useState('');

  // Khi người dùng xóa hết giá → tự động hiển thị lại tất cả xe
  useEffect(() => {
    if (price === '') {
      filterByPrice('');
    }
  }, [price]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (price === '') {
      filterByPrice('');
    } else {
      filterByPrice(Number(price));
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex mb-3">
      <input
        type="number"
        className="form-control me-2"
        placeholder="Enter max price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default CarFilter;
