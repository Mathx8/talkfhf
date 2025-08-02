import styled from "styled-components";

export const FooterContainer = styled.footer`
    position: relative;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.footer};
    padding: 1rem 2rem;
    font-family: 'Orbitron', sans-serif;
    box-shadow: 0 -2px 6px ${({ theme }) => theme.shadow};
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
`;

export const FooterSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        height: 30px;
        width: auto;
    }
`;

export const FooterText = styled.p`
    color: #e63946;
    font-size: 0.95rem;
`;

export const FooterButtons = styled.div`
    display: flex;
    gap: 10px;
`;

export const FooterButton = styled.a`
    display: flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 25%, rgba(233, 79, 92, 1) 50%, rgba(236, 105, 115, 1) 75%), rgba(230, 57, 70, 1) 100%;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #c72c3c;
      transform: translateY(-2px);
    }
`;

export const AvataresContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;

    img {
        height: 36px;
        width: auto;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 25%, rgba(233, 79, 92, 1) 50%, rgba(236, 105, 115, 1) 75%), rgba(230, 57, 70, 1) 100%;
        padding: 1px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;