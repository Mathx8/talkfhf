import { useState, useEffect } from "react";

import useApi from "./useApi";
import api from "./api";

const useGrupos = () => {
  const { dados: grupoA, loading: loadingA, erro: erroA } = useApi("/grupo/1/classificacao");
  const { dados: grupoB, loading: loadingB, erro: erroB } = useApi("/grupo/2/classificacao");
  const loading = loadingA || loadingB;
  const erros = erroA || erroB;

  const [grupos, setGrupos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const carregarGrupos = async () => {
    try {
      const resp = await api.get("/grupo/view");
      setGrupos(resp.data);
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
    }
  };

  const criarGrupo = async ({ nome, liga_id }) => {
    setMensagem("");
    setErro(false);
    try {
      await api.post("/grupo/", { nome, liga_id })
      await carregarGrupos();
      setMensagem("Grupo criado com sucesso!");
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao criar grupo");
    }
  }

  const editarGrupo = async (id, dados) => {
    setMensagem("");
    setErro(false);
    try {
      await api.put(`/grupo/${id}`, dados);
      await carregarGrupos();
      setMensagem("Grupo atualizado com sucesso!");
      return true;
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao atualizar grupo");
      return false;
    }
  }

  const deletarGrupo = async (id) => {
    setMensagem("");
    setErro(false);
    try {
      await api.delete(`/grupo/${id}`);
      await carregarGrupos();
      setMensagem("Grupo deletado com sucesso!");
      return true;
    } catch (error) {
      setErro(true);
      setMensagem(error.response?.data?.mensagem || "Erro ao deletar grupo");
      return false;
    }
  }

  useEffect(() => {
    carregarGrupos();
  }, []);

  return {
    grupoA, grupoB, loading, erros,
    grupos,
    mensagem,
    erro,
    criarGrupo,
    setGrupos,
    editarGrupo,
    deletarGrupo,
    setMensagem,
    setErro
  };
};

export default useGrupos;