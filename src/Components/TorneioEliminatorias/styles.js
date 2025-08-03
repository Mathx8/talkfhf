import styled from "styled-components";

export const TorneioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e63946;
  border-radius: 12px;
  padding: 2rem;
  overflow-x: auto;
  color: white;
  box-shadow: 0 0 8px ${({ theme }) => theme.shadow};
`;

export const FasesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

export const ColunaFase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
`;

export const ColunaCentral = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-width: 200px;
`;

export const PartidaContainer = styled.div`
  background: ${({ theme }) => theme.header};
  border: 2px solid #222;
  border-radius: 10px;
  padding: 1rem;
  width: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`;

export const RodadaLabel = styled.div`
  font-size: 0.85rem;
  color: #facc15;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: center;
`;

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $vencedor, theme }) => ($vencedor ? "#facc15" : theme.header)};
  color: ${({ $vencedor, theme }) => ($vencedor ? theme.text2 : theme.text)};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.4rem;
  font-weight: ${({ $vencedor }) => ($vencedor ? "bold" : "normal")};
  transition: background 0.3s ease;
`;

export const NomeTime = styled.span`
  flex: 1;
  padding-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PlacarTime = styled.span`
  min-width: 30px;
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
`;

export const TaçaImage = styled.img`
  margin: 2rem 0;
  filter: ${({ theme }) => theme.borderDestaque};
`;

export const Logo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 0.5rem;
  border-radius: 4px;
  padding: 2px;
`;

export const FinalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FinalTimeContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ $vencedor, theme }) => ($vencedor ? "#facc15" : theme.header)};
  color: ${({ $vencedor, theme }) => ($vencedor ? theme.text2 : theme.text)};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: ${({ $vencedor }) => ($vencedor ? "bold" : "normal")};
  transition: background 0.3s ease;
`;