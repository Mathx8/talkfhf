import React, { useState } from "react";
import { AreaDireita, AreaEsquerda, CampoFutebol, CampoSVG, Titulo, Card, Nome, Posicao, Bandeira, Avatar, CardsLayout, LinhaGoleiro, LinhaZagueiro, LinhaMeio, LinhaAtaque, Navegacao, Time, } from "./styles";
import useSelecao from "../../API/useSelecao";
import useTimes from "../../API/useTimes";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const SelecaoDaRodada = ({ idCompeticao }) => {
  const { selecao } = useSelecao();
  const { times } = useTimes();
  const selecoesFiltradas = selecao.filter(sel => sel.competicao_id === idCompeticao);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const selecaoAtual = selecoesFiltradas[indiceAtual];

  if (!selecaoAtual) return null;

  const jogadores = selecaoAtual.jogadores || [];

  const gks = jogadores.filter(j => j.categoria === "GK");
  const zags = jogadores.filter(j => j.categoria === "ZAG");
  const mids = jogadores.filter(j => j.categoria === "MID");
  const atks = jogadores.filter(j => j.categoria === "ATK");

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
    <>
      <Titulo>
        Seleção da Rodada
      </Titulo>

      <Navegacao>
        <FaChevronCircleLeft
          size={32}
          onClick={() => setIndiceAtual((prev) => Math.max(prev - 1, 0))}
          style={{ cursor: "pointer", opacity: indiceAtual === 0 ? 0.3 : 1 }}
        />
        RODADA {selecaoAtual.rodada.slice(2)}
        <FaChevronCircleRight
          size={32}
          onClick={() => setIndiceAtual((prev) => Math.min(prev + 1, selecoesFiltradas.length - 1))}
          style={{ cursor: "pointer", opacity: indiceAtual === selecoesFiltradas.length - 1 ? 0.3 : 1 }}
        />
      </Navegacao>

      <CampoFutebol>
        <CampoSVG>
          <AreaEsquerda />
          <AreaDireita />

          <CardsLayout>
            <LinhaGoleiro>
              {gks.map((jogador) => (
                <Card key={jogador.id}>
                  <Posicao>{'\u00A0'}{jogador.categoria}</Posicao>
                  <Bandeira>
                    <img
                      src={`https://flagcdn.com/w40/${getCountryCode(jogador.nacionalidade)}.png`}
                      alt={jogador.nacionalidade}
                      title={jogador.nacionalidade}
                    />
                  </Bandeira>
                  <>
                    {(() => {
                      const time = times.find(t => t.id === jogador.time?.id);
                      return time ? (
                        <Time src={time.logo} alt={time.nome} title={time.nome} />
                      ) : null;
                    })()}
                  </>
                  <Avatar
                    src={`https://hubbe.biz/avatar/${jogador.nome}?&img_format=png&headonly=2`}
                    alt={jogador.nome}
                  />
                  <Nome>{jogador.nome}</Nome>
                </Card>
              ))}
            </LinhaGoleiro>

            <LinhaZagueiro>
              {zags.map((jogador) => (
                <Card key={jogador.id}>
                  <Posicao>{jogador.categoria}</Posicao>
                  <Bandeira><img
                    src={`https://flagcdn.com/w40/${getCountryCode(jogador.nacionalidade)}.png`}
                    alt={jogador.nacionalidade}
                    title={jogador.nacionalidade}
                  /></Bandeira>
                  <>
                    {(() => {
                      const time = times.find(t => t.id === jogador.time?.id);
                      return time ? (
                        <Time src={time.logo} alt={time.nome} title={time.nome} />
                      ) : null;
                    })()}
                  </>
                  <Avatar
                    src={`https://hubbe.biz/avatar/${jogador.nome}?&img_format=png&headonly=2`}
                    alt={jogador.nome}
                  />
                  <Nome>{jogador.nome}</Nome>
                </Card>
              ))}
            </LinhaZagueiro>

            <LinhaMeio>
              {mids.map((jogador) => (
                <Card key={jogador.id}>
                  <Posicao>{jogador.categoria}</Posicao>
                  <Bandeira><img
                    src={`https://flagcdn.com/w40/${getCountryCode(jogador.nacionalidade)}.png`}
                    alt={jogador.nacionalidade}
                    title={jogador.nacionalidade}
                  /></Bandeira>
                  <>
                    {(() => {
                      const time = times.find(t => t.id === jogador.time?.id);
                      return time ? (
                        <Time src={time.logo} alt={time.nome} title={time.nome} />
                      ) : null;
                    })()}
                  </>
                  <Avatar
                    src={`https://hubbe.biz/avatar/${jogador.nome}?&img_format=png&headonly=2`}
                    alt={jogador.nome}
                  />
                  <Nome>{jogador.nome}</Nome>
                </Card>
              ))}
            </LinhaMeio>

            <LinhaAtaque>
              {atks.map((jogador) => (
                <Card key={jogador.id}>
                  <Posicao>{jogador.categoria}</Posicao>
                  <Bandeira><img
                    src={`https://flagcdn.com/w40/${getCountryCode(jogador.nacionalidade)}.png`}
                    alt={jogador.nacionalidade}
                    title={jogador.nacionalidade}
                  /></Bandeira>
                  <>
                    {(() => {
                      const time = times.find(t => t.id === jogador.time?.id);
                      return time ? (
                        <Time src={time.logo} alt={time.nome} title={time.nome} />
                      ) : null;
                    })()}
                  </>
                  <Avatar
                    src={`https://hubbe.biz/avatar/${jogador.nome}?&img_format=png&headonly=2`}
                    alt={jogador.nome}
                  />
                  <Nome>{jogador.nome}</Nome>
                </Card>
              ))}
            </LinhaAtaque>
          </CardsLayout>
        </CampoSVG>
      </CampoFutebol>
    </>
  );
};

export default SelecaoDaRodada;