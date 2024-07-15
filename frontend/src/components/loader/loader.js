import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="loader"></div>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60vh;

	.loader {
		width: 48px;
		height: 48px;
		border: 5px solid #403f3f;
		border-bottom-color: #ff3d00;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
