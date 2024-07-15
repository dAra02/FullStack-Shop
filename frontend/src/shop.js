import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header, Footer, Modal, Error } from './components';
import { Admin, Authorization, Cart, Main, Registration, Tovar } from './pages';
import { setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppColumm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 40px;
`;

export const Shop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<AppColumm>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/admin/:id/edit" element={<Tovar />} />
					<Route path="/admin/tovar" element={<Tovar />} />
					<Route path="/tovar/:id" element={<Tovar />} />
					<Route path="/corzina" element={<Cart />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumm>
	);
};
