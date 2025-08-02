import React, { useState, useRef } from "react";

import { Container, Form, Input, Select, Button, Mensagem, FormWrapper, FormTitle, SelectMultiplo, JogadorOption, LogoTime, SemLogo } from "./styles";
import useTimes from "../../API/useTimes";
import useCompeticao from "../../API/useCompeticao";
import useGrupos from "../../API/useGrupos";
import useJogadores from "../../API/useJogadores";
import TabelaAdmin from "../TabelaAdmin";

const AbaTime = () => {
    const [nome, setNome] = useState("");
    const [logo, setLogo] = useState("");
    const [competicao, setCompeticao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [, setForcarAtualizacao] = useState(0);

    const { times, mensagem, erro, criarTime, setTimes, editarTime, deletarTime, adicionarJogadoresAoTime, removerJogadoresDoTime } = useTimes();
    const { competicoes } = useCompeticao();
    const { grupos } = useGrupos();
    const { jogadores, recarregarJogadores } = useJogadores();

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({ nome: "", logo: "", competicao: "", grupo: "" });
    const [indiceGerenciando, setIndiceGerenciando] = useState(null);
    const [jogadoresSelecionados, setJogadoresSelecionados] = useState([]);
    const editFormRef = useRef(null);

    const dadosTabela = times.map((p) => {
        const nomeCompeticao = p.competicao?.nome || "Sem competição";
        const nomeGrupo = p.grupo?.nome ? ` - ${p.grupo.nome}` : "";
        const infoCompeticaoGrupo = `${nomeCompeticao}${nomeGrupo}`;

        const jogadores = Array.isArray(p.jogadores) && p.jogadores.length > 0
            ? p.jogadores.join(", ")
            : "Sem jogadores";

        const logo = p.logo ? (
            <LogoTime src={p.logo} alt={`Logo ${p.nome}`} />
        ) : (
            <SemLogo>Sem logo</SemLogo>
        );

        return [logo, p.nome, infoCompeticaoGrupo, jogadores];
    });

    const ligaSelecionada = competicoes.find((c) => c.id.toString() === competicao && c.tipo === "liga");
    const gruposDaCompeticao = grupos.filter(grupo => grupo.liga_id.toString() === competicao);
    const timeAtual = times[indiceGerenciando];
    const timeAtualId = timeAtual?.id ?? null;

    const jogadoresFiltrados = jogadores
        .filter(j => {
            const listaTimes = Array.isArray(j.times) ? j.times : [];

            if (listaTimes.length === 0) return true;

            const pertenceAoTimeAtual = listaTimes.some(t => t.id === timeAtual?.id);
            if (pertenceAoTimeAtual) return true;

            const participaDaMesmaCompeticao = listaTimes.some(t =>
                t.competicao?.id === timeAtual?.competicao?.id
            );

            return !participaDaMesmaCompeticao;
        })
        .map(j => ({
            ...j,
            jaPertence: j.times?.some(t => t.id === timeAtual?.id) || false
        }));

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);
    const [loadingAdicionar, setLoadingAdicionar] = useState(false);
    const [loadingRemover, setLoadingRemover] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarTime({ nome: nome, logo: logo, competicao_id: competicao, grupo_id: grupo });
        setNome("");
        setLogo("");
        setCompeticao("");
        setGrupo("");

        setLoadingCriar(false);
    };

    const handleEditar = (index) => {
        const time = times[index];
        setIndiceEditando(index);

        setDadosEdicao({
            nome: time.nome,
            logo: time.logo,
            competicao: time.competicao?.id ? String(time.competicao.id) : "",
            grupo: time.grupo?.id ? String(time.grupo.id) : ""
        })

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({ nome: "", logo: "", competicao: "", grupo: "" });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const timeOriginal = times[indiceEditando];
        const atualizado = {
            nome: dadosEdicao.nome,
            logo: dadosEdicao.logo,
            competicao_id: dadosEdicao.competicao ? parseInt(dadosEdicao.competicao) : null,
            grupo_id: dadosEdicao.grupo ? parseInt(dadosEdicao.grupo) : null,
        };
        const sucesso = await editarTime(timeOriginal.id, atualizado);

        if (sucesso) {
            const novaLista = [...times];
            novaLista[indiceEditando] = atualizado;
            setTimes(novaLista);
            handleCancelar();
        } else {
            alert("Erro ao editar time.");
        }

        setLoadingSalvar(false);
    };

    const handleExcluir = async (index) => {
        const time = times[index];
        if (window.confirm(`Deseja excluir ${time.nome}?`)) {
            const sucesso = await deletarTime(time.id);

            if (sucesso) {
                const novaLista = times.filter((_, i) => i !== index);
                setTimes(novaLista);
            } else {
                alert("Erro ao excluir time.");
            }
        }
    };

    const handleGerenciarJogadores = (index) => {
        const time = times[index];
        setIndiceGerenciando(index);

        const jogadores = Array.isArray(time.jogadores) ? time.jogadores : [];
        setJogadoresSelecionados(jogadores);

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleAdicionarJogadores = async () => {
        if (!timeAtualId) {
            alert("Erro: time atual inválido.");
            return;
        }

        setLoadingAdicionar(true);

        const sucesso = await adicionarJogadoresAoTime(
            times[indiceGerenciando].id,
            { jogador_ids: jogadoresSelecionados.map(Number) }
        );

        if (sucesso) {
            await recarregarJogadores();
            setForcarAtualizacao(prev => prev + 1);
            setIndiceGerenciando(null);
            setJogadoresSelecionados([]);
        }

        setLoadingAdicionar(false);
    };

    const handleRemoverJogadores = async () => {
        if (!timeAtualId) {
            alert("Erro: time atual inválido.");
            return;
        }

        setLoadingRemover(true);

        const sucesso = await removerJogadoresDoTime(
            times[indiceGerenciando].id,
            jogadoresSelecionados.map(Number)
        );

        if (sucesso) {
            await recarregarJogadores();
            setForcarAtualizacao(prev => prev + 1);
            setIndiceGerenciando(null);
            setJogadoresSelecionados([]);
        }

        setLoadingRemover(false);
    };

    return (
        <Container>
            <h2>Gerenciar Times</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Novo Time</FormTitle>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="https://exemplo.com/logo.png"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                    />
                    <Select
                        value={competicao}
                        onChange={(e) => {
                            setCompeticao(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecione uma competição</option>
                        {competicoes.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                                {comp.nome}
                            </option>
                        ))}
                    </Select>
                    {ligaSelecionada && (
                        <Select
                            value={grupo}
                            onChange={(e) => setGrupo(e.target.value)}
                        >
                            <option value="">Selecione um grupo ou nenhum</option>
                            {gruposDaCompeticao.map((grup) => (
                                <option key={grup.id} value={grup.id}>
                                    {grup.nome}
                                </option>
                            ))}
                        </Select>
                    )}
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Time"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando: {times[indiceEditando].nome}</FormTitle>
                        <Input
                            type="text"
                            placeholder="Nome"
                            value={dadosEdicao.nome}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, nome: e.target.value })
                            }
                            required
                        />
                        <Input
                            type="text"
                            placeholder="https://exemplo.com/logo.png"
                            value={dadosEdicao.logo}
                            onChange={(e) =>
                                setDadosEdicao({ ...dadosEdicao, logo: e.target.value })
                            }
                        />
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
                            value={dadosEdicao.grupo || ""}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, grupo: e.target.value })}
                        >
                            <option value="">Sem grupo</option>
                            {grupos.map((grup) => (
                                <option key={grup.id} value={grup.id}>
                                    {grup.nome}
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

                {indiceGerenciando !== null && (
                    <Form ref={editFormRef}>
                        <FormTitle>Gerenciar Jogadores do Time: {times[indiceGerenciando].nome}</FormTitle>

                        <SelectMultiplo
                            multiple
                            value={jogadoresSelecionados}
                            onChange={(e) => {
                                const options = Array.from(e.target.selectedOptions).map((o) => o.value);
                                setJogadoresSelecionados(options);
                            }}
                        >
                            {jogadoresFiltrados.map((j) => (
                                <JogadorOption
                                    key={j.id}
                                    value={j.id}
                                    $jaPertence={j.jaPertence}
                                >
                                    {j.nome} ({j.posicao}) {j.jaPertence ? "✅" : "➕"}
                                </JogadorOption>

                            ))}
                        </SelectMultiplo>

                        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                            <Button
                                type="button"
                                cor="#00ff88"
                                onClick={handleAdicionarJogadores}
                                disabled={loadingAdicionar}
                            >
                                {loadingAdicionar ? "Adicionando..." : "Adicionar"}
                            </Button>

                            <Button
                                type="button"
                                cor="#ff4d4d"
                                onClick={handleRemoverJogadores}
                                disabled={loadingRemover}
                            >
                                {loadingRemover ? "Removendo..." : "Remover"}
                            </Button>
                            <Button
                                type="button"
                                cor="#777"
                                onClick={() => {
                                    setIndiceGerenciando(null);
                                    setJogadoresSelecionados([]);
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                )}
            </FormWrapper>
            {mensagem && <Mensagem erro={erro}>{mensagem}</Mensagem>}
            <h3>Times existentes:</h3>
            <div>
                <TabelaAdmin
                    colunas={["#", "Nome", "Competição", "Jogadores"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                    onGerenciar={handleGerenciarJogadores}
                />
            </div>
        </Container>
    )
}

export default AbaTime;