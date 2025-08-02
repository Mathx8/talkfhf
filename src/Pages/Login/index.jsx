import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginWrapper, LoginCard, Title, Input, Button, Error} from "./styles";
import useUsuarios from "../../API/useUsuarios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const { loginUsuario, mensagem } = useUsuarios();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await loginUsuario({ username, senha });

    if (resultado.sucesso) {
      onLogin?.({ token: resultado.token, papel: resultado.papel });
      navigate("/gerenciador");
    }
  };

  return (
    <LoginWrapper>
      <LoginCard as="form" onSubmit={handleSubmit}>
        <Title>LOGIN</Title>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {mensagem && <Error>{mensagem}</Error>}
        <Button type="submit">ENTRAR</Button>
      </LoginCard>
    </LoginWrapper>
  );
}

export default Login;
