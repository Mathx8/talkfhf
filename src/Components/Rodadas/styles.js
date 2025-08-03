import styled from "styled-components";

export const RodadaContainer = styled.div`
  background:#e63946;
  color: ${({ theme }) => theme.text};
  padding: 1.25rem;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0 0 8px ${({ theme }) => theme.shadow};
`;

export const Titulo = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1.25rem;
  color: ${({ theme }) => theme.text2};
  text-align: center;
  font-weight: 600;
`;

export const Navegacao = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const BotaoRodada = styled.button`
  background: ${({ $ativo, theme }) => ($ativo ? "linear-gradient(135deg, rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 25%, rgba(233, 79, 92, 1) 50%, rgba(236, 105, 115, 1) 75%), rgba(230, 57, 70, 1) 100%;" : theme.header)};
  color: ${({ theme }) => (theme.text)};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${({ $ativo, theme }) => ($ativo ? theme.text2 : theme.header)};
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const JogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Jogos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.header};
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
  }
`;

export const Time = styled.span`
  flex: 1;
  text-align: center;
  font-weight: ${({ $destaque }) => $destaque ? '600' : '400'};
  color: ${({ $destaque, theme }) => $destaque ? "#e63946" : theme.text};
  font-size: 0.95rem;
`;

export const Placar = styled.span`
  flex: 0.4;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;