import styled from 'styled-components';
import { Logo, ControlPanel } from './components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<ControlPanel />
	</header>
);
export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #f2ae27;
	box-shadow: 0px -2px 17px #000;
	z-index: 10;
`;
