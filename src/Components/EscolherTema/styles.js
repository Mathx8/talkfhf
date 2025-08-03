import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const EscolhaBox = styled.div`
    background: #e63946;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
`;

export const Titulo = styled.h2`
    font-size: 1.5rem;
    color: #000;
`;

export const BotaoTema = styled.button`
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 8px;
    background-color: ${({ modo }) => (modo === "dark" ? "black" : "white")};
    color: ${({ modo }) => (modo === "dark" ? "white" : "black")};
    cursor: pointer;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: ${({ modo }) =>
        modo === "dark" ? "#222" : "#ddd"};
    }
`;