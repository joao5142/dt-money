import styled from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const AlertContainer = styled(AlertDialog.Root)`
  position: absolute;
  inset: 0;

  z-index: 3;
`;

export const AlertPortal = styled(AlertDialog.Portal)``;

export const AlertContent = styled(AlertDialog.Content)`
  position: fixed;
  inset: 0;
  display: flex;

  align-items: center;
  justify-content: center;
  z-index: 3;
`;

export const AlertOverlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.8);

  z-index: 1;
`;

const BaseButton = styled.button`
  background: ${(props) => props.theme["gray-700"]};

  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border-radius: 6px;
  border: 0;

  cursor: pointer;

  color: ${(props) => props.theme["gray-300"]};
`;
export const CancelButton = styled(BaseButton)`
  background: ${(props) => props.theme["red-500"]};

  border: 1px solid ${(props) => props.theme["red-500"]};
`;

export const ProceedButton = styled(BaseButton)``;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  margin-top: 2rem;
`;
