import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-4px);
    }
`;

export const CarregamentoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    width: 100%;
    gap: 1rem;
    border-radius: 16px;
    background: ${({ theme }) => theme.body};
`;

export const Giro = styled.div`
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #e63946;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ${rotate} 1s linear infinite;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
`;

export const Mensagem = styled.h1`
    font-size: 28px;
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
`;

export const PontinhosAnimados = styled.span`
    display: inline-flex;
    margin-left: 4px;

    span {
        display: inline-block;
        animation: ${bounce} 1s infinite;
        font-size: 28px;

        &:nth-child(1) {
        animation-delay: 0s;
        }

        &:nth-child(2) {
        animation-delay: 0.2s;
        }

        &:nth-child(3) {
        animation-delay: 0.4s;
        }
    }
`;