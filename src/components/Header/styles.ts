import styled from "styled-components";

export const HeaderContainer = styled.header`
	background: ${({ theme }) => theme["gray-900"]};
	padding: 2.5rem 0rem 7.5rem;
`;

export const HeaderContent = styled.div`
	width: 100%;
	max-width: 1120px;
	margin: 0 auto;
	padding: 0 1.5rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const NewTransactionButton = styled.button`
	height: 50px;
	padding: 0 1.25rem;

	color: ${(props) => props.theme["white"]};
	font-weight: bold;

	background: ${(props) => props.theme["green-500"]};

	cursor: pointer;

	border-radius: 6px;
	border: 0;

	&:hover {
		background: ${(props) => props.theme["green-700"]};

		transition: background-color 0.5s;
	}
`;
