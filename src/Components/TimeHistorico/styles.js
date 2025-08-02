import styled from "styled-components";

export const Container = styled.div`
    margin: 40px 0;
`;

export const Titulo = styled.h2`
    font-size: 20px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid #444;
    padding-bottom: 8px;
    margin-bottom: 20px;
`;

export const EstatisticasGrid = styled.div`
    flex: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

export const EstatCard = styled.div`
    background: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
    border-radius: 8px;
    padding: 16px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Valor = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 6px;
    color: #e63946;
`;

export const Label = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
`;

export const HistoricoWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 20px;
`;

export const PartidasLista = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const PartidaItem = styled.div`
    background: ${({ theme }) => theme.header};
    border-radius: 8px;
    padding: 12px 16px;
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const InfoSuperior = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #e63946;
`;

export const InfoInferior = styled.div`
    font-size: 16px;
    font-weight: 500;
`;
