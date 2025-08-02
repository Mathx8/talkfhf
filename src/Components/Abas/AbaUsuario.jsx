import React, { useState } from "react";

import { Container, Form, Input, Select, Button, Mensagem } from "./styles"
import useUsuarios from "../../API/useUsuarios";
import TabelaAdmin from "../TabelaAdmin";

const AbaUsuario = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [papel, setPapel] = useState("editor");

  const { usuarios, mensagem, erro, criarUsuario } = useUsuarios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await criarUsuario({ username, senha, papel });
    setUsername("");
    setSenha("");
    setPapel("editor");
  };

  const dadosTabela = usuarios.map((u) => {
    return [u.username, u.papel]
  });

  return (
    <Container>
      <h2>Gerenciar Usuários</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Select value={papel} onChange={(e) => setPapel(e.target.value)}>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </Select>
        <Button type="submit">Criar Usuário</Button>
      </Form>
      {mensagem && <Mensagem erro={erro}>{mensagem}</Mensagem>}
      <div>
        <h3>Usuários existentes:</h3>
        <TabelaAdmin
                colunas={["Username", "Papel"]}
                dados={dadosTabela}
            />
      </div>
    </Container>
  );
};

export default AbaUsuario;