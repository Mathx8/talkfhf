import { useState, useEffect } from "react";

import useApi from "./useApi";
import api from "./api";

const useTimes = () => {
    const { dados: time, loading, erros } = useApi("/time/view");

    const [times, setTimes] = useState([])
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarTimes = async () => {
        try {
            const resp = await api.get("/time/view");
            setTimes(resp.data);
        } catch (error) {
            console.error("Erro ao carregar times:", error);
        }
    }

    const criarTime = async ({ nome, logo, competicao_id, grupo_id }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/time/", { nome, logo, competicao_id, grupo_id });
            await carregarTimes();
            setMensagem("Time criado com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar time");
        }
    };

    const editarTime = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/time/${id}`, dados)
            await carregarTimes();
            setMensagem("Time atualizado com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar time");
            return false;
        }
    };

    const deletarTime = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/time/${id}`)
            await carregarTimes();
            setMensagem("Time deletado com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar time");
            return false;
        }
    };

    const adicionarJogadoresAoTime = async (id, jogador_ids) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post(`/time/${id}/jogadores`, jogador_ids)
            await carregarTimes();
            setMensagem("Jogador adicionado ao time com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao adicionar jogador ao time");
            return false;
        }
    };

    const removerJogadoresDoTime = async (id, jogador_ids) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/time/${id}/jogadores`, { data: { jogador_ids } });
            await carregarTimes();
            setMensagem("Jogador removido do time com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao remover jogador do time");
            return false;
        }
    };

    useEffect(() => {
        carregarTimes();
    }, []);

    return {
        dados: time || [], loading, erros,
        times,
        mensagem,
        erro,
        criarTime,
        setTimes,
        editarTime,
        deletarTime,
        adicionarJogadoresAoTime,
        removerJogadoresDoTime,
        setMensagem,
        setErro
    }
}

export default useTimes;