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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, ${({ theme }) => theme.footer};, ${({ theme }) => theme.body});
`;

export const Giro = styled.div`
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #e63946;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: ${rotate} 1s linear infinite;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    margin-bottom: 20px;
`;

export const Mensagem = styled.h1`
    font-size: 28px;
    color: #e63946;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
`;

export const PontinhosAnimados = styled.span`
    display: inline-block;
    margin-left: 4px;
    animation: ${bounce} 1s infinite;
`;

export const SubMensagem = styled.p`
    font-size: 16px;
    color: #e63946;
    margin-top: 8px;
    font-style: italic;
`;