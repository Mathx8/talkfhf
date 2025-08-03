import React, { useEffect, useState } from "react";
import { Container, ContainerEstatisticas, TituloContainer, CategoriaBox, Titulo, Lista, JogadorItem, Nome, Valor } from "./styles";

import api from "../../API/api";
import LoadingPequeno from "../TelaCarregamentoPequeno";
import gol from "../../Image/gol.png";
import assistencia from "../../Image/assistencia.png";
import cleansheet from "../../Image/cleansheet.png";
import mvp from "../../Image/mvp.png";

const RankingJogadores = ({ idCompeticao }) => {
    const [ranking, setRanking] = useState(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const endpoint = idCompeticao ? `/jogador/ranking/${idCompeticao}` : `/jogador/ranking`;
                const res = await api.get(endpoint);
                setRanking(res.data);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
            }
        };
        fetchRanking();
    }, [idCompeticao]);

    const renderLista = (dados, tipo) =>
        dados?.length ? (
            <Lista>
                {dados.map((jogador, index) => (
                    <JogadorItem key={jogador.id} $destaque={index}>
                        <Nome $destaque={index}>{jogador.nome}</Nome>
                        <Valor $tipo={tipo} $destaque={index}>
                            {jogador[tipo]}
                        </Valor>
                    </JogadorItem>
                ))}
            </Lista>
        ) : (
            <p style={{ color: "#fff", textAlign: "center", marginTop: 10 }}>Sem dados</p>
        );

    if (!ranking) return <> <TituloContainer>Estatísticas</TituloContainer><LoadingPequeno /> </>

    return (
        <Container>
            <TituloContainer>Estatísticas</TituloContainer>
            <ContainerEstatisticas>
                <CategoriaBox>
                    <Titulo><img src={gol} alt="" /> Gols</Titulo>
                    {renderLista(ranking.gols, "gols")}
                </CategoriaBox>

                <CategoriaBox>
                    <Titulo><img src={assistencia} alt="" /> Assistências</Titulo>
                    {renderLista(ranking.assistencias, "assistencias")}
                </CategoriaBox>

                <CategoriaBox>
                    <Titulo><img src={cleansheet} alt="" /> Cleansheets</Titulo>
                    {renderLista(ranking.cleansheets, "cleansheets")}
                </CategoriaBox>

                <CategoriaBox>
                    <Titulo><img src={mvp} alt="" /> MVPs</Titulo>
                    {renderLista(ranking.mvps, "mvps")}
                </CategoriaBox>
            </ContainerEstatisticas>
        </Container>
    );
};

export default RankingJogadores;