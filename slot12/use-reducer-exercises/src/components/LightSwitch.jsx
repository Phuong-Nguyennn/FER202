import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

// 1️⃣ Khởi tạo state ban đầu
const initialState = { isLightOn: false };

// 2️⃣ Định nghĩa reducer để xử lý các action
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isLightOn: !state.isLightOn }; // đảo trạng thái đèn
    case 'TURN_ON':
      return { ...state, isLightOn: true };
    case 'TURN_OFF':
      return { ...state, isLightOn: false };
    default:
      return state;
  }
}

function LightSwitch() {
  // 3️⃣ Khởi tạo useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Style cho button
  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}
      </p>

      {/* Nút toggle */}
      <Button
        onClick={() => dispatch({ type: 'TOGGLE' })}
        style={{
          ...buttonStyle,
          background: state.isLightOn ? 'red' : 'green',
          color: 'white',
        }}
      >
        {state.isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
      </Button>

      {/* Nút phụ: Bật/Tắt riêng */}
      <div className="mt-3">
        <Button
          variant="success"
          style={buttonStyle}
          onClick={() => dispatch({ type: 'TURN_ON' })}
        >
          Bật Đèn
        </Button>
        <Button
          variant="danger"
          style={buttonStyle}
          onClick={() => dispatch({ type: 'TURN_OFF' })}
        >
          Tắt Đèn
        </Button>
      </div>
    </div>
  );
}

export default LightSwitch;
