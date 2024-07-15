import { useEffect, useState } from 'react';
import { Button, PrivateContent, H2, Loader } from '../../components';
import { TovarRow, TableRow } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils/request';
import styled from 'styled-components';

const AdminContainer = ({ className }) => {
	const [tovary, setTovary] = useState([]);
	const [categor, setCategor] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [shouldUpdateTovarList, setShouldUpdateTovarList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request('/admin'), request('/categor')]).then(([tovaryRes, categorRes]) => {
			if (tovaryRes.error || categorRes.error) {
				setErrorMessage(tovaryRes.error || categorRes.error);
				return;
			}

			setTovary(tovaryRes.data);
			setCategor(categorRes.data);
			setIsLoading(false);
		});
	}, [shouldUpdateTovarList, userRole]);

	const onTovarRemove = (tovarId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					if (!checkAccess([ROLE.ADMIN], userRole)) {
						return;
					}
					request(`/tovary/${tovarId}`, 'DELETE').then(() => {
						setShouldUpdateTovarList(!shouldUpdateTovarList);
					});
					setIsLoading(true);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className="verhuska">
							<H2>Товары</H2>
							<Button width="195px" onClick={() => navigate('/admin/tovar')}>
								Добавить товар
							</Button>
						</div>
						<div>
							<TableRow>
								<div className="image-url-columm">Фото</div>
								<div className="title-columm">Название</div>
								<div className="categor-columm">Категория</div>
								<div className="price-columm">Цена</div>
							</TableRow>

							{tovary.map(({ id, title, imageUrl, price, categorId }) => (
								<TovarRow
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									price={price}
									categor={categor}
									categorId={categorId}
									onTovarRemove={() => onTovarRemove(id)}
								/>
							))}
						</div>
					</>
				)}
			</PrivateContent>
		</div>
	);
};

export const Admin = styled(AdminContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 680px;
	font-size: 18px;

	& .verhuska {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 116%;
	}

	& button {
		background: #dbaf3d;
		border-radius: 25px;
		height: 45px;
		font-size: 22px;
	}
`;
