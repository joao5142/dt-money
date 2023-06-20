import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { TransactionModal } from "../TransactionModal";

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova transação</NewTransactionButton>
					</Dialog.Trigger>
					<TransactionModal mode="create" />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
