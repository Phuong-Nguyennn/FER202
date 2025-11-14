import React, { createContext, useReducer, useEffect } from 'react';
import carReducer from '../reducers/carReducer';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carReducer, { cars: [], filteredCars: [] });

  // Load danh sách xe từ JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/Cars")
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_CARS', payload: data }))
      .catch(err => console.error(err));
  }, []);

  // Hàm lọc xe theo giá
  const filterByPrice = (price) => {
    dispatch({ type: 'FILTER_BY_PRICE', payload: price });
  };

  return (
    <CarContext.Provider value={{ state, filterByPrice }}>
      {children}
    </CarContext.Provider>
  );
};
