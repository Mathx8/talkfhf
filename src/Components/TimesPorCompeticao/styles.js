import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    padding: 20px;
    font-family: 'Segoe UI', sans-serif;
`;

export const CompeticaoContainer = styled.div`
    margin-bottom: 40px;
`;

export const CompeticaoTitulo = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const TimesGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const shine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const TimeCard = styled.div`
    flex: 1 1 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        135deg,
        #e63946,
        #ec6973,
        #e63946,
        #ec6973,
        #e63946
    );
    background-size: 300% 300%;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        cursor: pointer;
        border: 1px solid ${({ theme }) => theme.text};
        transform: scale(1.03);
        justify-content: space-between;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        animation: ${shine} 1.2s linear infinite;
    }
`;

export const LogoTime = styled.img`
    width: 48px;
    height: 48px;
    image-rendering: auto;
`;

export const NomeTime = styled.h3`
    margin: 12px 0;
    font-size: 0;
    color: ${({ theme }) => theme.text};

    ${TimeCard}:hover & {
        font-size: 20px;
    }
`;