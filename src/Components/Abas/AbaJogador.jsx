import React, { useState, useRef } from "react";
import { Container, Form, Input, Select, Button, Mensagem, FormWrapper, FormTitle } from "./styles";
import useJogadores from "../../API/useJogadores";
import TabelaAdmin from "../TabelaAdmin";

const AbaJogador = () => {
    const [nome, setNome] = useState("");
    const [nacionalidade, setNacionalidade] = useState("Brasileiro");
    const [posicao, setPosicao] = useState("GK");

    const { jogadores, mensagem, erro, criarJogador, setJogadores, editarJogador, deletarJogador } = useJogadores();

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({ nome: "", posicao: "", nacionalidade: "Brasileiro" });
    const editFormRef = useRef(null);

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarJogador({ nome, posicao, nacionalidade });
        setNome("");
        setNacionalidade("Brasileiro");
        setPosicao("GK");

        setLoadingCriar(false);
    };

    const dadosTabela = jogadores.map((j) => {
        const link = `https://hubbe.biz/avatar/${j.nome}?&img_format=png&headonly=2`;
        const fotoJogador = <img src={link} alt="" />;
        const nomeTime = Array.isArray(j.times) && j.times.length > 0
            ? j.times.map((jt) => jt.nome).join(", ")
            : "Sem time";

        return [fotoJogador, j.nome, j.nacionalidade, j.posicao, nomeTime];
    });

    const handleEditar = (index) => {
        const jogador = jogadores[index];
        setIndiceEditando(index);
        setDadosEdicao({
            nome: jogador.nome,
            posicao: jogador.posicao,
            nacionalidade: jogador.nacionalidade || "Brasileiro"
        });

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({ nome: "", posicao: "", nacionalidade: "Brasileiro" });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);
        
        const jogadorOriginal = jogadores[indiceEditando];
        const atualizado = { ...jogadorOriginal, ...dadosEdicao };
        const sucesso = await editarJogador(jogadorOriginal.id, atualizado);

        if (sucesso) {
            const novaLista = [...jogadores];
            novaLista[indiceEditando] = atualizado;
            setJogadores(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar jogador.");
        }

        setLoadingSalvar(false);
    };

    const handleExcluir = async (index) => {
        const jogador = jogadores[index];
        if (window.confirm(`Deseja excluir ${jogador.nome}?`)) {
            const sucesso = await deletarJogador(jogador.id);
            if (sucesso) {
                const novaLista = jogadores.filter((_, i) => i !== index);
                setJogadores(novaLista);
            } else {
                alert("Erro ao excluir jogador.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Jogadores</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Novo Jogador</FormTitle>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <Select
                        value={nacionalidade}
                        onChange={(e) => setNacionalidade(e.target.value)}
                    >
                        <option value="Brasileiro">Brasileiro</option>
                        <option value="Chileno">Chileno</option>
                        <option value="Colombiano">Colombiano</option>
                        <option value="Espanhol">Espanhol</option>
                        <option value="Italiano">Italiano</option>
                        <option value="Mexicano">Mexicano</option>
                        <option value="Português">Português</option>
                        <option value="Venezuelano">Venezuelano</option>
                    </Select>
                    <Select
                        value={posicao}
                        onChange={(e) => setPosicao(e.target.value)}
                        required
                    >
                        <option value="GK">GK</option>
                        <option value="ZAG">ZAG</option>
                        <option value="MID">MID</option>
                        <option value="ATK">ATK</option>
                    </Select>
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Jogador"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando: {jogadores[indiceEditando].nome}</FormTitle>
                        <Input
                            type="text"
                            placeholder="Nome"
                            value={dadosEdicao.nome}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, nome: e.target.value })
                            }
                            required
                        />
                        <Select
                            value={dadosEdicao.nacionalidade}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, nacionalidade: e.target.value })
                            }
                        >
                            <option value="Brasileiro">Brasileiro</option>
                            <option value="Chileno">Chileno</option>
                            <option value="Colombiano">Colombiano</option>
                            <option value="Espanhol">Espanhol</option>
                            <option value="Italiano">Italiano</option>
                            <option value="Mexicano">Mexicano</option>
                            <option value="Português">Português</option>
                            <option value="Venezuelano">Venezuelano</option>
                        </Select>
                        <Select
                            value={dadosEdicao.posicao}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, posicao: e.target.value })
                            }
                            required
                        >
                            <option value="GK">GK</option>
                            <option value="ZAG">ZAG</option>
                            <option value="MID">MID</option>
                            <option value="ATK">ATK</option>
                        </Select>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <Button
                                type="button"
                                cor="#00ff88"
                                onClick={handleSalvar}
                                disabled={loadingSalvar}
                            >
                                {loadingSalvar ? "Salvando..." : "Salvar"}
                            </Button>
                            <Button
                                type="button"
                                cor="#ff4d4d"
                                onClick={handleCancelar}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                )}
            </FormWrapper>

            {mensagem && <Mensagem erro={erro}>{mensagem}</Mensagem>}
            <div>
                <h3>Jogadores existentes:</h3>
                <TabelaAdmin
                    colunas={["#", "Nome", "Nacionalidade", "Posição", "Time"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    );
};

export default AbaJogador;