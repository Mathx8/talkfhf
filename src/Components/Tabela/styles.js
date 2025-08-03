import styled from "styled-components";

export const TabelaContainer = styled.div`
  background: transparent;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 0 6px ${({ theme }) => theme.shadow};
`;

export const Titulo = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.text2};
  background-color: #e63946;
  border-radius: 8px 8px 0 0;
  text-align: center;
  font-weight: 600;
`;

export const TabelaEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.text};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  font-size: 0.9rem;
`;

export const Cabecalho = styled.thead`
  background-color: #e63946;
  font-size: 0.85rem;
`;

export const Linha = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.header};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.footer};
  }

  ${({ $posicao }) => $posicao <= 2 && `
    border-left: 3px solid #e63946;
    td {
      font-weight: bold;
      color: #e63946;
    }
  `}
`;

export const CelulaCabecalho = styled.th`
  padding: 0.75rem 0.5rem;
  border: 1px solid #e63946;
  font-weight: 600;
`;

export const Celula = styled.td`
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.header};
`;