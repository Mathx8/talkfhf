import { useState, useEffect } from "react";
import api from "./api";

const useCompeticao = () => {
    const [competicoes, setCompeticao] = useState([])
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarCompeticoes = async () => {
        try {
            const resp = await api.get("/competicao/view");
            setCompeticao(resp.data);
        } catch (error) {
            console.error("Erro ao carregar competições:", error);
        }
    }

    const criarCompeticao = async ({ nome, tipo }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/competicao/", { nome, tipo })
            await carregarCompeticoes();
            setMensagem("Competição criada com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar competição");
        }
    }

    const editarCompeticao = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/competicao/${id}`, dados);
            await carregarCompeticoes();
            setMensagem("Competição atualizada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar competição");
            return false;
        }
    };

    const deletarCompeticao = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/competicao/${id}`);
            await carregarCompeticoes();
            setMensagem("Competição deletada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar competição");
            return false;
        }
    };

    useEffect(() => {
        carregarCompeticoes();
    }, []);

    return{
        competicoes,
        mensagem,
        erro,
        criarCompeticao,
        setCompeticao,
        editarCompeticao,
        deletarCompeticao,
        setMensagem,
        setErro
    }
}

export default useCompeticao;