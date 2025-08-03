import styled from "styled-components";
import cardBackground from "../../Image/cardFHF.png";

export const CampoFutebol = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: "Caveat", cursive;
`;

export const CampoSVG = styled.div`
    width: 90%;
    max-width: 1000px;
    aspect-ratio: 2 / 1;
    background-color: ${({ theme }) => theme.header};
    border: 4px solid #e63946;
    position: relative;
    box-shadow: 0 0 20px #e6394688;

    /* Linha central */
    &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        width: 2px;
        height: 100%;
        background: #e63946;
        transform: translateX(-50%);
    }

    /* Círculo central */
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 160px;
        height: 160px;
        margin-left: -80px;
        margin-top: -80px;
        border: 2px solid #e63946;
        border-radius: 50%;
        z-index: 1;

        @media (max-width: 768px) {
            width: 90px;
            height: 90px;
            margin-left: -45px;
            margin-top: -45px;
        }

        @media (max-width: 480px) {
            width: 60px;
            height: 60px;
            margin-left: -30px;
            margin-top: -30px;
        }
    }
`;

// Áreas
export const AreaEsquerda = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    width: 180px;
    height: 320px;
    margin-top: -160px;
    border: 2px solid #e63946;
    border-radius: 0 64px 64px 0;
    border-left: none;

    @media (max-width: 768px) {
        width: 80px;
        height: 180px;
        margin-top: -90px;
    }

    @media (max-width: 480px) {
        width: 40px;
        height: 100px;
        margin-top: -50px;
    }
`;

export const AreaDireita = styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    width: 120px;
    height: 320px;
    margin-top: -160px;
    border: 2px solid #e63946;
    border-radius: 64px 0 0 64px;
    border-right: none;

    @media (max-width: 768px) {
        width: 60px;
        height: 180px;
        margin-top: -90px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 80px;
        margin-top: -40px;
    }
`;

export const Titulo = styled.h1`
    font-size: 20px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const CardsLayout = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: "gk zag mid atk";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    padding: 10px;
    gap: 12px;
    z-index: 2;

    @media (max-width: 768px) {
        padding: 5px;
        gap: 6px;
    }

    @media (max-width: 480px) {
        padding: 5px;
        gap: 12px;
    }
`;

export const Linha = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media (max-width: 600px) {
        gap: 0;
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

export const LinhaGoleiro = styled(Linha)`
    grid-area: gk;
`;

export const LinhaZagueiro = styled(Linha)`
    grid-area: zag;
`;

export const LinhaMeio = styled(Linha)`
    grid-area: mid;
`;

export const LinhaAtaque = styled(Linha)`
    grid-area: atk;
`;

export const Card = styled.div`
    position: relative;
    width: 100px;
    height: 105px;
    background: url(${cardBackground}) no-repeat center/contain;
    background-size: 110px 130px;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: #fff;

    @media (max-width: 768px) {
        width: 80px;
        height: 90px;
        padding: 10px 8px;
        background-size: 80px 90px;
    }

    @media (max-width: 480px) {
        width: 38px;
        height: 48px;
        background-size: 38px 48px;
        padding: 0px 4px;
    }
`;

export const Posicao = styled.div`
    color: ${({ theme }) => theme.text2};
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: 20px;
    left: 10px;
    
    @media (max-width: 768px) {
        font-size: 7px;
        top: 22px;
    }

    @media (max-width: 480px) {
        font-size: 3px;
        top: 9px;
        left: 6px;
    }
`;

export const Bandeira = styled.div`
    position: absolute;
    top: 40px;
    left: 10px;

    img {
        width: 20px;
        height: 12px;
        display: block;
    }

    @media (max-width: 768px) {
        top: 36px;
        img {
            width: 16px;
            height: 8px;
            display: block;
        }
    }

    @media (max-width: 480px) {
        top: 16px;
        left: 6px;
        img {
            width: 6px;
            height: 4px;
            display: block;
        }
    }
`;

export const Time = styled.img`
    position: absolute;
    top: 60px;
    left: 10px;
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
        top: 50px;
    }

    @media (max-width: 480px) {
        width: 6px;
        height: 6px;
        left: 6px;
        top: 24px;
    }
`;

export const Avatar = styled.img`
    width: 80px;
    height: 80px;
    image-rendering: auto;
    position: absolute;
    bottom: 47px;
    right: 2px;

    @media (max-width: 768px) {
        width: 65px;
        height: 65px;
        bottom: 35px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
        top: 0;
    }
`;

export const Nome = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #e63946;
    width: 100%;
    text-align: center;
    margin-bottom: 6px;

    @media (max-width: 480px) {
        margin-bottom: 6px;
        font-size: 6px;
    }
`;

export const Navegacao = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;