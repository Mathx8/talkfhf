import { useState, useEffect } from "react";

import useApi from "./useApi";
import api from "./api";

const usePartidas = () => {
  const { dados: partida, loading, erros } = useApi("/partida/view");

  const [partidas, setPartidas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const carregarPartidas = async () => {
    setMensagem("");
    setErro(false);
    try {
      const resp = await api.get("/partida/view");
      setPartidas(resp.data);
    } catch (error) {
      console.error("Erro ao carregar partidas:", error);
    }
  };

  const criarPartida = async ({ competicao_id, grupo_id, rodada, link, time_casa_id, gols_casa, time_fora_id, gols_fora }) => {
    setMensagem("");
    setErro(false);
    try {
      await api.post("/partida/", { competicao_id, grupo_id, rodada, link, time_casa_id, gols_casa, time_fora_id, gols_fora })
      await carregarPartidas();
      setMensagem("Partida criada com sucesso!");
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao criar partida");
    }
  };

  const editarPartida = async (id, dados) => {
    setMensagem("");
    setErro(false);
    try {
      await api.put(`/partida/${id}`, dados);
      await carregarPartidas();
      setMensagem("Partida atualizada com sucesso!");
      return true;
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao atualizar partida");
      return false;
    }
  };

  const deletarPartida = async (id) => {
    setMensagem("");
    setErro(false);
    try {
      await api.delete(`/partida/${id}`);
      await carregarPartidas();
      setMensagem("Partida deletada com sucesso!");
      return true;
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao deletar partida");
      return false;
    }
  }

  useEffect(() => {
    carregarPartidas();
  }, []);

  return {
    partida: partida || [], loading, erros,
    partidas,
    mensagem,
    erro,
    carregarPartidas,
    criarPartida,
    setPartidas,
    editarPartida,
    deletarPartida,
    setMensagem,
    setErro
  };
};

export default usePartidas;