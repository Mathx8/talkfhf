import styled from "styled-components";

export const ContainerChave = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.8rem;
  font-family: 'Segoe UI', sans-serif;
`;

export const ContainerUpperAndLower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 2rem;
  padding: 1.5rem 1rem;
  background-color: none;
  position: relative;
`;

export const RotuloVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.text2};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 0.6rem 0.3rem;
  gap: 0.1rem;
  position: sticky;
  left: 0;
  z-index: 5;
  height: 100%;
  user-select: none;

  div {
    line-height: 1.1;
  }
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.highlight};
  cursor: grab;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &.grabbing {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DragArea = styled.div`
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const Coluna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-width: 300px;
  position: relative;
`;

export const Coluna2 = styled(Coluna)`
  gap: 8rem;
`;

export const TituloSecao = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
  margin-left: 0.5rem;
  margin-bottom: 20px;
`;

export const RodadasHeader = styled.div`
  display: flex;
  gap: 6rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
  width: 100%;
`;

export const NomeRodada = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  min-width: 240px;
`;

export const Partida = styled.div`
  background-color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text2};
  border-radius: 8px;
  width: 180px;
  position: relative;
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
    box-shadow: 0 4px 12px #00000088;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
  }
`;

export const PartidaFinal = styled(Partida)``;

export const BoxPlacar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
  border: 1px solid ${({ theme }) => theme.text2};
  gap: 0.1rem;
`;

export const LinhaResultado = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $hovered, theme }) =>
    $hovered ? "#F08890" : theme.text2};
  transition: background-color 0.2s ease;
`;

export const LogoTime = styled.img`
  width: 21px;
  height: 21px;
  object-fit: contain;
  margin-right: 0.5rem;
  padding: 0;
`;

export const NomeTime = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.85rem;
  border-left: 1px solid ${({ theme }) => theme.text};
  border-right: 1px solid ${({ theme }) => theme.text};
  padding: 0;
`;

export const Placar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $vencedor, theme }) => ($vencedor ? "#e63946" : theme.text)};
  font-weight: bold;
  font-size: 0.95rem;
  padding: 0.2rem 0.6rem;
  min-width: 22px;

`;