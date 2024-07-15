import { ACTION_TYPE } from './action-type';

export const setTovarData = (tovarData) => ({
	type: ACTION_TYPE.SET_TOVAR_DATA,
	payload: tovarData,
});
