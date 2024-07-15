import styled from 'styled-components';
import { Button, Icon } from '../../../../components';

const CartListContainer = ({ className, title, id, imageUrl, quantity, price, onClick, handleIncreaseQuantity, handleDecreaseQuantity }) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt="foto" />
			<div className="obortca">
				<div className="info">
					<div className="text">{title}</div>
					<div className="count">
						<Button disabled={quantity === 1} onClick={() => handleDecreaseQuantity(id)}>
							-
						</Button>
						<div className="count-text">{quantity}</div>
						<Button onClick={() => handleIncreaseQuantity(id)}>+</Button>
					</div>
				</div>
				<div className="price">Цена: {price * quantity} руб.</div>
			</div>
			<Icon id="fa-trash-o" margin="0 0 84px 0" onClick={onClick} />
		</div>
	);
};

export const CartList = styled(CartListContainer)`
	display: flex;
	margin-top: 10px;
	align-items: center;
	border: 1px solid #000;
	padding: 10px;
	border-radius: 25px;
	background: #bfbfbf;

	& .obortca {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}

	& img {
		border: 3px solid #000;
		width: 130px;
	}

	& .text {
		margin: 0 0 42px 0px;
	}

	& .info {
		width: 430px;
		display: flex;
		flex-direction: column;
		padding: 0 0 0 25px;
	}

	& .count {
		display: flex;
		width: 125px;
		align-items: center;
	}

	& .price {
		width: 160px;
	}

	& .count-text {
		width: 100%;
		height: 32px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		background-color: #eee;
		border-top: 1px solid #000;
		border-bottom: 1px solid #000;
	}
`;
