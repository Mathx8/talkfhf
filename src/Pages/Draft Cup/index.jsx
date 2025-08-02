import React from "react";
import { Container } from "./styles";

import Header from "../../Components/Header";
import Torneio from "../../Components/Torneio";
import SelecaoDaRodada from "../../Components/Seleção";
import RankingJogadores from "../../Components/Estatisticas";
import Footer from "../../Components/Footer";

const DraftCup = () => {
    return (
        <>
            <Header />
            <Torneio />
            <Container>
                <SelecaoDaRodada idCompeticao={2}/>
                <RankingJogadores idCompeticao={2} />
            </Container>
            <Footer />
        </>
    )
}

export default DraftCup;