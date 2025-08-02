import React, { useState, useRef } from "react";

import { Container, Form, Input, Select, Button, Mensagem, FormWrapper, FormTitle } from "./styles"
import usePartidas from "../../API/usePartidas";
import useCompeticao from "../../API/useCompeticao";
import useGrupos from "../../API/useGrupos";
import useTimes from "../../API/useTimes"
import TabelaAdmin from "../TabelaAdmin";

const AbaPartida = () => {
    const [competicao, setCompeticao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [rodada, setRodada] = useState("");
    const [link, setLink] = useState("");
    const [timeCasa, setTimeCasa] = useState("");
    const [golsCasa, setGolCasa] = useState("");
    const [timeFora, setTimeFora] = useState("");
    const [golsFora, setGolFora] = useState("");

    const { partidas, mensagem, erro, carregarPartidas, criarPartida, setPartidas, editarPartida, deletarPartida } = usePartidas();
    const { competicoes } = useCompeticao();
    const { grupos } = useGrupos();
    const { times } = useTimes();

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({ competicao: "", grupo: "", rodada: "", link: "", timeCasa: "", golsCasa: "", timeFora: "", golsFora: "" });
    const editFormRef = useRef(null);

    const dadosTabela = partidas.map((p) => {
        let placar = `${p.time_casa} ${p.gols_casa} X ${p.gols_fora} ${p.time_fora}` || "0 - 0";

        return [p.competicao, p.rodada, p.link, placar]
    });

    const ligaSelecionada = competicoes.find((c) => c.id.toString() === competicao && c.tipo === "liga");
    const gruposDaCompeticao = grupos.filter(grupo => grupo.liga_id.toString() === competicao);
    const grupoSelecionado = grupos.find((g) => g.id.toString() === grupo);
    const timesDoGrupo = grupoSelecionado ? grupoSelecionado.times : times;

    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCriar(true);

        await criarPartida({ competicao_id: parseInt(competicao), grupo_id: parseInt(grupo), rodada: rodada, link: link, time_casa_id: parseInt(timeCasa), gols_casa: golsCasa, time_fora_id: parseInt(timeFora), gols_fora: golsFora });
        setCompeticao("");
        setGrupo("");
        setRodada("");
        setLink("");
        setTimeCasa("");
        setGolCasa("");
        setTimeFora("");
        setGolFora("");

        setLoadingCriar(false);
    };

    const handleEditar = (index) => {
        const partida = partidas[index];
        const timeCasaId = times.find(t => t.nome === partida.time_casa)?.id || "";
        const timeForaId = times.find(t => t.nome === partida.time_fora)?.id || "";
        setIndiceEditando(index);

        setDadosEdicao({
            competicao: partida.competicao_id?.toString() || "",
            grupo: partida.grupo_id !== null && partida.grupo_id !== undefined
                ? String(partida.grupo_id)
                : "",
            rodada: partida.rodada,
            link: partida.link,
            timeCasa: String(timeCasaId),
            golsCasa: partida.gols_casa,
            timeFora: String(timeForaId),
            golsFora: partida.gols_fora
        })

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleCancelar = () => {
        setIndiceEditando(null);
        setDadosEdicao({ competicao: "", grupo: "", rodada: "", link: "", timeCasa: "", golsCasa: "", timeFora: "", golsFora: "" });
    };

    const handleSalvar = async () => {
        setLoadingSalvar(true);

        const partidaOriginal = partidas[indiceEditando];
        const atualizado = {
            competicao: parseInt(dadosEdicao.competicao),
            grupo: parseInt(dadosEdicao.grupo),
            rodada: dadosEdicao.rodada,
            link: dadosEdicao.link,
            timeCasa: parseInt(dadosEdicao.timeCasa),
            golsCasa: dadosEdicao.golsCasa,
            timeFora: parseInt(dadosEdicao.timeFora),
            golsFora: dadosEdicao.golsFora
        };

        const sucesso = await editarPartida(partidaOriginal.id, atualizado);

        if (sucesso) {
            await carregarPartidas();
            handleCancelar();
        } else {
            alert("Erro ao editar partida.");
        }

        setLoadingSalvar(false);
    };
    
    const handleExcluir = async (index) => {
        const partida = partidas[index];
        if (window.confirm(`Deseja excluir ${partida.nome}?`)) {
            const sucesso = await deletarPartida(partida.id);

            if (sucesso) {
                const novaLista = partidas.filter((_, i) => i !== index);
                setPartidas(novaLista);
            } else {
                alert("Erro ao excluir partida.");
            }
        }
    };

    return (
        <Container>
            <h2>Gerenciar Partidas</h2>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormTitle>Nova Partida</FormTitle>
                    <Select
                        value={competicao}
                        onChange={(e) => {
                            setCompeticao(e.target.value);
                            setGrupo("");
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
                    <Input
                        type="text"
                        placeholder="Rodada"
                        value={rodada}
                        onChange={(e) => setRodada(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <Select
                        value={timeCasa}
                        onChange={(e) => setTimeCasa(e.target.value)}
                        required
                    >
                        <option value="">Selecione um time</option>
                        {timesDoGrupo.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.nome}
                            </option>
                        ))}
                    </Select>
                    <Input
                        type="number"
                        placeholder="Gols Casa"
                        value={golsCasa}
                        onChange={(e) => setGolCasa(e.target.value)}
                        required
                    />
                    <Select
                        value={timeFora}
                        onChange={(e) => setTimeFora(e.target.value)}
                        required
                    >
                        <option value="">Selecione um time</option>
                        {timesDoGrupo.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.nome}
                            </option>
                        ))}
                    </Select>
                    <Input
                        type="number"
                        placeholder="Gols Fora"
                        value={golsFora}
                        onChange={(e) => setGolFora(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loadingCriar}>
                        {loadingCriar ? "Criando..." : "Criar Partida"}
                    </Button>
                </Form>

                {indiceEditando !== null && (
                    <Form ref={editFormRef} onSubmit={(e) => e.preventDefault()}>
                        <FormTitle>Editando: {`${partidas[indiceEditando].time_casa} X ${partidas[indiceEditando].time_fora} - ${partidas[indiceEditando].rodada}`}</FormTitle>
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
                        <Input
                            type="text"
                            placeholder="Rodada"
                            value={dadosEdicao.rodada}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, rodada: e.target.value })}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Link"
                            value={dadosEdicao.link}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, link: e.target.value })}
                        />
                        <Select
                            value={dadosEdicao.timeCasa}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, timeCasa: e.target.value })}
                            required
                        >
                            {times.map((time) => (
                                <option key={time.id} value={time.id}>
                                    {time.nome}
                                </option>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            placeholder="Gols Casa"
                            value={dadosEdicao.golsCasa}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, golsCasa: e.target.value })}
                            required
                        />
                        <Select
                            value={dadosEdicao.timeFora}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, timeFora: e.target.value })}
                            required
                        >
                            {times.map((time) => (
                                <option key={time.id} value={time.id}>
                                    {time.nome}
                                </option>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            placeholder="Gols Fora"
                            value={dadosEdicao.golsFora}
                            onChange={(e) => setDadosEdicao({ ...dadosEdicao, golsFora: e.target.value })}
                            required
                        />
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
            <h3>Partidas existentes:</h3>
            <div>
                <TabelaAdmin
                    colunas={["Competição", "Rodada", "Link", "Placar"]}
                    dados={dadosTabela}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </div>
        </Container>
    );
};

export default AbaPartida;