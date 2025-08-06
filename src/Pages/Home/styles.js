import styled, { keyframes } from "styled-components";
import Brigends from '../../Fonts/Brigends-Expanded.otf';

const mudarFonte = keyframes`
  0% {
    font-family: 'Orbitron', sans-serif;
  }
  20% {
    font-family: 'Courier New', monospace;
  }
  40% {
    font-family: 'Roboto Mono', monospace;
  }
  60% {
    font-family: 'DotGothic16', monospace;
  }
  80% {
    font-family: 'Anton', sans-serif;
  }
  100% {
    font-family: 'Inconsolata', monospace;
  }
`;

export const ContainerInicial = styled.div`
    @font-face {
      font-family: 'Brigends';
      src: url(${Brigends}) format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    height: 100vh;
    background-color: ${({ theme }) => theme.body};
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 4rem;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    cursor: none;

    @media (max-width: 768px) {
      padding: 0 1.5rem;
      justify-content: center;
    }

    @media (max-width: 480px) {
      padding: 0 1rem;
      justify-content: center;
      gap: 2rem;
    }

        @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
`;

export const TextoEsquerda = styled.div`
  flex: 1;
  padding-right: 2rem;
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-family: 'Brigends';
  animation: slideInLeft 1s ease forwards, ${mudarFonte} 6s infinite;
  transition: text-transform 0.3s ease;

  h3 {
    margin: 0;
    text-align: left;
    cursor: none;
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1.5rem;
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    top: 0.8rem;
    left: 1rem;
    font-size: 0.8rem;
    text-align: left;
  }
`;

export const ImagemCentral = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
    animation: slideInRight 1s ease forwards;

    img {
      height: 80vh;
      max-width: 90vw;
      image-rendering: pixelated;
    }

    @media (max-width: 480px) {
      img {
        height: 250px;
      }
    }
`;