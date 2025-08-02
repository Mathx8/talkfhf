import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background-color: #1f1f1f;
  color: white;
  font-family: monospace;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 0 10px hsl(355, 77.60%, 56.30%, 0.50);
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: white;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: white;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ cor }) => cor || "#e63946"};
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};

  &:hover {
    opacity: ${({ disabled }) => disabled ? 0.6 : 0.85};
  }
`;

export const Mensagem = styled.div`
  margin-top: 1rem;
  color: ${({ erro }) => (erro ? "#ff4d4d" : "#00ff88")};
`;

export const FormTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #e63946;
  border-bottom: 1px solid #e63946;
  padding-bottom: 0.5rem;
`;

export const SelectMultiplo = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: white;
  height: 200px;
  overflow-y: auto;
`;

export const JogadorOption = styled.option`
  color: ${(props) => (props.$jaPertence ? "#00ff88" : "white")};
  font-weight:${(props) => (props.$jaPertence ? "bold" : "normal")};
  background-color: ${(props) => (props.$jaPertence ? "#003322" : "#1a1a1a")};
`;

export const LogoTime = styled.img`
  width: 40px;
  height: 40px;
  object-fit: scale-down;
  background-color: transparent;
`;

export const SemLogo = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #aaa;
  background-color: transparent;
`;

export const ListaSelecionados = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin-top: 1rem;
`;

export const ItemSelecionado = styled.li`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.9rem;
`;

export const NomeJogador = styled.span`
  margin-right: 0.5rem;
  color: #fff;
  white-space: nowrap;
`;

export const BotaoRemover = styled.button`
  background: none;
  color: #ff4d4d;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;