import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TovarCardContainer = ({ className, id, title, imageUrl, price }) => {
	return (
		<div className={className}>
			<Link to={`/tovar/${id}`}>
				<div className="img">
					<img src={imageUrl} alt={title} />
				</div>
				<div className="tovar-card-footer">
					<h4>{title}</h4>
					<div className="tovar-card-info">
						<div className="publisshed-at">Цена: {price} руб.</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const TovarCard = styled(TovarCardContainer)`
	display: flex;
	flex-direction: column;
	width: 200px;
	margin: 20px;
	border: 3px solid #898585;

	& .img {
		align-items: center;
		height: 200px;
		display: flex;
	}

	& img {
		display: block;
		width: 100%;
	}
	& .tovar-card-footer {
		border-top: 3px solid #898585;
		padding: 5px;
	}
	& h4 {
		font-size: 14px;
		margin: 0;
	}
	& .tovar-card-info {
		font-size: 18px;
		font-weight: 500;
		margin-top: 10px;
	}
`;
