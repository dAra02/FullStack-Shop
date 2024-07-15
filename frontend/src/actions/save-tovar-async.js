import { request } from '../utils/request';
import { setTovarData } from './set-tovar-data';

export const saveTovarAsync = (id, newTovarData) => (dispatch) => {
	const saveRequest = id ? request(`/tovary/${id}`, 'PATCH', newTovarData) : request('/tovary', 'POST', newTovarData);

	return saveRequest.then((updatedTovar) => {
		dispatch(setTovarData(updatedTovar.data));

		return updatedTovar.data || updatedTovar;
	});
};
