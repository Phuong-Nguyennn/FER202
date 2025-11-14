export default function carReducer(state, action) {
  switch (action.type) {
    case 'SET_CARS':
      return { ...state, cars: action.payload, filteredCars: action.payload };

    case 'FILTER_BY_PRICE': {
      const price = Number(action.payload);

      // Nếu người dùng xóa input hoặc nhập giá <= 0 => hiển thị lại tất cả xe
      if (isNaN(price) || price <= 0) {
        return { ...state, filteredCars: state.cars };
      }

      // Lọc theo giá
      const filtered = state.cars.filter(car => car.price <= price);
      return { ...state, filteredCars: filtered };
    }

    default:
      return state;
  }
}
