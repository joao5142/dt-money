import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;

    border: 0;
    border: 1px solid transparent;

    border-radius: 6px;
    min-height: 54px;

    background: ${(props) => props.theme["gray-900"]};

    color: ${(props) => props.theme["green-300"]};

    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    border: 1px solid ${(props) => props.theme["green-300"]};

    border-radius: 6px;
    padding: 1rem;

    background: transparent;

    font-weight: bold;
    color: ${(props) => props.theme["green-300"]};

    cursor: pointer;

    &:disabled {
      opacity: 0.6;

      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      background: ${(props) => props.theme["green-500"]};

      border: 1px solid ${(props) => props.theme["green-500"]};

      color: ${(props) => props.theme["white"]};

      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }

  @media screen and (max-width: 400px) {
    & {
      flex-direction: column;
    }
  }
`;
