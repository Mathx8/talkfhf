import React from "react";
import { ColunaFase, FasesContainer, NomeTime, PartidaContainer, PlacarTime, RodadaLabel, TimeContainer, TorneioContainer, ColunaCentral, Logo, TaçaImage, FinalContainer, FinalTimeContainer } from "./styles";

import useTimes from "../../API/useTimes"
import escudo from "../../Image/escudo.png"

const TorneioEliminatorias = ({ partidas, competicao }) => {
  const partidasFiltradas = partidas.filter(p => p.competicao === competicao);
  const semifinais = partidasFiltradas.filter(p => p.rodada.includes("Semifinal"));
  const final = partidasFiltradas.find(p => p.rodada === "Final");
  const { times } = useTimes();

  const liberta = "https://cdn.jsdelivr.net/gh/Divinezx/hubbecdn/swfs/c_images/album1584/FHFLIB1.gif"

  const renderPartida = (partida) => {
    const logoTimeCasa = times.find(t => t.nome === partida.time_casa)?.logo || escudo;
    const logoTimeFora = times.find(t => t.nome === partida.time_fora)?.logo || escudo;

    return (
      <PartidaContainer key={partida.id}>
        <RodadaLabel>{partida.rodada}</RodadaLabel>
        <TimeContainer $vencedor={partida.gols_casa > partida.gols_fora}>
          <Logo src={logoTimeCasa} alt={partida.time_casa} />
          <NomeTime>{partida.time_casa}</NomeTime>
          <PlacarTime>{partida.gols_casa}</PlacarTime>
        </TimeContainer>
        <TimeContainer $vencedor={partida.gols_fora > partida.gols_casa}>
          <Logo src={logoTimeFora} alt={partida.time_fora} />
          <NomeTime>{partida.time_fora}</NomeTime>
          <PlacarTime>{partida.gols_fora}</PlacarTime>
        </TimeContainer>
      </PartidaContainer>
    );
  };

  return (
    <TorneioContainer>
      <FasesContainer>
        <ColunaFase>
          {semifinais[0] && renderPartida(semifinais[1])}
        </ColunaFase>

        <ColunaCentral>
          {final ? (
            <PartidaContainer key={final.id}>
              <RodadaLabel>{final.rodada}</RodadaLabel>
              <FinalContainer>
                <FinalTimeContainer $vencedor={final.gols_casa > final.gols_fora}>
                  <Logo src={times.find(t => t.nome === final.time_casa)?.logo || escudo} alt={final.time_casa} />
                  <PlacarTime>{final.gols_casa}</PlacarTime>
                </FinalTimeContainer>

                <TaçaImage src={liberta} alt="Taça Libertadores" style={{ margin: "0 1rem" }} />

                <FinalTimeContainer $vencedor={final.gols_fora > final.gols_casa}>
                  <PlacarTime style={{ textAlign: "left" }}>{final.gols_fora}</PlacarTime>
                  <Logo src={times.find(t => t.nome === final.time_fora)?.logo || escudo} alt={final.time_fora} />
                </FinalTimeContainer>
              </FinalContainer>
            </PartidaContainer>
          ) : (
            <p style={{ textAlign: "center", fontWeight: "bold" }}>Final não encontrada</p>
          )}
        </ColunaCentral>

        <ColunaFase>
          {semifinais[1] && renderPartida(semifinais[0])}
        </ColunaFase>
      </FasesContainer>
    </TorneioContainer>
  );
};

export default TorneioEliminatorias;