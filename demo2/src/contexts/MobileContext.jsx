import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const MobileContext = createContext();

const initialState = { mobiles: [], favourites: [], cart: [], user: null };

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOBILES":
      return { ...state, mobiles: action.payload };
    case "ADD_FAV":
      return { ...state, favourites: [...state.favourites, action.payload] };
    case "ADD_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "LOGIN":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function MobileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("http://localhost:5000/mobiles").then(res => {
      dispatch({ type: "SET_MOBILES", payload: res.data });
    });
  }, []);

  return (
    <MobileContext.Provider value={{ state, dispatch }}>
      {children}
    </MobileContext.Provider>
  );
}
