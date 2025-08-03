import styled from "styled-components";

export const Container = styled.div`
  padding: 0 0.8rem;
`;

export const TituloPagina = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const LayoutPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ColunaGrupos = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

export const ColunaRodadas = styled.div`
  flex: 1;
`;

export const LayoutSecundario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TransmissaoContainer = styled.div`
  background: #e63946;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
  box-shadow: 0 0px 8px ${({ theme }) => theme.shadow};

  h4 {
      color: ${({ theme }) => theme.text2};
  }
`;

export const YoutubeButton = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.text};
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.header};
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px #00000088;
    color: #e63946;
  }
`;