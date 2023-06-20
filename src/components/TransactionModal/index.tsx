import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useEffect } from "react";

const NewTransactionFormSchema = zod.object({
	id: zod.string(),
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(["income", "outcome"]),
	createdAt: zod.string(),
});

type NewTransactionFormInputsType = zod.infer<typeof NewTransactionFormSchema>;

interface TransactionModalProps {
	mode: "create" | "update";
	transaction?: NewTransactionFormInputsType;
	onCloseModal?: () => void;
}

export function TransactionModal({ mode, transaction, onCloseModal }: TransactionModalProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<NewTransactionFormInputsType>({
		resolver: zodResolver(NewTransactionFormSchema),

		defaultValues: {
			type: "income",
			id: "",
			createdAt: "",
		},
	});

	const createTransaction = useContextSelector(TransactionsContext, (context) => {
		return context.createTransaction;
	});

	const updateTransaction = useContextSelector(TransactionsContext, (context) => {
		return context.updateTransaction;
	});

	async function handleFormTransaction(data: NewTransactionFormInputsType) {
		if (mode === "create") {
			createTransaction(data);
			reset();
		} else {
			updateTransaction(data);
		}
	}

	useEffect(() => {
		if (transaction) {
			reset(transaction);
		}
	}, [transaction, reset]);

	return (
		<Dialog.Portal>
			<Overlay />

			<Content>
				<Dialog.Title>{mode === "create" ? "Nova Transação" : "Editar Transação"}</Dialog.Title>

				<CloseButton onClick={onCloseModal}>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleFormTransaction)}>
					<input type="text" placeholder="Descrição" required {...register("description")} />
					<input type="number" placeholder="Preço" required {...register("price", { valueAsNumber: true })} />
					<input type="text" placeholder="Categoria" required {...register("category")} />
					<Controller
						control={control}
						name="type"
						render={({ field }) => {
							return (
								<TransactionType onValueChange={field.onChange} value={field.value}>
									<TransactionTypeButton value="income" type="button" variant="income">
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionTypeButton>
									<TransactionTypeButton value="outcome" type="button" variant="outcome">
										<ArrowCircleDown size={24} />
										Saída
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button disabled={isSubmitting} type="submit">
						{mode === "create" ? "Cadastrar" : "Salvar Alterações"}
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
}
