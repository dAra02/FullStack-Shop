import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Error, H2, Loader, PrivateContent } from '../../components';
import { useMatch, useParams } from 'react-router-dom';
import { RESET_TOVAR_DATA, addToCart, loadTovarAsync } from '../../actions';
import { selectTovar } from '../../selectors';
import { TovarForm } from './components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const TovarContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const isEditing = !!useMatch('/admin/:id/edit');
	const isCreating = !!useMatch('/admin/tovar');
	const tovar = useSelector(selectTovar);

	useLayoutEffect(() => {
		dispatch(RESET_TOVAR_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadTovarAsync(params.id)).then((tovarData) => {
			setError(tovarData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	const handleAddToCart = () => {
		dispatch(addToCart(tovar));
	};
	const { imageUrl, title, price, content } = tovar;

	if (isLoading) {
		return <Loader />;
	}

	const SpecificTovarPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<TovarForm tovar={tovar} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<div className="info">
					<img src={imageUrl} alt="foto" />
					<H2>{title}</H2>
					<div className="price">
						Цена: {price} руб.
						<Button width="135px" onClick={handleAddToCart}>
							Купить
						</Button>
					</div>

					<div className="tovar-text">
						<span>Описание:</span>
						<div>{content}</div>
					</div>
				</div>
			</div>
		);

	return error ? <Error error={error} /> : SpecificTovarPage;
};

export const Tovar = styled(TovarContainer)`
	margin: 40px 25px;
	padding: 0 25px 25px;
	background: #eee;
	border: 10px solid orange;
	border-radius: 50px;

	& button {
		border-radius: 15px;
		width: 135px;
		height: 45px;
		background: #bbf8bb;
		border: 4px solid orange;
		font-size: 20px;
		font-weight: bold;
	}

	& button:hover {
		background-color: #66cc66;
		color: #ffffff;
	}

	& img {
		width: 230px;

		float: left;
		border: 10px solid orange;
		padding: 5px;
		border-radius: 25px;
		margin: 0 20px 10px 0;
	}
	& span {
		font-size: 24px;
		font-weight: 500;
	}

	& .price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 500;
	}

	& .tovar-text {
		font-size: 20px;
		white-space: pre-line;
		margin: 20px 0 0 0;
	}

	.info {
		padding: 0 0 15px 0;
	}
`;
