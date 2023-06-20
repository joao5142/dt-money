import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
	NoDataText,
	PriceHighlight,
	TransactionsContainer,
	TransactionsTable,
	TransactionsTableContainer,
} from "./styles";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import { ITransaction } from "../../types/transactions-types";

import { priceFormatter } from "../../utils/formater";

import { useContextSelector } from "use-context-selector";
import { Dropdown } from "./components/Dropdown/index";
import { Alert } from "./components/Alert";
import { TransactionModal } from "../../components/TransactionModal";

import * as Dialog from "@radix-ui/react-dialog";

import { useState } from "react";

export function Transactions() {
	const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState(false);
	const [isModalEditTransactionOpen, setIsModalEditTransactionOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState<ITransaction>();

	const transactions = useContextSelector(TransactionsContext, (context) => {
		return context.transactions;
	});
	const deleteTransaction = useContextSelector(TransactionsContext, (context) => {
		return context.deleteTransaction;
	});

	function handleOpenDeleteAlert() {
		setIsAlertDeleteOpen(true);
	}

	function handleDeleteItem() {
		if (selectedTransaction?.id) {
			deleteTransaction(selectedTransaction.id);
		}
	}

	function handleEditItem() {
		setIsModalEditTransactionOpen(true);
	}

	return (
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />
				<TransactionsTableContainer>
					<TransactionsTable>
						{transactions.length > 0 ? (
							<tbody>
								{transactions.map((transaction) => {
									return (
										<tr key={transaction.id}>
											<td width="50%">{transaction.description}</td>
											<td>
												<PriceHighlight variant={transaction.type}>
													{transaction.type === "outcome" && "- "}
													{priceFormatter.format(transaction.price)}
												</PriceHighlight>
											</td>
											<td>{transaction.category}</td>
											<td>{formatDistance(new Date(), new Date(transaction.createdAt), { locale: ptBR })}</td>
											<td>
												<Dropdown
													onDelete={() => {
														setSelectedTransaction(transaction);
														handleOpenDeleteAlert();
													}}
													onEdit={() => {
														setSelectedTransaction(transaction);
														handleEditItem();
													}}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						) : (
							<>
								<NoDataText>Não foi encontrada nenhuma transação.</NoDataText>
							</>
						)}
					</TransactionsTable>
				</TransactionsTableContainer>
			</TransactionsContainer>
			<Alert
				open={isAlertDeleteOpen}
				onCloseAlert={() => setIsAlertDeleteOpen(false)}
				onProceed={() => {
					setIsAlertDeleteOpen(false);
					handleDeleteItem();
				}}
			/>
			{isModalEditTransactionOpen && (
				<Dialog.Root open={isModalEditTransactionOpen}>
					<Dialog.Trigger />
					<TransactionModal
						mode="update"
						transaction={selectedTransaction}
						onCloseModal={() => setIsModalEditTransactionOpen(false)}
					/>
				</Dialog.Root>
			)}
		</div>
	);
}
