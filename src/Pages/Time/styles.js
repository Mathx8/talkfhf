import styled from "styled-components";

export const Container = styled.div`
    padding: 24px;
    font-family: 'Segoe UI', sans-serif;
`;

export const Titulo = styled.h1`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    gap: 1rem;
    font-size: 28px;
    margin-bottom: 24px;
`;

export const JogadoresGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 20px;

    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(425px, 1fr));
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.header};
    box-shadow: 0 0 8px ${({ theme }) => theme.shadow};
    border-radius: 12px;
    padding: 16px;
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const Avatar = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 8px;
    object-fit: cover;
`;

export const Nome = styled.h3`
    font-size: 20px;
    margin: 0;
`;

export const Posicao = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
`;

export const Badge = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: 1px solid #f9597b;
    color: #f9597b;
    font-weight: bold;
    padding: 6px 10px;
    border-radius: 8px;
`;

export const Estatisticas = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
    gap: 0.5rem;
`;

export const Estat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg,rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 40%, rgba(236, 105, 115, 1) 60%, rgba(230, 57, 70, 1) 100%);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    width: 10%;
    text-align: center;

    @media (max-width: 600px) {
        width: 44%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;
