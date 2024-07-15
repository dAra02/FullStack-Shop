import { ACTION_TYPE } from './action-type';

export const decreaseQuantity = (productId) => {
	return {
		type: ACTION_TYPE.DECREASE_QUANTITY,
		payload: productId,
	};
};
