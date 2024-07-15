import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>
				<div className="nameShop">PC config</div>
				<div>Связаться с нами:</div>
				<div>pc-config@mail.ru</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: #f2ae27;
	box-shadow: 0px 2px 17px #000;

	& .nameShop {
		margin-bottom: 15px;
		font-size: 22px;
	}
`;
