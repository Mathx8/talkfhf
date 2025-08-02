import React from "react";
import { ContainerInicial, TextoEsquerda, ImagemCentral } from "./styles";

import Header from "../../Components/Header";
import CanvasFundo from "../../Components/CanvasFundo/CanvasFundo";
import Footer from "../../Components/Footer";
import pko from "../../Image/pko.png";

const Home = () => {
  return (
    <>
      <Header />
      <ContainerInicial>
        <CanvasFundo />
        <TextoEsquerda><h3>Um por todos <br/>Todos por 1Q</h3></TextoEsquerda>
        <ImagemCentral>
          <img src={pko} alt="personagem" />
        </ImagemCentral>
      </ContainerInicial>
      <Footer />
    </>
  );
};

export default Home;