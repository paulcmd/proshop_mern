import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      //console.log('state from cartReducer: ', state)
      // Check if item is already in cart
      // const existingItem = state.cartItems.find(
      //   (cartItem) => cartItem.product === item.product
      // )

      //If item is already in cart, increase quantity
      // if (existingItem) {   //try to add an item twice and check the qty(using both methods)
      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((cartItem) =>
      //       cartItem.product === item.product   // cartItemproduct is the cartItem's product id
      //         ? { ...cartItem, qty: cartItem.qty + item.qty }  //if item exists and users adds to cart a second time, increase qty. in the code below we are just returning a new cartItem object of the same item, with the same qty(no increment)
      //         : cartItem //buggy because it adds one extra item to the cart
      //     ),
      //   }
      // } else {
      //   return {
      //     ...state,
      //     cartItems: [...state.cartItems, item],
      //   }
      // }
      
       const existItem = state.cartItems.find((cartItem) => cartItem.product === item.product) // check if item exist in the cart

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem // if item exists in the cart, replace the item with the new item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => cartItem.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
