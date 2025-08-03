import React, { useState, useEffect } from "react";

import usePartidas from "../../API/usePartidas";
import LoadingPequeno from "../TelaCarregamentoPequeno";
import { RodadaContainer, Titulo, JogosContainer, Jogos, Time, Placar, Navegacao, BotaoRodada } from "./styles";

const Rodadas = ({ competicao, inicialRodada }) => {
    const { partida, loading, erro } = usePartidas();
    const [rodadaAtual, setRodadaAtual] = useState(inicialRodada);
    const [rodadasDisponiveis, setRodadasDisponiveis] = useState([]);

    useEffect(() => {
        const partidasFiltradas = partida.filter(
            j => j.competicao === competicao && j.rodada.startsWith(inicialRodada)
        );

        if (partidasFiltradas.length > 0) {
            const rodadasUnicas = [...new Set(partidasFiltradas.map(j => j.rodada))]
                .filter(r => r.startsWith(inicialRodada))
                .sort((a, b) => {
                    const numA = parseInt(a.replace(inicialRodada, ""));
                    const numB = parseInt(b.replace(inicialRodada, ""));
                    return numA - numB;
                });

            setRodadasDisponiveis(rodadasUnicas);
            setRodadaAtual(prev => prev || rodadasUnicas[0]);
        }
    }, [inicialRodada, partida, competicao]);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setRodadaAtual(prev => {
                const atualIndex = rodadasDisponiveis.indexOf(prev);
                const proximaRodada = rodadasDisponiveis[(atualIndex + 1) % rodadasDisponiveis.length];
                return proximaRodada;
            });
        }, 10000);

        return () => clearInterval(intervalo);
    }, [rodadasDisponiveis]);

    if (loading) return <RodadaContainer> <Titulo>Rodada</Titulo><LoadingPequeno /> </RodadaContainer>; 
    if (erro) return <p>Erro: {erro}</p>;

    const partidasRodada = partida.filter(j => j.rodada === rodadaAtual);

    return (
        <RodadaContainer>
            <Titulo>Rodada {rodadaAtual.replace(inicialRodada, "")}</Titulo>

            <Navegacao>
                {rodadasDisponiveis.map(r => (
                    <BotaoRodada
                        key={r}
                        $ativo={r === rodadaAtual}
                        onClick={() => setRodadaAtual(r)}
                    >
                        {r.replace(inicialRodada, "")}
                    </BotaoRodada>
                ))}
            </Navegacao>

            <JogosContainer>
                {partidasRodada.map((jogo, index) => {
                    const golsCasa = jogo.gols_casa;
                    const golsFora = jogo.gols_fora;
                    const destaqueCasa = golsCasa > golsFora;
                    const destaqueFora = golsFora > golsCasa;

                    return (
                        <Jogos key={index}>
                            <Time $destaque={destaqueCasa}>{jogo.time_casa}</Time>
                            <Placar>{golsCasa} x {golsFora}</Placar>
                            <Time $destaque={destaqueFora}>{jogo.time_fora}</Time>
                        </Jogos>
                    );
                })}
            </JogosContainer>
        </RodadaContainer>
    );
};

export default Rodadas;