import { useState, useEffect } from "react";
import api from "./api";

const useApi = (endpoint, deps = []) => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await api.get(endpoint);
        setDados(res.data);
      } catch (err) {
        console.error("Erro completo:", err); 
        setErro(err.response?.data?.mensagem || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [endpoint]);

  return { dados, loading, erro };
};

export default useApi;