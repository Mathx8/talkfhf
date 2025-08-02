import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContainerEstatisticas = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    justify-content: center;
    justify-items: center;
    margin-top: 20px;

    @media (max-width: 1322px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1323px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 670px) {
      grid-template-columns: repeat(1, 1fr);
    }
`;

export const TituloContainer = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const CategoriaBox = styled.div`
    background: linear-gradient(145deg,rgba(230, 57, 70, 1) 5%, rgba(236, 105, 115, 1) 30%, rgba(236, 105, 115, 1) 70%, rgba(230, 57, 70, 1) 100%);
    border-radius: 8px;
    padding: 16px;
    width: 88%;
    min-height: 320px;
    color: #000;
    box-shadow: 0 0 8px ${({ theme }) => theme.shadow};
`;

export const Titulo = styled.h3`
    display: flex;
    justify-content: flex-start;
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    margin-bottom: 12px;
    border-bottom: 1px solid #000;
    padding-bottom: 6px;

    img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-right: 0.4rem;
      filter: ${({ theme }) => theme.filter};
      }
`;

export const Lista = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const JogadorItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #2a2a2a;

    ${({ destaque }) => destaque === 0 && css`
      border-left: 4px solid gold;
      font-weight: bold;
    `}
    ${({ destaque }) => destaque === 1 && css`
      border-left: 4px solid silver;
      font-weight: bold;
    `}
    ${({ destaque }) => destaque === 2 && css`
      border-left: 4px solid bronze;
      font-weight: bold;
    `}

    &:last-child {
      border-bottom: none;
    }
`;

export const Nome = styled.span`
    color: ${({ theme }) => theme.text};
    padding-left: 0.2rem;
    font-size: ${({ destaque }) => (destaque === 0 ? "15px" : "14px")};
    font-weight: ${({ destaque }) => (destaque === 0 ? "600" : "normal")};
`;

export const Valor = styled.span`
    font-weight: bold;
    border-radius: 12px;
    padding: 2px 8px;
    font-size: ${({ destaque }) => (destaque === 0 ? "14px" : "13px")};
    color: #000;

    ${({ tipo }) => {
    switch (tipo) {
      case "gols":
        return css`background-color: #fff;`;
      case "assistencias":
        return css`background-color: #fff;`;
      case "cleansheets":
        return css`background-color: #3c5be7ff;`;
      case "mvps":
        return css`background-color: #facc15;`;
      default:
        return css`background-color: #fff;`;
    }
  }}
`;