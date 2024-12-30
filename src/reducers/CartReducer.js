const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //   Prevent duplicates by checking if the item already exists
      if (state.includes(action.payload)) {
        return state; // No change if item already exists
      }
      return [...state, action.payload]; // Add the item to the cart

    case "REMOVE_FROM_CART":
      // Remove item by ID
      return state.filter((cart) => cart.id !== action.payload.id);
    default:
      return state;
  }
};

export { CartReducer };
