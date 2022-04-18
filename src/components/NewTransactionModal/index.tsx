import { FormEvent, useCallback, useState } from "react";
import ReactModal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { TransactionType, useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { addTransaction } = useTransactions();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const [type, setType] = useState<TransactionType>("deposit");

  const handleChangeType = useCallback((type: TransactionType) => {
    setType(type);
  }, []);

  const handleDepositType = useCallback(() => {
    handleChangeType("deposit");
  }, [handleChangeType]);

  const handleWithdrawType = useCallback(() => {
    handleChangeType("withdraw");
  }, [handleChangeType]);

  const setInitialFormValues = useCallback(() => {
    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
  }, []);

  const handleCreateNewTransaction = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await addTransaction({ title, amount, category, type });
        onRequestClose();
        setInitialFormValues();
      } catch (err) {
        console.log(err);
      }
    },
    [
      addTransaction,
      amount,
      category,
      title,
      type,
      onRequestClose,
      setInitialFormValues,
    ],
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content">
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={handleDepositType}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={handleWithdrawType}>
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
