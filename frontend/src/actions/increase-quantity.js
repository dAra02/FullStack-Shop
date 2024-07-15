import { ACTION_TYPE } from './action-type';

export const increaseQuantity = (productId) => {
	return {
		type: ACTION_TYPE.INCREASE_QUANTITY,
		payload: productId,
	};
};
