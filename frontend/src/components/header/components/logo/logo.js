import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 50px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 10px;
`;

const SmallText = styled.div`
	font-size: 20px;
	font-weight: bold;
`;
const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-desktop" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>PC</LargeText>
			<SmallText>config</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -10px;
`;
