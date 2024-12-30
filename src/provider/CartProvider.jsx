import { useEffect, useReducer } from "react";
import { CartContext } from "../context";
import { useLocalStorage } from "../hooks";
import { CartReducer } from "../reducers/CartReducer";

const CartProvider = ({ children }) => {
  const [storedCarts, setStoredCarts] = useLocalStorage("carts", []);
  const [carts, dispatch] = useReducer(CartReducer, storedCarts);

  useEffect(() => {
    // Update localStorage only if `carts` has changed
    if (JSON.stringify(storedCarts) !== JSON.stringify(carts)) {
      setStoredCarts(carts);
    }
  }, [carts, storedCarts, setStoredCarts]);

  return (
    <CartContext.Provider value={{ carts, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
