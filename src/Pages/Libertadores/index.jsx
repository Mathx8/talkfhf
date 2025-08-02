import React from "react";
import {
    Container,
    TituloPagina,
    LayoutPrincipal,
    ColunaGrupos,
    ColunaRodadas,
    LayoutSecundario,
    TransmissaoContainer,
    YoutubeButton
} from "./styles";

import useGrupos from "../../API/useGrupos";
import usePartidas from "../../API/usePartidas";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loading from "../../Components/TelaCarregamento";
import Tabela from "../../Components/Tabela";
import Rodadas from "../../Components/Rodadas";
import TorneioEliminatorias from "../../Components/TorneioEliminatorias";
import RankingJogadores from "../../Components/Estatisticas";

const Libertadores = () => {
    const { grupoA, grupoB, loading, erro } = useGrupos();
    const { partidas } = usePartidas();

    if (loading) return <><Header /><Loading /><Footer /></>;
    if (erro) return <><Header /><p>Erro: {erro}</p><Footer /></>;

    return (
        <>
            <Header />
            <Container>
                <TituloPagina>Fase de Grupos</TituloPagina>
                <LayoutPrincipal>
                    <ColunaGrupos>
                        <Tabela titulo="GRUPO A" times={grupoA} />
                        <Tabela titulo="GRUPO B" times={grupoB} />
                    </ColunaGrupos>

                    <ColunaRodadas>
                        <Rodadas competicao={"Libertadores"} inicialRodada={"LB"} />
                        <TransmissaoContainer>
                            <h4>Todos os jogos gravados estão disponíveis no YouTube</h4>
                            <YoutubeButton
                                href="https://youtube.com/playlist?list=PLgUCgCOBPk45dYhi42Zpj4R4UsWoui-J4&si=_WqseuUWVdcJHhgw"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ASSISTA AOS JOGOS
                            </YoutubeButton>
                        </TransmissaoContainer>
                    </ColunaRodadas>
                </LayoutPrincipal>

                <TituloPagina>Eliminátorias</TituloPagina>
                <LayoutSecundario>
                    <ColunaRodadas>
                        <TorneioEliminatorias partidas={partidas} competicao={"Libertadores"} />
                    </ColunaRodadas>
                    <RankingJogadores idCompeticao={1} />
                </LayoutSecundario>
            </Container>
            <Footer />
        </>
    );
};

export default Libertadores;
