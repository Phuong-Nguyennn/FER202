import React, { useContext } from 'react';
import { CarContext } from '../context/CarContext';

function CarList() {
  const { state } = useContext(CarContext);

  // Nếu không có xe nào khớp điều kiện
  if (state.filteredCars.length === 0) {
    return (
      <div className="text-center mt-4">
        <h5>No cars found for this price</h5>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      {state.filteredCars.map((car) => (
        <div
          key={car.id}
          className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
        >
          <div
            className="card shadow-sm text-center"
            style={{
              width: '18rem',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {/* Ảnh xe */}
            <div
              style={{
                width: '100%',
                height: '180px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
              }}
            >
              <img
                src={process.env.PUBLIC_URL + car.image}  // ✅ load đúng từ public/img
                alt={car.model}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // không méo hình
                }}
                onError={(e) => {
                  // Nếu ảnh không tìm thấy → hiển thị ảnh mặc định
                  e.target.src = `${process.env.PUBLIC_URL}/img/no-image.png`;
                }}
              />
            </div>

            {/* Thông tin xe */}
            <div className="card-body">
              <h5 className="card-title">
                {car.make} {car.model}
              </h5>
              <p className="card-text mb-1">Year: {car.year}</p>
              <p className="card-text">Price: ${car.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;
