import { request } from '../utils/request';
import { setTovarData } from './set-tovar-data';

export const loadTovarAsync = (tovarId) => (dispatch) =>
	request(`/tovary/${tovarId}`).then((tovarData) => {
		if (tovarData.data) {
			dispatch(setTovarData(tovarData.data));
		}

		return tovarData;
	});
