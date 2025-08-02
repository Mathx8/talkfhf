import styled from "styled-components";

export const TabelaContainer = styled.div`
    margin-top: 2rem;
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #333;
`;

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #121212;
    color: white;
    font-family: monospace;

    th, td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #333;
        white-space: pre-line;
    }

    th {
        background-color: #1f1f1f;
        color: #e63946;
        font-weight: bold;
    }

    tr:hover td {
        background-color: #1a1a1a;
    }
`;

export const BotaoAcao = styled.button`
    background: none;
    border: none;
    color: ${({ cor }) => cor || "#fff"};
    cursor: pointer;
    font-size: 1.1rem;
    margin-right: 0.5rem;

    &:hover {
        transform: scale(1.1);
    }
`;
