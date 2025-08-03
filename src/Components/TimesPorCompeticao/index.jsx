import React from "react";
import { useNavigate } from "react-router-dom";

import useTimes from "../../API/useTimes";
import Loading from "../../Components/TelaCarregamento";

import { Container, CompeticaoTitulo, TimeCard, LogoTime, NomeTime, TimesGrid, CompeticaoContainer } from "./styles";

const formatarSlug = (nome) => nome.toLowerCase().replace(/\s+/g, "-");

const TimesPorCompeticao = () => {
  const { times, loading, erro } = useTimes();
  const navigate = useNavigate();

  const timesPorCompeticao = times.reduce((acc, time) => {
    const key = time.competicao?.nome || "Sem competição";
    if (!acc[key]) acc[key] = [];
    acc[key].push(time);
    return acc;
  }, {});

  if (loading) return <Loading />;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <Container>
      {Object.entries(timesPorCompeticao).map(([competicao, times]) => (
        <CompeticaoContainer key={competicao}>
          <CompeticaoTitulo>{competicao}</CompeticaoTitulo>
          <TimesGrid>
            {times.map((time) => (
              <TimeCard key={time.id} onClick={() => navigate(`/plantel/${formatarSlug(time.nome)}-${time.id}`)}>
                <LogoTime src={time.logo} alt={time.nome} />
                <NomeTime>{time.nome}</NomeTime>
              </TimeCard>
            ))}
          </TimesGrid>
        </CompeticaoContainer>
      ))}
    </Container>
  );
};

export default TimesPorCompeticao;