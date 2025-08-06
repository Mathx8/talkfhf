import styled from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    padding: 20px;

    @media (max-width: 480px) {
        padding: 20px 6px;
    }
`;

export const Topo = styled.div`
    display: flex;
    background: ${({ theme }) => theme.text2};
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    position: relative;
    gap: 24px;
    flex-wrap: wrap;
`;

export const Avatar = styled.img`
    width: 96px;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
    background: #e63946;
    background: linear-gradient(135deg, rgba(230, 57, 70, 1) 5%, rgba(236, 105, 115, 1) 25%, rgba(230, 57, 70, 1) 50%, rgba(236, 105, 115, 1) 100%, rgba(230, 57, 70, 1) 75%);

    @media (max-width: 480px) {
        width: 72px;
    }
`;

export const Info = styled.div`
    flex: 1;
    color: ${({ theme }) => theme.text};

    h2 {
        margin: 0;
        font-size: 28px;
        color: #e63946;

        @media (max-width: 768px) {
            font-size: 18px;
        }

        @media (max-width: 480px) {
            font-size: 14px;
        }
    }

    p {
        margin: 6px 0;
        font-size: 16px;
        color: ${({ theme }) => theme.text};

        @media (max-width: 768px) {
            font-size: 12px;
        }

        @media (max-width: 480px) {
            font-size: 10px;
        }
      
        img {
            width: 18px;
            height: 12px;
            object-fit: contain;
            vertical-align: middle;
        }
    }

    a {
        color: #60a5fa;
        text-decoration: none;
    }
`;

export const Estatisticas = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
`;

export const CardEstatistica = styled.div`
    background: ${({ theme }) => theme.text2};
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    color: ${({ theme }) => theme.text};

    h4 {
        margin-bottom: 8px;
        font-size: 14px;
        color: #e63946;
    }

    span {
        font-size: 18px;
        font-weight: bold;
        color: ${({ theme }) => theme.text};
    }
`;

export const MediaBox = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    text-align: center;
    background: transparent;
    border: 1px solid #f9597b;
    color: #f9597b;
    padding: 8px 14px;
    border-radius: 10px;
    font-weight: bold;

    @media (max-width: 480px) {
        right: 10px;
        top: 10px;
        font-size: 12px;
        padding: 6px 10px;
    }
`;

export const ContainerTime = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`

export const Time = styled.img`
    padding: 8px 14px;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    object-fit: contain;
    background: linear-gradient(135deg, rgba(230, 57, 70, 1) 5%, rgba(236, 105, 115, 1) 25%, rgba(230, 57, 70, 1) 50%, rgba(236, 105, 115, 1) 95%, rgba(230, 57, 70, 1) 75%);

    @media (max-width: 480px) {
        width: 20px;
        height: 20px;
    }
`;

export const PremiosContainer = styled.div`
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    max-width: 300px;
    justify-content: flex-end;
    gap: 0.5rem;
    z-index: 2;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    @media (max-width: 480px) {
        right: 10px;
        bottom: 10px;
        flex-wrap: wrap;
        max-width: 100%;
    }
`;

export const PremioItem = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    background: linear-gradient(135deg,rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 40%, rgba(236, 105, 115, 1) 60%, rgba(230, 57, 70, 1) 100%);
    color: ${({ theme }) => theme.text2};
    padding: 4px 7px;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    border: 2px solid #f9597b;

    @media (max-width: 768px) {
        font-size: 8px;
        width: 70px;
    }

    @media (max-width: 480px) {
        width: 50px;
        font-size: 6px;
    }
`;