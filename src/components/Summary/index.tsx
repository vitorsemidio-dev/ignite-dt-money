import { useMemo } from "react";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { numberFormatCurrencyPtBr } from "../../utils";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const { type } = transaction;

        if (type === "deposit") {
          acc.deposits += transaction.amount;
        } else if (type === "withdraw") {
          acc.withdraws += transaction.amount;
        }

        acc.total = acc.deposits - acc.withdraws;

        return acc;
      },
      {
        deposits: 0,
        withdraws: 0,
        total: 0,
      },
    );
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{numberFormatCurrencyPtBr(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong> - {numberFormatCurrencyPtBr(summary.withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{numberFormatCurrencyPtBr(summary.total)}</strong>
      </div>
    </Container>
  );
}
