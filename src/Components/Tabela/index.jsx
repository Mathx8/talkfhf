import React from "react";

import { TabelaContainer, Titulo, TabelaEstilizada, Cabecalho, Linha, CelulaCabecalho, Celula } from "./styles";

const Tabela = ({ titulo, times }) => {
    return (
        <TabelaContainer>
            <Titulo>{titulo}</Titulo>
            <TabelaEstilizada>
                <Cabecalho>
                    <tr style={{borderLeft: "3px solid #e63946"}}>
                        {['#', 'TIME', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', 'PTS'].map((header, idx) => (
                            <CelulaCabecalho key={idx}>{header}</CelulaCabecalho>
                        ))}
                    </tr>
                </Cabecalho>
                <tbody>
                    {times.map((time, index) => (
                        <Linha key={time.id || index} posicao={index + 1}>
                            <Celula>{index + 1}</Celula>
                            <Celula><strong>{time.nome}</strong></Celula>
                            {['jogos', 'vitorias', 'empates', 'derrotas', 'gols_marcados', 'gols_sofridos', 'saldo_de_gols', 'pontos'].map((stat) => (
                                <Celula key={stat}>{time[stat]}</Celula>
                            ))}
                        </Linha>
                    ))}
                </tbody>
            </TabelaEstilizada>
        </TabelaContainer>
    );
};

export default Tabela;