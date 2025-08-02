import { useState, useEffect } from "react";
import api from "./api";

const useSelecao = () => {
    const [selecao, setSelecoes] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarSelecoes = async () => {
        try {
            const resp = await api.get("/selecao/");
            setSelecoes(resp.data);
        } catch (error) {
            console.error("Erro ao carregar seleções:", error);
        }
    };

    const criarSelecao = async ({ rodada, competicao_id, observacoes, gk, zag, mid, atk }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/selecao/", { rodada, competicao_id, observacoes, gk, zag, mid, atk })
            await carregarSelecoes();
            setMensagem("Seleção criada com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar seleção");
        }
    }

    const editarSelecao = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/selecao/${id}`, dados);
            await carregarSelecoes();
            setMensagem("Seleção atualizada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar seleção");
            return false;
        }
    }

    const deletarSelecao = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/selecao/${id}`);
            await carregarSelecoes();
            setMensagem("Seleção deletada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar seleção");
            return false;
        }
    }

    useEffect(() => {
        carregarSelecoes();
    }, []);

    return {
        selecao,
        mensagem,
        erro,
        criarSelecao,
        setSelecoes,
        editarSelecao,
        deletarSelecao,
        setMensagem,
        setErro
    };
};

export default useSelecao;