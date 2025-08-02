import { useState, useEffect } from "react";
import api from "./api";

const usePremiacao = () => {
    const [premiacao, setPremiacoes] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    const carregarPremiacoes = async () => {
        try {
            const resp = await api.get("/premiacao/view");
            setPremiacoes(resp.data);
        } catch (error) {
            console.error("Erro ao carregar premiações:", error);
        }
    };

    const criarPremiacao = async ({ competicao_id, campeao_id, mvp_id, artilheiro_id, luva_de_ouro_id, revelacao_id, top_gk_ids, top_zag_ids, top_mid_ids, top_atk_ids }) => {
        setMensagem("");
        setErro(false);
        try {
            await api.post("/premiacao/", {
                competicao_id,
                campeao_id,
                mvp_id,
                artilheiro_id,
                luva_de_ouro_id,
                revelacao_id,
                top_gk: top_gk_ids.map((id, idx) => ({ jogador_id: id, posicao: idx + 1 })),
                top_zag: top_zag_ids.map((id, idx) => ({ jogador_id: id, posicao: idx + 1 })),
                top_mid: top_mid_ids.map((id, idx) => ({ jogador_id: id, posicao: idx + 1 })),
                top_atk: top_atk_ids.map((id, idx) => ({ jogador_id: id, posicao: idx + 1 })),
            });
            await carregarPremiacoes();
            setMensagem("Premiação criada com sucesso!");
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao criar premiação");
        }
    };

    const editarPremiacao = async (id, dados) => {
        setMensagem("");
        setErro(false);
        try {
            await api.put(`/premiacao/${id}`, dados);
            await carregarPremiacoes();
            setMensagem("Premiação atualizada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao atualizar premiação");
            return false;
        }
    };

    const deletarPremiacao = async (id) => {
        setMensagem("");
        setErro(false);
        try {
            await api.delete(`/premiacao/${id}`);
            await carregarPremiacoes();
            setMensagem("Premiação deletada com sucesso!");
            return true;
        } catch (error) {
            setErro(true);
            setMensagem(error.response?.data?.mensagem || "Erro ao deletar premiação");
            return false;
        }
    };

    useEffect(() => {
        carregarPremiacoes();
    }, []);

    return {
        premiacao,
        mensagem,
        erro,
        criarPremiacao,
        setPremiacoes,
        editarPremiacao,
        deletarPremiacao,
        setMensagem,
        setErro
    };
};

export default usePremiacao;