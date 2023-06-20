import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  AlertContainer,
  AlertContent,
  AlertOverlay,
  AlertPortal,
  ButtonsContainer,
  CancelButton,
  ProceedButton,
} from "./styles";
import { ReactNode } from "react";

interface AlertProps {
  open: boolean;
  onCloseAlert: () => void;
  onProceed: () => void;
}
export function Alert({ open, onCloseAlert, onProceed }: AlertProps) {
  return (
    <AlertContainer
      open={open}
      onOpenChange={(value) => console.log("mudou", value)}
    >
      <AlertPortal>
        <AlertOverlay />
        <AlertContent>
          <div>
            <AlertDialog.Title>
              Tem certeza que deseja prosseguir?
            </AlertDialog.Title>
            <AlertDialog.Description>
              Essa ação pode ser irreversivel.
            </AlertDialog.Description>
            <ButtonsContainer>
              <AlertDialog.Cancel asChild>
                <CancelButton onClick={onCloseAlert}>Cancelar</CancelButton>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <ProceedButton onClick={onProceed}>Sim</ProceedButton>
              </AlertDialog.Action>
            </ButtonsContainer>
          </div>
        </AlertContent>
      </AlertPortal>
    </AlertContainer>
  );
}
