import { useState, useEffect } from "react";
import api from "./api";

const useSumula = () => {
    const [sumulas, setSumulas] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarSumulas = async () => {
        try {
            const resp = await api.get("/sumula/view");
            setSumulas(resp.data);
        } catch (error) {
            console.error("Erro ao carregar súmulas:", error);
        }
    };

    const criarSumula = async ({ partida_id, mvp_id, gols, cleansheets, cartoes }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/sumula/", { partida_id, mvp_id, gols, cleansheets, cartoes });
            await carregarSumulas();
            setMensagem("Súmula criada com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar súmula");
        }
    };

    const editarSumula = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/sumula/${id}`, dados);
            await carregarSumulas();
            setMensagem("Súmula atualizada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar súmula");
            return false;
        }
    };

    const deletarSumula = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/sumula/${id}`);
            await carregarSumulas();
            setMensagem("Súmula deletada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar súmula");
            return false;
        }
    }

    useEffect(() => {
        carregarSumulas();
    }, []);

    return {
        sumulas,
        mensagem,
        erro,
        criarSumula,
        setSumulas,
        editarSumula,
        deletarSumula,
        setMensagem,
        setErro
    };
};

export default useSumula;