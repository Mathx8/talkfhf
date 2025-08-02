import React, { useState, useRef } from "react";

import { Container, Form, Input, Select, Button, Mensagem, FormWrapper, FormTitle } from "./styles"
import useCompeticao from "../../API/useCompeticao";
import TabelaAdmin from "../TabelaAdmin";

const AbaCompeticao = () => {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("liga");

    const { competicoes, mensagem, erro, criarCompeticao, setCompeticao, editarCompeticao, deletarCompeticao } = useCompeticao();

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({ nome: "", tipo: "" });
    const editFormRef = useRef(null);

    const dadosTabela = competicoes.map((c) => {
        return [c.nome, c.tipo]
    })

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarCompeticao({ nome, tipo });
        setNome("");
        setTipo("liga");

        setLoadingCriar(false);
    }

    const handleEditar = (index) => {
        const competicao = competicoes[index];
        setIndiceEditando(index);
        setDadosEdicao({ nome: competicao.nome, tipo: competicao.tipo })

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({ nome: "", tipo: "" });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const competicaoOriginal = competicoes[indiceEditando];
        const atualizado = { ...competicaoOriginal, ...dadosEdicao };
        const sucesso = await editarCompeticao(competicaoOriginal.id, atualizado);

        if (sucesso) {
            const novaLista = [...competicoes];
            novaLista[indiceEditando] = atualizado;
            setCompeticao(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar competição.");
        }

        setLoadingSalvar(false);
    };

    const handleExcluir = async (index) => {
        const competicao = competicoes[index];
        if (window.confirm(`Deseja excluir ${competicao.nome}?`)) {
            const sucesso = await deletarCompeticao(competicao.id);

            if (sucesso) {
                const novaLista = competicoes.filter((_, i) => i !== index);
                setCompeticao(novaLista);
            } else {
                alert("Erro ao excluir competição.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Competições</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Nova Competição</FormTitle>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="liga">Liga</option>
                        <option value="torneio">Torneio</option>
                    </Select>
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Competição"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando: {competicoes[indiceEditando].nome}</FormTitle>
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
                            value={dadosEdicao.tipo}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, tipo: e.target.value })
                            }
                            required
                        >
                            <option value="liga">Liga</option>
                            <option value="torneio">Torneio</option>
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
                <h3>Competições existentes:</h3>
                <TabelaAdmin
                    colunas={["Nome", "Tipo"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    );
};

export default AbaCompeticao;