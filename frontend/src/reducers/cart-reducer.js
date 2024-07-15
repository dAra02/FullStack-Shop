import { ACTION_TYPE } from '../actions';

const initialCartState = {
	cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const cartReducer = (state = initialCartState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.ADD_TO_CART:
			const existingProductIndex = state.cartItems.findIndex((item) => item.id === payload.id);
			if (existingProductIndex !== -1) {
				const updatedCart = [...state.cartItems];
				updatedCart[existingProductIndex].quantity += 1;
				localStorage.setItem('cartItems', JSON.stringify(updatedCart));
				return { ...state, cartItems: updatedCart };
			} else {
				const newCartItems = [...state.cartItems, { ...payload, quantity: 1 }];
				localStorage.setItem('cartItems', JSON.stringify(newCartItems));
				return { ...state, cartItems: newCartItems };
			}

		case ACTION_TYPE.INCREASE_QUANTITY:
			const increasedCartItems = state.cartItems.map((item) => (item.id === payload ? { ...item, quantity: item.quantity + 1 } : item));
			localStorage.setItem('cartItems', JSON.stringify(increasedCartItems));
			return {
				...state,
				cartItems: increasedCartItems,
			};

		case ACTION_TYPE.DECREASE_QUANTITY:
			const decreasedCartItems = state.cartItems.map((item) => (item.id === payload ? { ...item, quantity: item.quantity - 1 } : item));
			localStorage.setItem('cartItems', JSON.stringify(decreasedCartItems));
			return {
				...state,
				cartItems: decreasedCartItems,
			};

		case ACTION_TYPE.REMOVE_FROM_CART:
			const updatedCartItems = state.cartItems.filter((item) => item.id !== payload);
			localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
			return {
				...state,
				cartItems: updatedCartItems,
			};
		default:
			return state;
	}
};
