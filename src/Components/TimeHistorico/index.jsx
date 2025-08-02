import React, { useEffect, useState } from "react";
import api from "../../API/api";
import {
  Container,
  Titulo,
  EstatisticasGrid,
  EstatCard,
  Valor,
  Label,
  HistoricoWrapper,
  PartidasLista,
  PartidaItem,
  InfoSuperior,
  InfoInferior
} from "./styles";

const TimeHistorico = ({ timeId, nomeTime }) => {
  const [estatisticas, setEstatisticas] = useState(null);
  const [partidasDoTime, setPartidasDoTime] = useState([]);

  useEffect(() => {
    const calcularHistorico = async () => {
      try {
        const resp = await api.get("/partida/view");
        const partidas = resp.data;

        const jogosDoTime = partidas.filter(
          (p) => p.time_casa === nomeTime || p.time_fora === nomeTime
        );

        let vitorias = 0,
          derrotas = 0,
          empates = 0,
          gp = 0,
          gc = 0;

        jogosDoTime.forEach((p) => {
          const ehCasa = p.time_casa === nomeTime;
          const golsPro = ehCasa ? p.gols_casa : p.gols_fora;
          const golsContra = ehCasa ? p.gols_fora : p.gols_casa;

          gp += golsPro;
          gc += golsContra;

          if (golsPro > golsContra) vitorias++;
          else if (golsPro < golsContra) derrotas++;
          else empates++;
        });

        const sg = gp - gc;

        setEstatisticas({ vitorias, derrotas, empates, gp, gc, sg });
        setPartidasDoTime(jogosDoTime.reverse());
      } catch (error) {
        console.error("Erro ao buscar partidas:", error);
      }
    };

    if (timeId && nomeTime) calcularHistorico();
  }, [timeId, nomeTime]);

  if (!estatisticas) return null;

  return (
    <Container>
      <Titulo>Histórico</Titulo>
      <HistoricoWrapper>
        <EstatisticasGrid>
          <EstatCard>
            <Valor>{estatisticas.vitorias}</Valor>
            <Label>Vitórias</Label>
          </EstatCard>
          <EstatCard>
            <Valor>{estatisticas.derrotas}</Valor>
            <Label>Derrotas</Label>
          </EstatCard>
          <EstatCard>
            <Valor>{estatisticas.empates}</Valor>
            <Label>Empates</Label>
          </EstatCard>
          <EstatCard>
            <Valor>{estatisticas.gp}</Valor>
            <Label>Gols Marcados</Label>
          </EstatCard>
          <EstatCard>
            <Valor>{estatisticas.gc}</Valor>
            <Label>Gols Sofridos</Label>
          </EstatCard>
          <EstatCard>
            <Valor>{estatisticas.sg}</Valor>
            <Label>Saldo de Gols</Label>
          </EstatCard>
        </EstatisticasGrid>

        <PartidasLista>
          {partidasDoTime.map((p, i) => {
            const ehCasa = p.time_casa === nomeTime;
            const adversario = ehCasa ? p.time_fora : p.time_casa;
            const golsPro = ehCasa ? p.gols_casa : p.gols_fora;
            const golsContra = ehCasa ? p.gols_fora : p.gols_casa;
            return (
              <PartidaItem key={i}>
                <InfoSuperior>
                  <strong>{p.rodada}</strong>
                  <span>{p.competicao}</span>
                </InfoSuperior>
                <InfoInferior>
                  <span>{nomeTime} {golsPro} x {golsContra} {adversario}</span>
                </InfoInferior>
              </PartidaItem>
            );
          })}
        </PartidasLista>
      </HistoricoWrapper>
    </Container>
  );
};

export default TimeHistorico;