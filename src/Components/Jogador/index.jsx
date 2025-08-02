import React from "react";
import useTimes from "../../API/useTimes";
import {
  Container,
  Topo,
  Avatar,
  Info,
  Estatisticas,
  CardEstatistica,
  MediaBox,
  Time
} from "./styles";

const JogadorDetalhes = ({ jogador }) => {
  const { times } = useTimes();

  const bandeiras = {
    Brasileiro: "br",
    Chileno: "cl",
    Colombiano: "co",
    Espanhol: "es",
    Italiano: "it",
    Mexicano: "mx",
    Português: "pt",
    Venezuelano: "ve",
  };

  const getCountryCode = (nacionalidade) =>
    bandeiras[nacionalidade] || "un";

  return (
    <Container>
      <Topo>
        <Avatar src={`https://hubbe.biz/avatar/${jogador.nome}?img_format=png`} />

        <Info>
          <h2>{jogador.nome}</h2>
          <p><strong>Posição: </strong> {jogador.posicao}</p>
          <p><strong>Nacionalidade:</strong> <img
                      src={`https://flagcdn.com/w40/${getCountryCode(jogador.nacionalidade)}.png`}
                      alt={jogador.nacionalidade}
                      title={jogador.nacionalidade}
                    /></p>

          {jogador.times?.length > 0 && (
            <>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {jogador.times.map((t, index) => {
                  const timeInfo = times.find(time => time.id === t.id);
                  return timeInfo ? (
                    <Time key={index} src={timeInfo.logo} alt={timeInfo.nome} title={`${timeInfo.nome} (${t.competicao})`} />
                  ) : (
                    <span key={index}>{t.nome} ({t.competicao})</span>
                  );
                })}
              </div>
            </>
          )}
        </Info>

        <MediaBox>
          MVPs<br />
          {jogador?.mvps ?? 0}
        </MediaBox>
      </Topo>

      <Estatisticas>
        <CardEstatistica>
          <h4>Gols</h4>
          <span>{jogador?.gols ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Assistências</h4>
          <span>{jogador?.assistencias ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Cleansheets</h4>
          <span>{jogador?.cleansheets ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Seleção da RDD</h4>
          <span>{jogador?.mvps ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Amarelos</h4>
          <span>{jogador?.cartoes_amarelos ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Vermelhos</h4>
          <span>{jogador?.cartoes_vermelhos ?? 0}</span>
        </CardEstatistica>
      </Estatisticas>
    </Container>
  );
};

export default JogadorDetalhes;