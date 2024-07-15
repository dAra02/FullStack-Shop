import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TovarRowContainer = ({ className, id, imageUrl, title, price, categor, categorId, onTovarRemove }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<TableRow>
				<div className="image-url-columm">
					<img src={imageUrl} alt="фото" />
				</div>
				<div className="title-columm">{title}</div>
				<div className="categor-columm">{categor.map(({ id, name }) => (id === categorId ? name : ''))}</div>
				<div className="price-columm">{price} руб.</div>
			</TableRow>
			<Icon id="fa-pencil" margin="0 0 0 10px" onClick={() => navigate(`/admin/${id}/edit`)} />
			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onTovarRemove} />
		</div>
	);
};

export const TovarRow = styled(TovarRowContainer)`
	display: flex;
	margin-top: 10px;
	align-items: center;
	border: 1px solid #000;
	padding: 10px;
	border-radius: 25px;
	background: #bfbfbf;

	& img {
		border: 3px solid #000;
		width: 130px;
	}
`;
