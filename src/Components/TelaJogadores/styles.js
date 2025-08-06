import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    padding: 24px;
`;

export const TituloContainer = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const SearchInput = styled.input`
    padding: 8px 12px;
    margin-bottom: 16px;
    background: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 98.5%;
`;

export const JogadorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
`

const shine = keyframes`
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
`;

export const JogadorCard = styled.div`
    flex: 1 1 10%;
    min-width: 140px;
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    background: linear-gradient(
      135deg,
      #e63946,
      #ec6973,
      #e63946,
      #ec6973,
      #e63946
    );
    background-size: 300% 300%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.text};
      transform: scale(1.03);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      animation: ${shine} 1.2s linear infinite;
    }
`;

export const Avatar = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: contain;
    margin-bottom: 8px;

    ${JogadorCard}:hover & {
        width: 80px;
        height: 80px;
        border-radius: 0;
    }
`;

export const Nome = styled.div`
    font-weight: bold;
    font-size: 16px;

    ${JogadorCard}:hover & {
        display: none;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: linear-gradient(
      135deg,
      rgba(230, 57, 70, 1) 5%,
      rgba(236, 105, 115, 1) 25%,
      rgba(230, 57, 70, 1) 50%,
      rgba(236, 105, 115, 1) 75%,
      rgba(230, 57, 70, 1) 100%
    );
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text2};
    border-radius: 16px;
    max-width: 1000px;
    width: 90%;
    position: relative;
    animation: fadeInScale 0.25s ease-out;

    @media (max-width: 480px) {
      padding: 24px 0px;
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      color: ${({ theme }) => theme.text2};
      border-radius: 50%;
      padding: 4px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
      }

      svg {
        width: 1.4rem;
        height: 1.4rem;
        display: block;
      }
    }

    .download-btn {
      position: absolute;
      top: 12px;
      right: 50px;
      cursor: pointer;
      color: ${({ theme }) => theme.text2};
      border-radius: 50%;
      padding: 4px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
      }

      svg {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
      }
  }
`;