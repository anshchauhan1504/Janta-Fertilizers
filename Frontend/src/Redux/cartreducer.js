import { ADD_TO_CART } from "../Constraints/cartconstraint";

export const cartReducer = (
  state = {
    cartItems: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product //Treat product as id
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => {
            i.product === isItemExist.product ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], //If exist then add to the array cartItems
        };
      }
  }
};
