import React from "react";

import { Card, Header, Avatar, Nome, Posicao, Estatisticas, Estat, Badge } from "../../Pages/Time/styles";

const JogadorCard = ({ jogador }) => {
    return (
        <Card>
            <Header>
                <Avatar
                    src={`https://hubbe.biz/avatar/${jogador.nome}?img_format=png`}
                    alt={jogador.nome}
                />
                <div>
                    <Nome>{jogador.nome}</Nome>
                    <Posicao>{jogador.posicao}</Posicao>
                </div>
                <Badge>MVP: {jogador.mvps || 0}</Badge>
            </Header>
            <Estatisticas>
                <Estat><strong>Gols</strong> {jogador.gols || 0}</Estat>
                <Estat><strong>Assist.</strong> {jogador.assistencias || 0}</Estat>
                <Estat><strong>Cleansheets</strong> {jogador.cleansheets || 0}</Estat>
                <Estat><strong>Contras</strong> {jogador.gols_contra || 0}</Estat>
                <Estat><strong>Amarelos</strong> {jogador.cartoes_amarelos || 0}</Estat>
                <Estat><strong>Vermelhos</strong> {jogador.cartoes_vermelhos || 0}</Estat>
            </Estatisticas>
        </Card>
    );
};

export default JogadorCard;
