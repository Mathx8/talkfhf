import React, { useState } from "react";

import { HeaderAdmin, Wrapper, Tabs, TabButton, ContentArea, Placeholder } from "./styles"

import useUsuarios from "../../API/useUsuarios";

import AbaUsuario from "../Abas/AbaUsuario";
import AbaJogador from "../Abas/AbaJogador";
import AbaCompeticao from "../Abas/AbaCompeticao";
import AbaGrupo from "../Abas/AbaGrupo";
import AbaTime from "../Abas/AbaTime";
import AbaPartida from "../Abas/AbaPartida";
import AbaSumula from "../Abas/AbaSumula";
import AbaSelecao from "../Abas/AbaSelecao";
import AbaPremiacao from "../Abas/AbaPremiacao";

const components = [
    "Usuário",
    "Jogador",
    "Competição",
    "Grupo",
    "Time",
    "Partida",
    "Súmula",
    "Seleção da Rodada",
    "Premiação"
];

const TelaAdmin = () => {
    const [abaAtiva, setAbaAtiva] = useState("Usuário");

    const { usuarios } = useUsuarios();

    const usernameLogado = localStorage.getItem("username");

    const usuarioLogado = usuarios.find(u => u.username === usernameLogado);

    const dadosLogin = usuarioLogado
        ? `${usuarioLogado.username} (${usuarioLogado.papel})`
        : "Carregando usuário...";

    const renderAba = () => {
        switch (abaAtiva) {
            case "Usuário":
                return <AbaUsuario />;
            case "Jogador":
                return <AbaJogador />;
            case "Competição":
                return <AbaCompeticao />;
            case "Grupo":
                return <AbaGrupo />;
            case "Time":
                return <AbaTime />;
            case "Partida":
                return <AbaPartida />;
            case "Súmula":
                return <AbaSumula />;
            case "Seleção da Rodada":
                return <AbaSelecao />;
            case "Premiação":
                return <AbaPremiacao />;
            default:
                return (
                    <Placeholder>
                        Aqui você poderá visualizar, editar, criar e deletar registros de {abaAtiva.toLowerCase()}.
                    </Placeholder>
                );
        }
    };

    return (
        <Wrapper>
            <HeaderAdmin>
                <h1>Painel de Gerenciamento</h1>
                <p>Logado como: {dadosLogin}</p>
            </HeaderAdmin>
            <Tabs>
                {components.map((comp) => (
                    <TabButton
                        key={comp}
                        active={abaAtiva === comp}
                        onClick={() => setAbaAtiva(comp)}
                    >
                        {comp}
                    </TabButton>
                ))}
            </Tabs>
            <ContentArea>
                <h2>{abaAtiva}</h2>
                {renderAba()}
            </ContentArea>
        </Wrapper>
    );
};

export default TelaAdmin;