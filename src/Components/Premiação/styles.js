import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 22px 0px;
`;

export const TituloContainer = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const Titulo = styled.h1`
    font-size: 16px;
    color: ${({ theme }) => theme.text};
`;

export const CardPremiacao = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.header};
    border-radius: 16px;
    padding: 12px 24px;
    gap: 1rem;
    box-shadow: 0 0 8px ${({ theme }) => theme.shadow};
`;

export const CompeticaoTitulo = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    text-transform: uppercase;
    padding: 8px 0;
    cursor: pointer;
    width: 100%;
    position: relative;

    &:hover {
        background-color: ${({ theme }) => theme.bodyAlt};
    }

    &.aberta::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: ${({ theme }) => theme.text};
    }

    svg {
        font-size: 16px;
        transition: transform 0.3s ease;
    }
`;

export const Secao = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 920px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 12px;
    }
`;

export const JogadorItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #e63946, #ec6973, #e63946);
    padding: 10px 14px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const CampeaoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: linear-gradient(135deg,rgba(236, 105, 115, 1) 5%, rgba(230, 57, 70, 1) 35%, rgba(230, 57, 70, 1) 65%, rgba(236, 105, 115, 1) 100%);
    border: 1px solid ${({ theme }) => theme.text2};
    padding: 10px 14px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const JogadoresCampeoes = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.4);
        border-radius: 4px;
    }

    @media (max-width: 480px) {
        flex-wrap: wrap;
        overflow-x: visible;
    }
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
`;

export const Label = styled.div`
    font-size: 12px;
    color: #facc15;
`;

export const JogadorNome = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    font-family: "Caveat", cursive;
    font-weight: 500;
`;

export const TopContainer = styled.div`
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #e63946, #ec6973, #e94f5cff, #ec6973, #e63946);
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    padding: 16px 16px 16px 0;
`;

export const TopTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 2rem;
    height: 100%;
    padding: 16px 0;
    border-radius: 12px 0 0 12px;
    margin-right: 20px;
    font-size: 16px;
    background: #e63946;
    color: ${({ theme }) => theme.text};
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    
    span {
        display: block;
        text-align: center;
    }
`;


export const TopRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    flex: 1;
`;

export const TopCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const TopAvatar = styled.img`
    width: 64px;
    height: 110px;
    image-rendering: pixelated;
    filter: ${({ theme }) => theme.borderDestaque};

    @media (max-width: 490px) {
        width: 60px;
        height: 60px;
    }
`;

export const TopPosition = styled.div`
    font-size: 16px;
    color: #facc15;
    font-weight: bold;
    font-style: italic;

        @media (max-width: 490px) {
        font-size: 12px;
    }
`;

export const TopName = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.text};
    text-align: center;
    word-break: break-word;
    font-family: "Caveat", cursive;

    @media (max-width: 490px) {
        font-size: 10px;
    }
`;