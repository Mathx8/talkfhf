import React from "react";

import { Container } from "./styles";

import Header from "../../Components/Header";
import Premiacao from "../../Components/Premiação"
import RankingJogadores from "../../Components/Estatisticas";
import Footer from "../../Components/Footer";

const Museu = () => {
    return (
        <>
            <Header />
            <Container>
                <Premiacao />
                <RankingJogadores idCompeticao={""} />
            </Container>
            <Footer />
        </>
    )
}

export default Museu;