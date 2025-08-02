import React, { useState, useRef } from "react";

import { Container, Form, Select, Button, Mensagem, FormWrapper, FormTitle, BotaoRemover, ItemSelecionado, ListaSelecionados, NomeJogador } from "./styles"
import usePremiacao from "../../API/usePremiacao";
import useCompeticao from "../../API/useCompeticao";
import useTimes from "../../API/useTimes"
import useJogadores from "../../API/useJogadores";
import TabelaAdmin from "../TabelaAdmin";

const AbaPremiacao = () => {
    const [competicao, setCompeticao] = useState("");
    const [campeao, setCampeao] = useState("");
    const [mvp, setMvp] = useState("");
    const [artilheiro, setArtilheiro] = useState("");
    const [luvaOuro, setLuvaOuro] = useState("");
    const [revelacao, setRevelacao] = useState("");
    const [tops, setTops] = useState({
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

    const { premiacao, mensagem, erro, criarPremiacao, setPremiacoes, editarPremiacao, deletarPremiacao } = usePremiacao();
    const { competicoes } = useCompeticao();
    const { times } = useTimes();
    const { jogadores } = useJogadores();

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarPremiacao({
            competicao_id: parseInt(competicao),
            campeao_id: parseInt(campeao),
            mvp_id: parseInt(mvp),
            artilheiro_id: parseInt(artilheiro),
            luva_de_ouro_id: parseInt(luvaOuro),
            revelacao_id: parseInt(revelacao),
            top_gk: tops.GK.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_zag: tops.ZAG.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_mid: tops.MID.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_atk: tops.ATK.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
        });

        setLoadingCriar(false);
    };

    const adicionarTop = (pos) => {
        const id = parseInt(selecionado[pos]);
        if (!id) return;

        if (tops[pos].some(j => j.id === id) || tops[pos].length >= 3) return;

        const jogador = jogadores.find(j => j.id === id);
        if (jogador) {
            const novaPosicao = tops[pos].length + 1;

            const novo = {
                id: jogador.id,
                nome: jogador.nome,
                posicao: novaPosicao
            };

            setTops({
                ...tops,
                [pos]: [...tops[pos], novo]
            });

            setSelecionado({ ...selecionado, [pos]: "" });
        }
    };

    const removerTop = (pos, id) => {
        const novaLista = tops[pos]
            .filter(j => j.id !== id)
            .map((j, idx) => ({ ...j, posicao: idx + 1 }));

        setTops({
            ...tops,
            [pos]: novaLista
        });
    };

    const renderTopSelect = (pos, label) => (
        <div key={pos}>
            <FormTitle>{label}</FormTitle>
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
            <Button type="button" onClick={() => adicionarTop(pos)}>
                Adicionar {pos}
            </Button>
            <ListaSelecionados>
                {[...tops[pos]]
                    .sort((a, b) => a.posicao - b.posicao)
                    .map((j) => (
                        <ItemSelecionado key={j.id}>
                            <NomeJogador>{`TOP ${j.posicao} - ${j.nome}`}</NomeJogador>
                            <BotaoRemover onClick={() => removerTop(pos, j.id)}>❌</BotaoRemover>
                        </ItemSelecionado>
                    ))}
            </ListaSelecionados>
        </div>
    );

    const TimesSelecionados = times.filter(
        time => time.competicao?.id?.toString() === competicao
    );

    const formatarTops = (lista) => {
        if (!Array.isArray(lista)) return "";
        return lista
            .sort((a, b) => a.posicao - b.posicao)
            .map(j => `${j.posicao}-${j.nome}`)
            .join("\n");
    };

    const dadosTabela = premiacao.map((p) => {
        return [
            p.competicao, p.campeao, p.mvp, p.artilheiro, p.luva_de_ouro, p.revelacao,
            formatarTops(p.top_gk),
            formatarTops(p.top_zag),
            formatarTops(p.top_mid),
            formatarTops(p.top_atk)
        ];
    });

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({
        competicao: "",
        campeao: "",
        mvp: "",
        artilheiro: "",
        luvaOuro: "",
        revelacao: "",
        tops: {
            GK: [],
            ZAG: [],
            MID: [],
            ATK: []
        }
    });
    const editFormRef = useRef(null);

    const handleEditar = (index) => {
        const premio = premiacao[index];
        setIndiceEditando(index);

        const buscarJogadorPorNome = (nome) => jogadores.find(j => j.nome === nome);
        const buscarTimePorNome = (nome) => times.find(t => t.nome === nome);

        const buscarJogadoresPorNomes = (lista) => {
            if (!Array.isArray(lista)) return [];
            return lista
                .map(item => {
                    const nome = typeof item === "string" ? item : item.nome;
                    const jogador = jogadores.find(j => j.nome === nome);
                    return jogador
                        ? {
                            id: jogador.id,
                            nome: jogador.nome,
                            posicao: item.posicao
                        }
                        : null;
                })
                .filter(Boolean);
        }

        setDadosEdicao({
            competicao: premio.competicao?.toString() || "",
            campeao: buscarTimePorNome(premio.campeao)?.id?.toString() || "",
            mvp: buscarJogadorPorNome(premio.mvp)?.id?.toString() || "",
            artilheiro: buscarJogadorPorNome(premio.artilheiro)?.id?.toString() || "",
            luvaOuro: buscarJogadorPorNome(premio.luva_de_ouro)?.id?.toString() || "",
            revelacao: buscarJogadorPorNome(premio.revelacao)?.id?.toString() || "",
            tops: {
                GK: buscarJogadoresPorNomes(premio.top_gk),
                ZAG: buscarJogadoresPorNomes(premio.top_zag),
                MID: buscarJogadoresPorNomes(premio.top_mid),
                ATK: buscarJogadoresPorNomes(premio.top_atk),
            }
        });

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const premiacaoOriginal = premiacao[indiceEditando];
        const sucesso = await editarPremiacao(premiacaoOriginal.id, {
            competicao_id: parseInt(dadosEdicao.competicao),
            campeao_id: parseInt(dadosEdicao.campeao),
            mvp_id: parseInt(dadosEdicao.mvp),
            artilheiro_id: parseInt(dadosEdicao.artilheiro),
            luva_de_ouro_id: parseInt(dadosEdicao.luvaOuro),
            revelacao_id: parseInt(dadosEdicao.revelacao),
            top_gk: dadosEdicao.tops.GK.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_zag: dadosEdicao.tops.ZAG.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_mid: dadosEdicao.tops.MID.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
            top_atk: dadosEdicao.tops.ATK.map((j, idx) => ({ jogador_id: j.id, posicao: idx + 1 })),
        });

        if (sucesso) {
            const novaLista = [...premiacao];
            novaLista[indiceEditando] = {
                ...premiacaoOriginal,
                ...dadosEdicao
            };
            setPremiacoes(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar premiação.");
        }

        setLoadingSalvar(false);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({
            competicao: "",
            campeao: "",
            mvp: "",
            artilheiro: "",
            luvaOuro: "",
            revelacao: "",
            tops: { GK: [], ZAG: [], MID: [], ATK: [] }
        });
    };

    const handleExcluir = async (index) => {
        const premiacoes = premiacao[index];
        if (window.confirm(`Deseja excluir a premiação de ID: ${premiacoes.id}?`)) {
            const sucesso = await deletarPremiacao(premiacoes.id);

            if (sucesso) {
                const novaLista = premiacao.filter((_, i) => i !== index);
                setPremiacoes(novaLista);
            } else {
                alert("Erro ao excluir premiação.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Súmulas</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Nova Súmula</FormTitle>
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
                    <Select
                        value={campeao}
                        onChange={(e) => setCampeao(e.target.value)}
                    >
                        <option value="">Selecione o Campeão</option>
                        {TimesSelecionados.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.nome}
                            </option>
                        ))}
                    </Select>
                    <Select
                        value={mvp}
                        onChange={(e) => {
                            setMvp(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione o MVP</option>
                        {jogadores.map((j) => (
                            <option key={j.id} value={j.id}>
                                {j.nome}
                            </option>
                        ))}
                    </Select>
                    <Select
                        value={artilheiro}
                        onChange={(e) => {
                            setArtilheiro(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione o Artilheiro</option>
                        {jogadores.map((j) => (
                            <option key={j.id} value={j.id}>
                                {j.nome}
                            </option>
                        ))}
                    </Select>
                    <Select
                        value={luvaOuro}
                        onChange={(e) => {
                            setLuvaOuro(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione o Luva de Ouro</option>
                        {jogadores.map((j) => (
                            <option key={j.id} value={j.id}>
                                {j.nome}
                            </option>
                        ))}
                    </Select>
                    <Select
                        value={revelacao}
                        onChange={(e) => {
                            setRevelacao(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione a Revelação</option>
                        {jogadores.map((j) => (
                            <option key={j.id} value={j.id}>
                                {j.nome}
                            </option>
                        ))}
                    </Select>
                    {renderTopSelect("GK", "TOP 3 GK")}
                    {renderTopSelect("ZAG", "TOP 3 ZAG")}
                    {renderTopSelect("MID", "TOP 3 MID")}
                    {renderTopSelect("ATK", "TOP 3 ATK")}
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Súmula"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando premiação da competição ID {dadosEdicao.competicao}</FormTitle>

                        <Select
                            value={dadosEdicao.competicao}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, competicao: e.target.value })}
                            required
                        >
                            {competicoes.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nome}
                                </option>
                            ))}
                        </Select>

                        <Select
                            value={dadosEdicao.campeao}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, campeao: e.target.value })}
                        >
                            <option value="">Selecione o Campeão</option>
                            {times
                                .filter(t => t.competicao?.id?.toString() === dadosEdicao.competicao)
                                .map((time) => (
                                    <option key={time.id} value={time.id}>
                                        {time.nome}
                                    </option>
                                ))}
                        </Select>

                        {[["mvp", "MVP"], ["artilheiro", "Artilheiro"], ["luvaOuro", "Luva de Ouro"], ["revelacao", "Revelação"]].map(
                            ([campo, label]) => (
                                <Select
                                    key={campo}
                                    value={dadosEdicao[campo]}
                                    onChange={(e) => setDadosEdicao({ ...dadosEdicao, [campo]: e.target.value })}
                                >
                                    <option value="">{`Selecione ${label}`}</option>
                                    {jogadores.map((j) => (
                                        <option key={j.id} value={j.id}>
                                            {j.nome}
                                        </option>
                                    ))}
                                </Select>
                            )
                        )}

                        {["GK", "ZAG", "MID", "ATK"].map((pos) => (
                            <div key={pos}>
                                <FormTitle>TOP 3 {pos}</FormTitle>
                                <Select
                                    value={""}
                                    onChange={(e) => {
                                        const id = parseInt(e.target.value);
                                        const jogador = jogadores.find(j => j.id === id);
                                        if (
                                            jogador &&
                                            !dadosEdicao.tops[pos].some(j => j.id === jogador.id) &&
                                            dadosEdicao.tops[pos].length < 3
                                        ) {
                                            setDadosEdicao({
                                                ...dadosEdicao,
                                                tops: {
                                                    ...dadosEdicao.tops,
                                                    [pos]: [...dadosEdicao.tops[pos], jogador]
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <option value="">Selecione um jogador</option>
                                    {jogadores.map(j => (
                                        <option key={j.id} value={j.id}>
                                            {j.nome}
                                        </option>
                                    ))}
                                </Select>
                                <ListaSelecionados>
                                    {dadosEdicao.tops[pos].map((jogador, idx) => (
                                        <ItemSelecionado key={jogador.id}>
                                            <NomeJogador>{`TOP ${idx + 1} - ${jogador.nome}`}</NomeJogador>
                                            <BotaoRemover
                                                onClick={() =>
                                                    setDadosEdicao({
                                                        ...dadosEdicao,
                                                        tops: {
                                                            ...dadosEdicao.tops,
                                                            [pos]: dadosEdicao.tops[pos].filter(j => j.id !== jogador.id)
                                                        }
                                                    })
                                                }
                                            >
                                                ❌
                                            </BotaoRemover>
                                        </ItemSelecionado>
                                    ))}
                                </ListaSelecionados>
                            </div>
                        ))}

                        <div style={{ display: "flex", gap: "1rem" }}>
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
                <h3>Premiações existentes:</h3>
                <TabelaAdmin
                    colunas={["Competição", "Campeão", "MVP", "Artilheiro", "Luva de Ouro", "Revelação", "TOP GK", "TOP ZAG", "TOP MID", "TOP ATK"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    );
};

export default AbaPremiacao;