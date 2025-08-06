import React, { useState, useRef } from "react";

import { Container, Form, Select, Button, Mensagem, FormWrapper, FormTitle, BotaoRemover, ItemSelecionado, ListaSelecionados, NomeJogador } from "./styles"
import useSumula from "../../API/useSumula";
import usePartidas from "../../API/usePartidas";
import useJogadores from "../../API/useJogadores";
import TabelaAdmin from "../TabelaAdmin";

const AbaSumula = () => {
    const [idPartida, setIdPartida] = useState("");
    const [mvpId, setMvpId] = useState("");
    const [gols, setGols] = useState([]);
    const [cleansheets, setCleansheets] = useState([]);
    const [cartoes, setCartoes] = useState([]);

    const { sumulas, mensagem, erro, criarSumula, setSumulas, editarSumula, deletarSumula } = useSumula();
    const { partida } = usePartidas();
    const { jogadores } = useJogadores();

    const [gol, setGol] = useState({ jogador_id: "", assistencia_id: "", contra: false });
    const [cleansheetJogadorId, setCleansheetJogadorId] = useState("");
    const [cartao, setCartao] = useState({ jogador_id: "", tipo: "" });

    const partidasComSumula = sumulas.map(s => s.partida_id);
    const partidasDisponiveis = partida.filter(p => !partidasComSumula.includes(p.id));

    const partidaSelecionada = partida.find(p => p.id === parseInt(idPartida));

    const jogadoresDaPartida = jogadores.filter(j =>
        j.times?.some(t => {
            const nomeTime = t.nome?.toLowerCase().trim();
            const casa = partidaSelecionada?.time_casa?.toLowerCase().trim();
            const fora = partidaSelecionada?.time_fora?.toLowerCase().trim();
            return nomeTime === casa || nomeTime === fora;
        })
    );

    const handleAdicionarGol = () => {
        if (!gol.jogador_id) return;
        setGols([...gols, {
            jogador_id: parseInt(gol.jogador_id),
            assistencia_id: gol.assistencia_id ? parseInt(gol.assistencia_id) : null,
            contra: gol.contra
        }]);
        setGol({ jogador_id: "", assistencia_id: "", contra: false });
    };

    const handleRemoverGol = (index) => {
        setGols(gols.filter((_, i) => i !== index));
    };

    const handleAdicionarCartao = () => {
        if (!cartao.jogador_id || !cartao.tipo) return;
        setCartoes([...cartoes, {
            jogador_id: parseInt(cartao.jogador_id),
            tipo: cartao.tipo
        }]);
        setCartao({ jogador_id: "", tipo: "" });
    };

    const handleRemoverCartao = (index) => {
        setCartoes(cartoes.filter((_, i) => i !== index));
    };

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarSumula({
            partida_id: parseInt(idPartida),
            mvp_id: parseInt(mvpId),
            gols,
            cleansheets,
            cartoes
        });

        setIdPartida("");
        setMvpId("");
        setGols([]);
        setCleansheets([]);
        setCartoes([]);

        setLoadingCriar(false);
    };

    const formatarGols = (gols) => {
        if (!Array.isArray(gols) || gols.length === 0) return "Sem Gols";
        return gols.map((g, i) => {
            const contra = g.tipo === "contra" ? " (Contra)" : "";
            const assist = g.assistencia ? ` (Assist: ${g.assistencia})` : "";
            return `${i + 1}. ${g.autor}${assist}${contra}`;
        }).join(" | ");
    };

    const formatarCleansheets = (lista) => {
        if (!Array.isArray(lista) || lista.length === 0) return "Nenhum";
        return lista.map(item => item.jogador || "?").join(" | ");
    };

    const formatarCartoes = (cartoes) => {
        if (!Array.isArray(cartoes) || cartoes.length === 0) return "Sem cartões";
        return cartoes.map((c, i) => `${i + 1}. ${c.jogador} (${c.tipo})`).join(" | ");
    };

    const dadosTabela = sumulas.map((s) => {
        return [
            s.partida_id,
            s.mvp,
            formatarGols(s.gols),
            formatarCleansheets(s.cleansheets),
            formatarCartoes(s.cartoes)
        ];
    });

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({
        partida_id: "",
        mvp_id: "",
        gols: [],
        cleansheets: [],
        cartoes: []
    });
    const editFormRef = useRef(null);

    const handleEditar = (index) => {
        const sumula = sumulas[index];
        setIndiceEditando(index);

        const partida = sumula.partida_id;
        const mvpJogador = jogadores.find(j => j.nome === sumula.mvp);
        const mvp_id = mvpJogador?.id || "";

        const gols = sumula.gols.map(g => {
            const autor = jogadores.find(j => j.nome === g.autor);
            const assist = g.assistencia ? jogadores.find(j => j.nome === g.assistencia) : null;
            return {
                jogador_id: autor?.id || 0,
                assistencia_id: assist?.id || null,
                contra: g.tipo === "contra"
            };
        });

        const cleansheets = sumula.cleansheets.map(item => {
            const jogador = jogadores.find(j => j.nome === item.jogador);
            return jogador?.id || 0;
        });

        const cartoes = sumula.cartoes.map(c => {
            const jogador = jogadores.find(j => j.nome === c.jogador);
            return {
                jogador_id: jogador?.id || 0,
                tipo: c.tipo
            };
        });

        setDadosEdicao({
            id: sumula.id,
            partida_id: partida,
            mvp_id,
            gols,
            cleansheets,
            cartoes
        });

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({
            partida_id: "",
            mvp_id: "",
            gols: [],
            cleansheets: [],
            cartoes: []
        });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);
        const sumulaOriginal = sumulas[indiceEditando];

        const sucesso = await editarSumula(sumulaOriginal.id, {
            partida_id: parseInt(dadosEdicao.partida_id),
            mvp_id: parseInt(dadosEdicao.mvp_id),
            gols: dadosEdicao.gols,
            cleansheets: dadosEdicao.cleansheets,
            cartoes: dadosEdicao.cartoes
        });

        if (sucesso) {
            const novaLista = [...sumulas];
            novaLista[indiceEditando] = {
                ...sumulaOriginal,
                ...dadosEdicao
            };
            setSumulas(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar súmula.");
        }

        setLoadingSalvar(false);
    };

    const handleExcluir = async (index) => {
        const sumula = sumulas[index];
        if (window.confirm(`Deseja excluir a súmula da partida ${sumula.partida_id}?`)) {
            const sucesso = await deletarSumula(sumula.id);

            if (sucesso) {
                const novaLista = sumulas.filter((_, i) => i !== index);
                setSumulas(novaLista);
            } else {
                alert("Erro ao excluir súmula.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Súmulas</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Nova Súmula</FormTitle>

                    <Select value={idPartida} onChange={(e) => setIdPartida(e.target.value)} required>
                        <option value="">Selecione a partida</option>
                        {partidasDisponiveis.map(p => (
                            <option key={p.id} value={p.id}>
                                {`[${p.competicao}]: ${p.time_casa} (${p.gols_casa}) vs (${p.gols_fora}) ${p.time_fora} - ${p.rodada}`}
                            </option>
                        ))}
                    </Select>

                    <Select value={mvpId} onChange={(e) => setMvpId(e.target.value)} required>
                        <option value="">Selecione o MVP</option>
                        {jogadoresDaPartida.map(j => (
                            <option key={j.id} value={j.id}>{j.nome}</option>
                        ))}
                    </Select>

                    <FormTitle>Gols</FormTitle>
                    <Select value={gol.jogador_id} onChange={(e) => setGol({ ...gol, jogador_id: e.target.value })}>
                        <option value="">Autor do Gol</option>
                        {jogadoresDaPartida.map(j => (
                            <option key={j.id} value={j.id}>{j.nome}</option>
                        ))}
                    </Select>
                    <Select value={gol.assistencia_id} onChange={(e) => setGol({ ...gol, assistencia_id: e.target.value })}>
                        <option value="">Assistência (opcional)</option>
                        {jogadoresDaPartida.map(j => (
                            <option key={j.id} value={j.id}>{j.nome}</option>
                        ))}
                    </Select>
                    <label>
                        <input
                            type="checkbox"
                            checked={gol.contra}
                            onChange={(e) => setGol({ ...gol, contra: e.target.checked })}
                        /> Contra
                    </label>
                    <Button type="button" onClick={handleAdicionarGol}>Adicionar Gol</Button>

                    <ListaSelecionados>
                        {gols.map((g, i) => (
                            <ItemSelecionado key={i}>
                                <NomeJogador>
                                    {`Gol ${i + 1} - ${jogadores.find(j => j.id === g.jogador_id)?.nome || "?"}`}
                                    {g.assistencia_id && ` (Assist: ${jogadores.find(j => j.id === g.assistencia_id)?.nome})`}
                                    {g.contra && " (Contra)"}
                                </NomeJogador>
                                <BotaoRemover onClick={() => handleRemoverGol(i)}>❌</BotaoRemover>
                            </ItemSelecionado>
                        ))}
                    </ListaSelecionados>

                    <FormTitle>Cleansheets</FormTitle>
                    <Select value={cleansheetJogadorId} onChange={(e) => setCleansheetJogadorId(e.target.value)}>
                        <option value="">Jogador</option>
                        {jogadoresDaPartida.map(j => (
                            <option key={j.id} value={j.id}>{j.nome}</option>
                        ))}
                    </Select>
                    <Button
                        type="button"
                        onClick={() => {
                            if (!cleansheetJogadorId || cleansheets.includes(parseInt(cleansheetJogadorId))) return;
                            setCleansheets([...cleansheets, parseInt(cleansheetJogadorId)]);
                            setCleansheetJogadorId("");
                        }}
                    >
                        Adicionar Cleansheet
                    </Button>

                    <ListaSelecionados>
                        {cleansheets.map((id, i) => (
                            <ItemSelecionado key={i}>
                                <NomeJogador>{jogadores.find(j => j.id === id)?.nome || "?"}</NomeJogador>
                                <BotaoRemover onClick={() => setCleansheets(cleansheets.filter(c => c !== id))}>
                                    ❌
                                </BotaoRemover>
                            </ItemSelecionado>
                        ))}
                    </ListaSelecionados>

                    <FormTitle>Cartões</FormTitle>
                    <Select value={cartao.jogador_id} onChange={(e) => setCartao({ ...cartao, jogador_id: e.target.value })}>
                        <option value="">Jogador</option>
                        {jogadoresDaPartida.map(j => (
                            <option key={j.id} value={j.id}>{j.nome}</option>
                        ))}
                    </Select>
                    <Select value={cartao.tipo} onChange={(e) => setCartao({ ...cartao, tipo: e.target.value })}>
                        <option value="">Tipo</option>
                        <option value="amarelo">Amarelo</option>
                        <option value="vermelho">Vermelho</option>
                    </Select>
                    <Button type="button" onClick={handleAdicionarCartao}>Adicionar Cartão</Button>

                    <ListaSelecionados>
                        {cartoes.map((c, i) => (
                            <ItemSelecionado key={i}>
                                <NomeJogador>
                                    {`${jogadores.find(j => j.id === c.jogador_id)?.nome} - ${c.tipo}`}
                                </NomeJogador>
                                <BotaoRemover onClick={() => handleRemoverCartao(i)}>❌</BotaoRemover>
                            </ItemSelecionado>
                        ))}
                    </ListaSelecionados>
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Súmula"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando Súmula da Partida #{dadosEdicao.partida_id}</FormTitle>
                        <Select
                            value={dadosEdicao.mvp_id}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, mvp_id: e.target.value })}
                            required
                        >
                            <option value="">Selecione o MVP</option>
                            {jogadores.map(j => (
                                <option key={j.id} value={j.id}>{j.nome}</option>
                            ))}
                        </Select>

                        <FormTitle>Gols</FormTitle>
                        <Select
                            value={gol.jogador_id}
                            onChange={(e) => setGol({ ...gol, jogador_id: e.target.value })}
                        >
                            <option value="">Autor do Gol</option>
                            {jogadores.map(j => (
                                <option key={j.id} value={j.id}>{j.nome}</option>
                            ))}
                        </Select>
                        <Select
                            value={gol.assistencia_id}
                            onChange={(e) => setGol({ ...gol, assistencia_id: e.target.value })}
                        >
                            <option value="">Assistência (opcional)</option>
                            {jogadores.map(j => (
                                <option key={j.id} value={j.id}>{j.nome}</option>
                            ))}
                        </Select>
                        <label>
                            <input
                                type="checkbox"
                                checked={gol.contra}
                                onChange={(e) => setGol({ ...gol, contra: e.target.checked })}
                            /> Contra
                        </label>
                        <Button
                            type="button"
                            onClick={() => {
                                if (!gol.jogador_id) return;
                                setDadosEdicao({
                                    ...dadosEdicao,
                                    gols: [
                                        ...dadosEdicao.gols,
                                        {
                                            jogador_id: parseInt(gol.jogador_id),
                                            assistencia_id: gol.assistencia_id ? parseInt(gol.assistencia_id) : null,
                                            contra: gol.contra
                                        }
                                    ]
                                });
                                setGol({ jogador_id: "", assistencia_id: "", contra: false });
                            }}
                        >
                            Adicionar Gol
                        </Button>

                        <ListaSelecionados>
                            {dadosEdicao.gols.map((g, i) => (
                                <ItemSelecionado key={i}>
                                    <NomeJogador>
                                        {`Gol ${i + 1} - ${jogadores.find(j => j.id === g.jogador_id)?.nome || "?"}`}
                                        {g.assistencia_id && ` (Assist: ${jogadores.find(j => j.id === g.assistencia_id)?.nome})`}
                                        {g.contra && " (Contra)"}
                                    </NomeJogador>
                                    <BotaoRemover onClick={() => {
                                        const novosGols = [...dadosEdicao.gols];
                                        novosGols.splice(i, 1);
                                        setDadosEdicao({ ...dadosEdicao, gols: novosGols });
                                    }}>❌</BotaoRemover>
                                </ItemSelecionado>
                            ))}
                        </ListaSelecionados>

                        <FormTitle>Cleansheets</FormTitle>
                        <Select value={cleansheetJogadorId} onChange={(e) => setCleansheetJogadorId(e.target.value)}>
                            <option value="">Jogador</option>
                            {jogadores.map(j => (
                                <option key={j.id} value={j.id}>{j.nome}</option>
                            ))}
                        </Select>
                        <Button
                            type="button"
                            onClick={() => {
                                const id = parseInt(cleansheetJogadorId);
                                if (!id || dadosEdicao.cleansheets.includes(id)) return;
                                setDadosEdicao({ ...dadosEdicao, cleansheets: [...dadosEdicao.cleansheets, id] });
                                setCleansheetJogadorId("");
                            }}
                        >
                            Adicionar Cleansheet
                        </Button>
                        <ListaSelecionados>
                            {dadosEdicao.cleansheets.map((id, i) => (
                                <ItemSelecionado key={i}>
                                    <NomeJogador>{jogadores.find(j => j.id === id)?.nome || "?"}</NomeJogador>
                                    <BotaoRemover onClick={() => {
                                        const novaLista = dadosEdicao.cleansheets.filter(c => c !== id);
                                        setDadosEdicao({ ...dadosEdicao, cleansheets: novaLista });
                                    }}>❌</BotaoRemover>
                                </ItemSelecionado>
                            ))}
                        </ListaSelecionados>

                        <FormTitle>Cartões</FormTitle>
                        <Select value={cartao.jogador_id} onChange={(e) => setCartao({ ...cartao, jogador_id: e.target.value })}>
                            <option value="">Jogador</option>
                            {jogadores.map(j => (
                                <option key={j.id} value={j.id}>{j.nome}</option>
                            ))}
                        </Select>
                        <Select value={cartao.tipo} onChange={(e) => setCartao({ ...cartao, tipo: e.target.value })}>
                            <option value="">Tipo</option>
                            <option value="amarelo">Amarelo</option>
                            <option value="vermelho">Vermelho</option>
                        </Select>
                        <Button
                            type="button"
                            onClick={() => {
                                if (!cartao.jogador_id || !cartao.tipo) return;
                                setDadosEdicao({
                                    ...dadosEdicao,
                                    cartoes: [...dadosEdicao.cartoes, {
                                        jogador_id: parseInt(cartao.jogador_id),
                                        tipo: cartao.tipo
                                    }]
                                });
                                setCartao({ jogador_id: "", tipo: "" });
                            }}
                        >
                            Adicionar Cartão
                        </Button>

                        <ListaSelecionados>
                            {dadosEdicao.cartoes.map((c, i) => (
                                <ItemSelecionado key={i}>
                                    <NomeJogador>
                                        {`${jogadores.find(j => j.id === c.jogador_id)?.nome} - ${c.tipo}`}
                                    </NomeJogador>
                                    <BotaoRemover onClick={() => {
                                        const novaLista = [...dadosEdicao.cartoes];
                                        novaLista.splice(i, 1);
                                        setDadosEdicao({ ...dadosEdicao, cartoes: novaLista });
                                    }}>❌</BotaoRemover>
                                </ItemSelecionado>
                            ))}
                        </ListaSelecionados>

                        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
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
                <h3>Súmulas existentes:</h3>
                <TabelaAdmin
                    colunas={["Partida", "MVP", "Gols", "Cleansheets", "Cartões"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    );
};

export default AbaSumula;