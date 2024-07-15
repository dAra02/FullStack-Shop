import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => <div className={className}>{children}</div>;

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};

	& > div {
		display: flex;
		justify-content: center;
	}

	& .image-url-columm {
		width: 180px;
	}

	& .title-columm {
		width: 260px;
	}

	& .categor-columm {
		width: 200px;
	}

	& .price-columm {
		text-align: center;
		width: 115px;
	}
`;
