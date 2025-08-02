import React, { useState, useRef } from "react";

import { Container, Form, Input, Select, Button, Mensagem, FormWrapper, FormTitle } from "./styles"
import useGrupos from "../../API/useGrupos";
import useCompeticao from "../../API/useCompeticao";
import TabelaAdmin from "../TabelaAdmin";

const AbaGrupo = () => {
    const [nome, setNome] = useState("");
    const [liga, setLiga] = useState("");

    const { grupos, mensagem, erro, criarGrupo, setGrupos, editarGrupo, deletarGrupo } = useGrupos();
    const { competicoes } = useCompeticao();

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({ nome: "", liga: "" });
    const editFormRef = useRef(null);

    const dadosTabela = grupos.map((g) => {
        const nomeTimes = g.times && g.times.length > 0
            ? g.times.map((t) => t.nome).join(", ")
            : "Sem Times";

        const ligaObj = competicoes.find((c) => c.id === g.liga_id);
        const nomeLiga = ligaObj ? ligaObj.nome : "Desconhecida";

        return [g.nome, nomeTimes, nomeLiga]
    });

    const ligas = competicoes.filter((comp) => comp.tipo === "liga");

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarGrupo({ nome, liga });
        setNome("");
        setLiga("");

        setLoadingCriar(false);
    };

    const handleEditar = (index) => {
        const grupo = grupos[index];
        setIndiceEditando(index);
        setDadosEdicao({ nome: grupo.nome, liga: grupo.liga_id.toString() })

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({ nome: "", liga: "" });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const grupoOriginal = grupos[indiceEditando];
        const atualizado = {
            nome: dadosEdicao.nome,
            liga_id: parseInt(dadosEdicao.liga),
        };
        const sucesso = await editarGrupo(grupoOriginal.id, atualizado);

        if (sucesso) {
            const novaLista = [...grupos];
            novaLista[indiceEditando] = atualizado;
            setGrupos(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar grupo.");
        }

        setLoadingSalvar(false);
    };

    const handleExcluir = async (index) => {
        const grupo = grupos[index];
        if (window.confirm(`Deseja excluir ${grupo.nome}?`)) {
            const sucesso = await deletarGrupo(grupo.id);

            if (sucesso) {
                const novaLista = grupos.filter((_, i) => i !== index);
                setGrupos(novaLista);
            } else {
                alert("Erro ao excluir grupo.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Grupos</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Novo Grupo</FormTitle>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <Select
                        value={liga}
                        onChange={(e) => setLiga(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma liga</option>
                        {ligas.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                                {comp.nome}
                            </option>
                        ))}
                    </Select>
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Grupo"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando: {grupos[indiceEditando].nome}</FormTitle>
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
                            value={dadosEdicao.liga}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, liga: e.target.value })
                            }
                            required
                        >
                            {ligas.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nome}
                                </option>
                            ))}
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
                <h3>Grupos existentes:</h3>
                <TabelaAdmin
                    colunas={["Nome", "Times", "Liga"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    )
}

export default AbaGrupo;