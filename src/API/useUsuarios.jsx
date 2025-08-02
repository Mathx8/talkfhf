import { useState, useEffect } from "react";
import api from "./api";

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const carregarUsuarios = async () => {
    try {
      const resp = await api.get("/auth/listar");
      setUsuarios(resp.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const criarUsuario = async ({ username, senha, papel }) => {
    setMensagem("");
    setErro(false);
    try {
      await api.post("/auth/register", { username, senha, papel });
      await carregarUsuarios();
      setMensagem("Usuário criado com sucesso!");
    } catch (err) {
      setErro(true);
      setMensagem(err.response?.data?.mensagem || "Erro ao criar usuário");
    }
  };

  const loginUsuario = async ({ username, senha }) => {
    setMensagem("");
    setErro(false);
    try {
      const response = await api.post("/auth/login", { username, senha });
      const { access_token, papel } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("papel", papel);
      localStorage.setItem("username", username);
      localStorage.setItem("loginTimestamp", Date.now().toString());

      setMensagem("Login realizado com sucesso!");
      return { sucesso: true, token: access_token, papel };
    } catch (err) {
      setErro(true);
      setMensagem("Usuário ou senha inválidos");
      return { sucesso: false };
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return {
    usuarios,
    mensagem,
    erro,
    criarUsuario,
    loginUsuario,
    setMensagem,
    setErro,
  };
};

export default useUsuarios;
