import { useState, useEffect } from "react";
import api from "./api";

const useJogadores = () => {
    const [jogadores, setJogadores] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarJogadores = async () => {
        try {
            const resp = await api.get("/jogador/view");
            setJogadores(resp.data);
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
        }
    };

    const recarregarJogadores = async () => {
        await carregarJogadores();
    };

    const criarJogador = async ({ nome, posicao, nacionalidade }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/jogador/", { nome, posicao, nacionalidade })
            await carregarJogadores();
            setMensagem("Jogador criado com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar jogador");
        }
    }

    const editarJogador = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/jogador/${id}`, dados);
            await carregarJogadores();
            setMensagem("Jogador atualizado com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar jogador");
            return false;
        }
    };

    const deletarJogador = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/jogador/${id}`);
            await carregarJogadores();
            setMensagem("Jogador deletado com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar jogador");
            return false;
        }
    };

    useEffect(() => {
        carregarJogadores();
    }, []);

    return {
        jogadores,
        mensagem,
        erro,
        criarJogador,
        setJogadores,
        editarJogador,
        deletarJogador,
        recarregarJogadores,
        setMensagem,
        setErro,
    };
};

export default useJogadores;