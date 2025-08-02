import React from "react";
import { TabelaContainer, Tabela, BotaoAcao } from "./styles";

const TabelaAdmin = ({ colunas, dados, onEditar, onExcluir, onGerenciar }) => {
    const possuiAcoes = !!(onEditar || onExcluir || onGerenciar);

    return (
        <TabelaContainer>
            <Tabela>
                <thead>
                    <tr>
                        {colunas.map((coluna, index) => (
                            <th key={index}>{coluna}</th>
                        ))}
                        {possuiAcoes && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {dados.length > 0 ? (
                        dados.map((linha, i) => (
                            <tr key={i}>
                                {linha.map((valor, j) => (
                                    <td key={j}>{valor}</td>
                                ))}
                                {possuiAcoes && (
                                    <td>
                                        {onEditar && (
                                            <BotaoAcao onClick={() => onEditar(i)} cor="#00bfff">
                                                ✏️
                                            </BotaoAcao>
                                        )}
                                        {onExcluir && (
                                            <BotaoAcao onClick={() => onExcluir(i)} cor="#ff4d4d">
                                                🗑️
                                            </BotaoAcao>
                                        )}
                                        {onGerenciar && (
                                            <BotaoAcao onClick={() => onGerenciar(i)} cor="#ffcc00">
                                                👥
                                            </BotaoAcao>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={colunas.length}>Nenhum dado disponível.</td>
                        </tr>
                    )}
                </tbody>
            </Tabela>
        </TabelaContainer>
    );
};

export default TabelaAdmin;