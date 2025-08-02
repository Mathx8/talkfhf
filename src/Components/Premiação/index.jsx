import React, { useEffect, useState } from "react";
import { Container, TituloContainer, Titulo, CardPremiacao, CompeticaoTitulo, TopContainer, TopTitle, TopRow, TopCard, TopAvatar, TopPosition, TopName, Secao, JogadorItem, Avatar, Label, JogadorNome, CampeaoBox, JogadoresCampeoes } from "./styles";
import Loading from "../../Components/TelaCarregamento";
import api from "../../API/api";
import useCompeticao from "../../API/useCompeticao";
import useTimes from "../../API/useTimes";

import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";

const Premiacao = () => {
    const [premiacoes, setPremiacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [abertas, setAbertas] = useState({});

    const { competicoes } = useCompeticao();
    const { times } = useTimes();

    useEffect(() => {
        const fetchPremiacoes = async () => {
            try {
                const response = await api.get("/premiacao/view");
                setPremiacoes(response.data);
            } catch (error) {
                console.error("Erro ao buscar premiações:", error);
            } finally {
                setCarregando(false);
            }
        };

        fetchPremiacoes();
    }, []);

    const toggleAba = (id) => {
        setAbertas((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [modoCabeca, setModoCabeca] = useState(false);

    useEffect(() => {
        const atualizarTamanho = () => {
            setModoCabeca(window.innerWidth < 490);
        };

        atualizarTamanho();
        window.addEventListener("resize", atualizarTamanho);
        return () => window.removeEventListener("resize", atualizarTamanho);
    }, []);

    if (carregando) return <Loading />;

    const renderJogador = (nome, label) => (
        <JogadorItem key={nome}>
            <Avatar
                src={`https://hubbe.biz/avatar/${nome}?&img_format=png&headonly=2`}
                alt={nome}
            />
            <div>
                <Label>{label}</Label>
                <JogadorNome>{nome}</JogadorNome>
            </div>
        </JogadorItem>
    );

    const renderCampeao = (nomeTime, label) => {
        const time = times.find(t => t.nome === nomeTime);

        if (!time) return null;

        return (
            <CampeaoBox>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                        src={time.logo}
                        alt={nomeTime}
                        style={{ objectFit: "contain" }}
                    />
                    <div>
                        <Label>{label}</Label>
                        <JogadorNome>{nomeTime}</JogadorNome>
                    </div>
                </div>
                <JogadoresCampeoes>
                    {time.jogadores.map((jogador) => (
                        <div key={jogador}>
                            <Avatar
                                src={`https://hubbe.biz/avatar/${jogador}?&img_format=png&headonly=2`}
                                alt={jogador}
                                title={jogador}
                            />
                        </div>
                    ))}
                </JogadoresCampeoes>
            </CampeaoBox>
        );
    };

    const renderTop3 = (titulo, jogadores, modoCabeca = false) => {
        if (!jogadores || jogadores.length < 3) return null;

        const posicoes = {
            1: "Top 1",
            2: "Top 2",
            3: "Top 3"
        };

        const ordem = [2, 1, 3];
        const boca = ["sml", "srp", "std"];

        const ordenados = ordem.map(pos =>
            jogadores.find(j => j.posicao === pos)
        );

        return (
            <TopContainer>
                <TopTitle>
                    {titulo.split("").map((l, i) => (
                        <span key={i}>{l}</span>
                    ))}
                </TopTitle>
                <TopRow>
                    {ordenados.map((jogador) =>
                        jogador ? (
                            <TopCard key={jogador.nome}>
                                <TopName>{jogador.nome}</TopName>
                                <TopAvatar
                                    src={`https://hubbe.biz/avatar/${jogador.nome}?&img_format=png&headonly=${modoCabeca ? 2 : 0}&gesture=${boca[Math.floor(Math.random() * boca.length)]}&direction=3`}
                                    alt={jogador.nome}
                                />
                                <TopPosition>{posicoes[jogador.posicao]}</TopPosition>
                            </TopCard>
                        ) : null
                    )}
                </TopRow>
            </TopContainer>
        );
    };


    return (
        <Container>
            <TituloContainer>Competições</TituloContainer>
            {premiacoes.map((premiacao) => {
                const competicaoInfo = competicoes.find(c => c.id === premiacao.competicao);
                return (
                    <CardPremiacao key={premiacao.id}>
                        <CompeticaoTitulo
                            onClick={() => toggleAba(premiacao.id)}
                            className={abertas[premiacao.id] ? "aberta" : ""}
                        >
                            {competicaoInfo?.nome || `Competição #${premiacao.competicao}`}
                            {abertas[premiacao.id] ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
                        </CompeticaoTitulo>

                        {abertas[premiacao.id] && (
                            <>
                                <Titulo>TOPS</Titulo>
                                <Secao>
                                    {renderTop3("GK", premiacao.top_gk, modoCabeca)}
                                    {renderTop3("ZAG", premiacao.top_zag, modoCabeca)}
                                    {renderTop3("MID", premiacao.top_mid, modoCabeca)}
                                    {renderTop3("ATK", premiacao.top_atk, modoCabeca)}
                                </Secao>
                                <Titulo>DESTAQUES</Titulo>
                                <Secao>
                                    {renderJogador(premiacao.mvp, "MVP")}
                                    {renderJogador(premiacao.artilheiro, "Artilheiro")}
                                    {renderJogador(premiacao.luva_de_ouro, "Luva de Ouro")}
                                    {renderJogador(premiacao.revelacao, "Revelação")}
                                </Secao>

                                {renderCampeao(premiacao.campeao, "Campeão")}
                            </>
                        )}
                    </CardPremiacao>
                );
            })}
        </Container>
    );
};

export default Premiacao;