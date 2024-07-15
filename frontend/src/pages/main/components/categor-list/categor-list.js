import styled from 'styled-components';

const CategorListContainet = ({ className, name, id, idCategor, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			{id === idCategor ? <span>{name}</span> : name}
		</div>
	);
};

export const CategorList = styled(CategorListContainet)`
	cursor: pointer;
	margin: 0 0 5px 0;
	font-size: 18px;
	font-weight: 500;

	& span {
		text-underline-offset: 4px;
		text-decoration: underline;
	}
`;
