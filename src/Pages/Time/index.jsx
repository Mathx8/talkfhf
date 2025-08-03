import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../API/api";
import Header from "../../Components/Header";
import JogadorCard from "../../Components/TimeJogadorCard";
import TimeHistorico from "../../Components/TimeHistorico";
import Footer from "../../Components/Footer";
import Loading from "../../Components/TelaCarregamento";

import { Container, Titulo, JogadoresGrid } from "./styles";

const TimeDetalhes = () => {
    const { id: slugId } = useParams();
    const id = slugId.split("-").pop();

    const [time, setTime] = useState(null);
    const [jogadores, setJogadores] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeResp = await api.get(`/time/${id}`);
                const timeData = timeResp.data;
                setTime(timeData);

                const estatResp = await api.get(`/jogador/estatisticas/${timeData.competicao.id}`);
                const jogadoresComEstat = estatResp.data;

                const jogadoresDoTime = jogadoresComEstat.filter(j =>
                    timeData.jogadores.includes(j.nome)
                );

                setJogadores(jogadoresDoTime);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [id]);

    if (carregando) return <><Header /> <Loading /> <Footer /></>;

    return (
        <>
            <Header />
            <Container>
                <Titulo><img src={time.logo} alt="" />{time.nome}</Titulo>
                <JogadoresGrid>
                    {jogadores.map((jogador) => (
                        <JogadorCard key={jogador.id} jogador={jogador} />
                    ))}
                </JogadoresGrid>
                <TimeHistorico timeId={time.id} nomeTime={time.nome} />
            </Container>
            <Footer />
        </>
    );
};

export default TimeDetalhes;