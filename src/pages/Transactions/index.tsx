import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableContainer,
} from "./styles";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import { priceFormatter } from "../../utils/formater";

import { useContextSelector } from "use-context-selector";
import { Dropdown } from "./components/Dropdown/index";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  function handleDeleteItem(id: string) {}

  function handleEditItem(id: string) {}

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTableContainer>
          <TransactionsTable>
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
                    <td>
                      {formatDistance(
                        new Date(),
                        new Date(transaction.createdAt),
                        { locale: ptBR }
                      )}
                    </td>
                    <td>
                      <Dropdown
                        onDelete={() => handleDeleteItem(transaction.id)}
                        onEdit={() => handleEditItem(transaction.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TransactionsTable>
        </TransactionsTableContainer>
      </TransactionsContainer>
    </div>
  );
}
