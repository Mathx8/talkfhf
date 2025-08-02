import React from "react";

import Header from "../../Components/Header";
import Jogadores from "../../Components/TelaJogadores";
import TimesPorCompeticao from "../../Components/TimesPorCompeticao";
import Footer from "../../Components/Footer";

const Plantel = () => {
    return (
        <div>
            <Header />
            <Jogadores />
            <TimesPorCompeticao />
            <Footer />
        </div>
    )
}

export default Plantel;