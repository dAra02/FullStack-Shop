import { useDispatch, useSelector } from 'react-redux';
import { H2 } from '../../components';
import { CartList } from './components';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../actions';
import { selectCart } from '../../selectors';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const cartItems = useSelector(selectCart);
	const dispatch = useDispatch();

	const handleIncreaseQuantity = (productId) => {
		dispatch(increaseQuantity(productId));
	};

	const handleDecreaseQuantity = (productId) => {
		dispatch(decreaseQuantity(productId));
	};

	const onDeleteTovaryCart = (id) => {
		dispatch(removeFromCart(id));
	};

	const getTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const getTotalQuantity = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	return (
		<div className={className}>
			<H2>Корзина</H2>
			<div className="obortca">
				{cartItems.length > 0 ? (
					<>
						<div>
							{cartItems.map(({ id, title, quantity, imageUrl, price }) => (
								<CartList
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									quantity={quantity}
									price={price}
									handleIncreaseQuantity={handleIncreaseQuantity}
									handleDecreaseQuantity={handleDecreaseQuantity}
									onClick={() => onDeleteTovaryCart(id)}
								/>
							))}
						</div>

						<div className="block-itog">
							<div className="summa">
								<span>Итого </span>
								{getTotalPrice()}
								<span> руб.</span>
							</div>
							<div className="counter">
								<span>Всего товаров: </span>
								{getTotalQuantity()}
								<span> шт.</span>
							</div>
						</div>
					</>
				) : (
					<div className="no-tovar-cart">Корзина пуста</div>
				)}
			</div>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 810px;
	font-size: 18px;

	& .obortca {
		display: flex;
	}

	& .summa {
		margin: 0 0 25px 0;
	}

	& .block-itog {
		width: 200px;
		height: 170px;
		margin: 0 0 0 25px;
		border: 1px solid #000;
		border-radius: 25px;
		background: #bfbfbf;
		padding: 25px 0 0 10px;
		font-size: 18px;
	}

	& .no-tovar-cart {
		font-size: 35px;
		margin: 25px auto;
		color: #cfc5c5;
	}
`;
