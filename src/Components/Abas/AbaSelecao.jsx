import React, { useState, useRef } from "react";
import { Container, Form, Select, Input, Button, Mensagem, FormWrapper, FormTitle, BotaoRemover, ItemSelecionado, ListaSelecionados, NomeJogador } from "./styles"
import useSelecao from "../../API/useSelecao";
import useCompeticao from "../../API/useCompeticao";
import useJogadores from "../../API/useJogadores";
import TabelaAdmin from "../TabelaAdmin";

const AbaSelecao = () => {
    const [competicao, setCompeticao] = useState("");
    const [rodada, setRodada] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [jogadoresDaRodada, setJogadoresDaRodada] = useState({
        GK: [],
        ZAG: [],
        MID: [],
        ATK: []
    });
    const [selecionado, setSelecionado] = useState({
        GK: "",
        ZAG: "",
        MID: "",
        ATK: ""
    });

    const { selecao, mensagem, erro, criarSelecao, setSelecoes, editarSelecao, deletarSelecao } = useSelecao();
    const { competicoes } = useCompeticao();
    const { jogadores } = useJogadores();

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const dadosTabela = selecao.map((s) => {
        return [
            s.id,
            s.competicao,
            s.rodada,
            s.observacoes,
            s.jogadores.map((j) => j.nome).join(" - "),
        ];
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarSelecao({
            rodada: rodada,
            competicao_id: parseInt(competicao),
            observacoes: observacoes,
            gk: jogadoresDaRodada.GK.map(j => j.id),
            zag: jogadoresDaRodada.ZAG.map(j => j.id),
            mid: jogadoresDaRodada.MID.map(j => j.id),
            atk: jogadoresDaRodada.ATK.map(j => j.id)
        });

        setRodada("");
        setObservacoes("");
        setJogadoresDaRodada({ GK: [], ZAG: [], MID: [], ATK: [] });
        setSelecionado({ GK: "", ZAG: "", MID: "", ATK: "" });

        setLoadingCriar(false);
    };

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({});
    const editFormRef = useRef(null);

    const handleEditar = (index) => {
        const selecaoSelecionada = selecao[index];
        setIndiceEditando(index);

        const buscarJogadoresPorNomes = (lista) => {
            if (!Array.isArray(lista)) return { GK: [], ZAG: [], MID: [], ATK: [] };

            const porPosicao = { GK: [], ZAG: [], MID: [], ATK: [] };

            lista.forEach(jogador => {
                const pos = jogador.categoria?.toUpperCase();
                if (["GK", "ZAG", "MID", "ATK"].includes(pos)) {
                    porPosicao[pos].push(jogador);
                }
            });

            return porPosicao;
        };

        const separados = buscarJogadoresPorNomes(selecaoSelecionada.jogadores);

        setDadosEdicao({
            rodada: selecaoSelecionada.rodada,
            competicao: selecaoSelecionada.competicao?.toString() || "",
            competicao_id: selecaoSelecionada.competicao_id,
            observacoes: selecaoSelecionada.observacoes,
            gk: separados.GK,
            zag: separados.ZAG,
            mid: separados.MID,
            atk: separados.ATK
        });

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const selecaoOriginal = selecao[indiceEditando];
        const sucesso = await editarSelecao(selecaoOriginal.id, {
            rodada: dadosEdicao.rodada,
            competicao_id: parseInt(dadosEdicao.competicao),
            observacoes: dadosEdicao.observacoes,
            gk: dadosEdicao.gk.map(j => j.id),
            zag: dadosEdicao.zag.map(j => j.id),
            mid: dadosEdicao.mid.map(j => j.id),
            atk: dadosEdicao.atk.map(j => j.id),
        });

        if (sucesso) {
            const novaLista = [...selecao];
            novaLista[indiceEditando] = {
                ...selecaoOriginal,
                rodada: dadosEdicao.rodada,
                observacoes: dadosEdicao.observacoes,
                competicao: competicoes.find(c => c.id === dadosEdicao.competicao_id)?.nome || "",
                competicao_id: dadosEdicao.competicao_id,
                jogadores: [
                    ...dadosEdicao.gk,
                    ...dadosEdicao.zag,
                    ...dadosEdicao.mid,
                    ...dadosEdicao.atk
                ]
            };
            setSelecoes(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar premiação.");
        }

        setLoadingSalvar(false);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({
            rodada: "",
            competicao: "",
            observacoes: "",
            gk: "",
            zag: "",
            mid: "",
            atk: ""
        });
    };

    const handleExcluir = async (index) => {
        const selecoes = selecao[index];
        if (window.confirm(`Deseja excluir ${selecoes.id}?`)) {
            const sucesso = await deletarSelecao(selecoes.id);

            if (sucesso) {
                const novaLista = selecao.filter((_, i) => i !== index);
                setSelecoes(novaLista);
            } else {
                alert("Erro ao excluir seleção.");
            }
        }
    };

    const adicionarJogador = (pos) => {
        const id = parseInt(selecionado[pos]);
        if (!id) return;

        if (jogadoresDaRodada[pos].some(j => j.id === id)) return;

        const jogador = jogadores.find(j => j.id === id);
        if (!jogador) return;

        setJogadoresDaRodada({
            ...jogadoresDaRodada,
            [pos]: [...jogadoresDaRodada[pos], jogador]
        });

        setSelecionado({ ...selecionado, [pos]: "" });
    };

    const removerJogador = (pos, id) => {
        setJogadoresDaRodada({
            ...jogadoresDaRodada,
            [pos]: jogadoresDaRodada[pos].filter(j => j.id !== id)
        });
    };

    const renderSelectPosicao = (pos, label) => (
        <div key={pos}>
            <FormTitle>{label}</FormTitle>
            <Select
                value={selecionado[pos]}
                onChange={(e) =>
                    setSelecionado({ ...selecionado, [pos]: e.target.value })
                }
            >
                <option value="">Selecione um jogador</option>
                {jogadores.map(j => (
                    <option key={j.id} value={j.id}>
                        {j.nome}
                    </option>
                ))}
            </Select>
            <Button type="button" onClick={() => adicionarJogador(pos)}>
                Adicionar
            </Button>
            <ListaSelecionados>
                {jogadoresDaRodada[pos].map(j => (
                    <ItemSelecionado key={j.id}>
                        <NomeJogador>{j.nome}</NomeJogador>
                        <BotaoRemover onClick={() => removerJogador(pos, j.id)}>
                            ❌
                        </BotaoRemover>
                    </ItemSelecionado>
                ))}
            </ListaSelecionados>
        </div>
    );

    return (
        <Container>
            <h2>Gerenciar Seleção da Rodada</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Nova Seleção da Rodada</FormTitle>
                    <Select
                        value={competicao}
                        onChange={(e) => {
                            setCompeticao(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione a competição</option>
                        {competicoes.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                                {comp.nome}
                            </option>
                        ))}
                    </Select>
                    <Input
                        type="text"
                        placeholder="Rodada"
                        value={rodada}
                        onChange={(e) => setRodada(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Observações (Opcional)"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                    />
                    {renderSelectPosicao("GK", "Goleiros")}
                    {renderSelectPosicao("ZAG", "Zagueiros")}
                    {renderSelectPosicao("MID", "Meio-Campistas")}
                    {renderSelectPosicao("ATK", "Atacantes")}
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Seleção da Rodada"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando Seleção da Rodada: {dadosEdicao.rodada?.slice(2)} - {dadosEdicao.competicao}</FormTitle>

                        <Select
                            value={dadosEdicao.competicao_id}
                            onChange={(e) => {
                                const valor = parseInt(e.target.value);
                                setDadosEdicao({
                                    ...dadosEdicao,
                                    competicao_id: valor,
                                    competicao: valor.toString(),
                                });
                            }}
                            required
                        >
                            {competicoes.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nome}
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="text"
                            placeholder="Rodada"
                            value={dadosEdicao.rodada}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, rodada: e.target.value })}
                            required
                        />

                        <Input
                            type="text"
                            placeholder="Observações (Opcional)"
                            value={dadosEdicao.observacoes}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, observacoes: e.target.value })}
                        />

                        {["GK", "ZAG", "MID", "ATK"].map((pos) => (
                            <div key={pos}>
                                <FormTitle>{{
                                    GK: "Goleiros",
                                    ZAG: "Zagueiros",
                                    MID: "Meio-Campistas",
                                    ATK: "Atacantes"
                                }[pos]}</FormTitle>

                                <Select
                                    value={selecionado[pos]}
                                    onChange={(e) => setSelecionado({ ...selecionado, [pos]: e.target.value })}
                                >
                                    <option value="">Selecione um jogador</option>
                                    {jogadores.map(j => (
                                        <option key={j.id} value={j.id}>
                                            {j.nome}
                                        </option>
                                    ))}
                                </Select>

                                <Button
                                    type="button"
                                    onClick={() => {
                                        const id = parseInt(selecionado[pos]);
                                        if (!id) return;
                                        const jogador = jogadores.find(j => j.id === id);
                                        if (!jogador) return;
                                        if (dadosEdicao[pos.toLowerCase()].some(j => j.id === id)) return;
                                        setDadosEdicao({
                                            ...dadosEdicao,
                                            [pos.toLowerCase()]: [...dadosEdicao[pos.toLowerCase()], jogador]
                                        });
                                        setSelecionado({ ...selecionado, [pos]: "" });
                                    }}
                                >
                                    Adicionar
                                </Button>

                                <ListaSelecionados>
                                    {dadosEdicao[pos.toLowerCase()].map(j => (
                                        <ItemSelecionado key={j.id}>
                                            <NomeJogador>{j.nome}</NomeJogador>
                                            <BotaoRemover onClick={() =>
                                                setDadosEdicao({
                                                    ...dadosEdicao,
                                                    [pos.toLowerCase()]: dadosEdicao[pos.toLowerCase()].filter(p => p.id !== j.id)
                                                })
                                            }>
                                                ❌
                                            </BotaoRemover>
                                        </ItemSelecionado>
                                    ))}
                                </ListaSelecionados>
                            </div>
                        ))}

                        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                            <Button
                                type="button"
                                cor="#00ff88"
                                onClick={handleSalvar}
                                disabled={loadingSalvar}
                            >
                                {loadingSalvar ? "Salvando..." : "Salvar"}
                            </Button>
                            <Button type="button" cor="#ff4d4d" onClick={handleCancelar}>
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                )}
            </FormWrapper>
            {mensagem && <Mensagem erro={erro}>{mensagem}</Mensagem>}
            <div>
                <h3>Seleções existentes:</h3>
                <TabelaAdmin
                    colunas={["#", "Competição", "Rodada", "Observações", "Jogadores"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    )
}

export default AbaSelecao;