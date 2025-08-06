import React from "react";
import useTimes from "../../API/useTimes";
import { Container, Topo, Avatar, Info, Estatisticas, CardEstatistica, MediaBox, ContainerTime, Time, PremioItem, PremiosContainer } from "./styles";

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

  const getCompeticaoImage = (competicao) => {
    if (competicao === "Libertadores") return "https://cdn.jsdelivr.net/gh/Divinezx/hubbecdn/swfs/c_images/album1584/FHFLIB1.gif";
    if (competicao === "DRAFT CUP") return "https://cdn.jsdelivr.net/gh/Divinezx/hubbecdn/swfs/c_images/album1584/TALKDRAFT1.gif";
    return null;
  };

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
              <ContainerTime>
                {jogador.times.map((t, index) => {
                  const timeInfo = times.find(time => time.id === t.id);
                  return timeInfo ? (
                    <Time key={index} src={timeInfo.logo} alt={timeInfo.nome} title={`${timeInfo.nome} (${t.competicao})`} />
                  ) : (
                    <span key={index}>{t.nome} ({t.competicao})</span>
                  );
                })}
              </ContainerTime>
            </>
          )}
        </Info>

        {jogador.premiacoes && jogador.premiacoes.length > 0 && (
          <PremiosContainer>
            {jogador.premiacoes.map((premio, idx) => {
              const imagemCompeticao = getCompeticaoImage(premio.competicao);
              return (
                <PremioItem key={idx} title={premio.competicao}>
                  {imagemCompeticao && (
                    <img
                      src={imagemCompeticao}
                      alt={premio.competicao}
                      style={{ height: "20px", marginRight: "8px" }}
                    />
                  )}
                  {premio.tipo}
                </PremioItem>
              );
            })}
          </PremiosContainer>
        )}

        <MediaBox>
          MVP<br />
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
          <span>{jogador?.selecao ?? 0}</span>
        </CardEstatistica>
        <CardEstatistica title={`Amarelo: ${jogador?.cartoes_amarelos ?? 0} / Vermelho: ${jogador?.cartoes_vermelhos ?? 0}`}>
          <h4>Cartões</h4>
          <span>{(jogador?.cartoes_amarelos ?? 0) + (jogador?.cartoes_vermelhos ?? 0)}</span>
        </CardEstatistica>
        <CardEstatistica>
          <h4>Contras</h4>
          <span>{jogador?.gols_contra ?? 0}</span>
        </CardEstatistica>
      </Estatisticas>
    </Container>
  );
};

export default JogadorDetalhes;