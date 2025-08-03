import React, { useRef, useEffect, useState } from "react";
import { ContainerChave, Partida, PartidaFinal, BoxPlacar, LinhaResultado, LogoTime, NomeTime, Placar, Coluna, Coluna2, TituloSecao, ContainerUpperAndLower, ScrollContainer, RotuloVertical, NomeRodada, RodadasHeader, DragArea } from "./styles";
import usePartidas from "../../API/usePartidas";
import useTimes from "../../API/useTimes"
import { useTheme } from "../../ThemeContext";
import Loading from "../../Components/TelaCarregamento";
import escudo from "../../Image/escudo.png"

const Torneio = () => {
    const { times } = useTimes();
    const { partida, loading, erro } = usePartidas();
    const partidaRefs = useRef({});
    const containerRef = useRef();
    const [timeHover, setTimeHover] = useState(null);
    const { isDark } = useTheme();
    const dragAreaRef = useRef();

    function preencherRodadas(template, partidas) {
        const preenchido = {};

        Object.entries(template).forEach(([rodadaKey, partidasTemplate]) => {
            preenchido[rodadaKey] = partidasTemplate.map((jogo, index) => {
                const rodadaPrefixo = mapRodadaIDParaRodadaAPI(jogo.id);
                const partidasDaRodada = partidas.filter((p) => p.rodada?.startsWith(rodadaPrefixo));

                const partidaReal = partidasDaRodada[index];

                if (partidaReal) {
                    return {
                        ...jogo,
                        time1: partidaReal.time_casa,
                        gols_casa: partidaReal.gols_casa,
                        time2: partidaReal.time_fora,
                        gols_fora: partidaReal.gols_fora,
                    };
                }

                return jogo;
            });
        });

        return preenchido;
    }

    function mapRodadaIDParaRodadaAPI(id) {
        const match = id.match(/([UL])(\d+)/);
        if (match) return `DC-${match[1]}${match[2]}`;

        const map = {
            "Upper Semifinal": "DC-USF",
            "Semifinal Lower": "DC-LSF",
            "Lower Final": "DC-LOWERFINAL",
            "Grande Final": "DC-FINAL",
        };

        return map[id] || null;
    }

    const upperTemplate = {
        rodada1: [
            { id: "U1 - J1", time1: "TIME 1", gols_casa: "", time2: "TIME 2", gols_fora: "" },
            { id: "U1 - J2", time1: "TIME 3", gols_casa: "", time2: "TIME 4", gols_fora: "" },
            { id: "U1 - J3", time1: "TIME 5", gols_casa: "", time2: "TIME 6", gols_fora: "" },
            { id: "U1 - J4", time1: "TIME 7", gols_casa: "", time2: "TIME 8", gols_fora: "" },
        ],
        rodada2: [
            { id: "U2 - J1", time1: "Vencedor U1 - J1", gols_casa: "", time2: "Vencedor U1 - J2", gols_fora: "" },
            { id: "U2 - J2", time1: "Vencedor U1 - J3", gols_casa: "", time2: "Vencedor U1 - J4", gols_fora: "" },
        ],
        final: [{ id: "Upper Semifinal", time1: "Vencedor U2 - J1", gols_casa: "", time2: "Vencedor U2 - J2", gols_fora: "" }],
    };

    const lowerTemplate = {
        rodada2: [
            { id: "L1 - J3", time1: "Perdedor U1 - J1", gols_casa: "", time2: "Perdedor U1 - J2", gols_fora: "" },
            { id: "L1 - J4", time1: "Perdedor U1 - J3", gols_casa: "", time2: "Perdedor U1 - J4", gols_fora: "" },
        ],
        rodada3: [
            { id: "L2 - J1", time1: "Vencedor L1 - J3", gols_casa: "", time2: "Perdedor U2 - J1", gols_fora: "" },
            { id: "L2 - J2", time1: "Vencedor L1 - J4", gols_casa: "", time2: "Perdedor U2 - J2", gols_fora: "" },
        ],
        rodada4: [
            { id: "Semifinal Lower", time1: "Vencedor L2 - J1", gols_casa: "", time2: "Vencedor L2 - J2", gols_fora: "" },
        ],
        lowerFinal: [
            { id: "Lower Final", time1: "Vencedor Semifinal Lower", gols_casa: "", time2: "Perdedor Upper", gols_fora: "" },
        ],
    };

    const finalTemplate = [
        { id: "Grande Final", time1: "Vencedor Upper Final", gols_casa: "", time2: "Vencedor Lower Final", gols_fora: "" },
    ];

    const upper = preencherRodadas(upperTemplate, partida);
    const lower = preencherRodadas(lowerTemplate, partida);
    const final = preencherRodadas({ final: finalTemplate }, partida).final;

    useEffect(() => {
        if (loading) return;

        const container = containerRef.current;
        const canvas = container.querySelector("#linhas-canvas");
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            const width = container.scrollWidth;
            const height = container.scrollHeight;

            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            drawLines();
        };

        const drawLines = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = isDark ? "#ffffff" : "#000000";
            ctx.lineWidth = 2;

            const conectar = (id1, id2) => {
                const el1 = partidaRefs.current[id1];
                const el2 = partidaRefs.current[id2];
                if (!el1 || !el2) return;

                const rect1 = el1.getBoundingClientRect();
                const rect2 = el2.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const x1 = rect1.right - containerRect.left + container.scrollLeft;
                const y1 = rect1.top + rect1.height / 2 - containerRect.top + container.scrollTop;

                const x2 = rect2.left - containerRect.left + container.scrollLeft;
                const y2 = rect2.top + rect2.height / 2 - containerRect.top + container.scrollTop;

                const meioX = x1 + (x2 - x1) / 2;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(meioX, y1);
                ctx.lineTo(meioX, y2);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            };

            conectar("U1 - J1", "U2 - J1");
            conectar("U1 - J2", "U2 - J1");
            conectar("U1 - J3", "U2 - J2");
            conectar("U1 - J4", "U2 - J2");
            conectar("U2 - J1", "Upper Semifinal");
            conectar("U2 - J2", "Upper Semifinal");

            conectar("L1 - J3", "L2 - J1");
            conectar("L1 - J4", "L2 - J2");
            conectar("L2 - J1", "Semifinal Lower");
            conectar("L2 - J2", "Semifinal Lower");
            conectar("Semifinal Lower", "Lower Final");
            conectar("Upper Semifinal", "Grande Final");
        };

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(container);

        const scrollHandler = () => requestAnimationFrame(drawLines);
        container.addEventListener("scroll", scrollHandler);

        const timeout = setTimeout(resizeCanvas, 100);

        return () => {
            resizeObserver.disconnect();
            container.removeEventListener("scroll", scrollHandler);
            clearTimeout(timeout);
        };
    }, [isDark, loading]);

    useEffect(() => {
        if (loading) return;

        const timeout = setTimeout(() => {
            const container = containerRef.current;
            const dragArea = dragAreaRef.current;

            if (!container || !dragArea) {
                console.warn('container ou drag-area não encontrados');
                return;
            }

            let isDown = false;
            let startX;
            let scrollLeft;

            const handleMouseDown = (e) => {
                isDown = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                container.classList.add('grabbing');
            };

            const handleMouseMove = (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = x - startX;
                container.scrollLeft = scrollLeft - walk;
            };

            const handleMouseUp = () => {
                isDown = false;
                container.classList.remove('grabbing');
            };

            dragArea.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                dragArea.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }, 100);

        return () => clearTimeout(timeout);
    }, [loading]);

    const renderPartidas = (partidas) =>
        partidas.map((partida) => {
            const logoTime1 = times.find((t) => t.nome === partida.time1)?.logo || escudo;
            const logoTime2 = times.find((t) => t.nome === partida.time2)?.logo || escudo;

            const golsCasa = Number(partida.gols_casa);
            const golsFora = Number(partida.gols_fora);

            const casaVenceu = golsCasa > golsFora;
            const foraVenceu = golsFora > golsCasa;

            return (
                <Partida key={partida.id} ref={(el) => (partidaRefs.current[partida.id] = el)}>
                    <BoxPlacar>
                        <LinhaResultado
                            $vencedor={casaVenceu}
                            $hovered={timeHover === partida.time1}
                            onMouseEnter={() => setTimeHover(partida.time1)}
                            onMouseLeave={() => setTimeHover(null)}
                        >
                            <LogoTime src={logoTime1} alt="" />
                            <NomeTime $vencedor={casaVenceu}>{partida.time1}</NomeTime>
                            <Placar $vencedor={casaVenceu}>{partida.gols_casa}</Placar>
                        </LinhaResultado>
                        <LinhaResultado
                            $encedor={foraVenceu}
                            $hovered={timeHover === partida.time2}
                            onMouseEnter={() => setTimeHover(partida.time2)}
                            onMouseLeave={() => setTimeHover(null)}
                        >
                            <LogoTime src={logoTime2} alt="" />
                            <NomeTime $vencedor={foraVenceu}>{partida.time2}</NomeTime>
                            <Placar $vencedor={foraVenceu}>{partida.gols_fora}</Placar>
                        </LinhaResultado>
                    </BoxPlacar>
                </Partida>
            );
        });

    const renderPartidasFinais = (partidas) =>
        partidas.map((partida) => {
            const logoTime1 = times.find((t) => t.nome === partida.time1)?.logo || escudo;
            const logoTime2 = times.find((t) => t.nome === partida.time2)?.logo || escudo;

            const golsCasa = Number(partida.gols_casa);
            const golsFora = Number(partida.gols_fora);

            const casaVenceu = golsCasa > golsFora;
            const foraVenceu = golsFora > golsCasa;

            return (
                <PartidaFinal key={partida.id} ref={(el) => (partidaRefs.current[partida.id] = el)}>
                    <BoxPlacar>
                        <LinhaResultado
                            $vencedor={casaVenceu}
                            $hovered={timeHover === partida.time1}
                            onMouseEnter={() => setTimeHover(partida.time1)}
                            onMouseLeave={() => setTimeHover(null)}
                        >
                            <LogoTime src={logoTime1} alt="" />
                            <NomeTime $vencedor={casaVenceu}>{partida.time1}</NomeTime>
                            <Placar $vencedor={casaVenceu}>{partida.gols_casa}</Placar>
                        </LinhaResultado>
                        <LinhaResultado
                            $vencedor={foraVenceu}
                            $hovered={timeHover === partida.time2}
                            onMouseEnter={() => setTimeHover(partida.time2)}
                            onMouseLeave={() => setTimeHover(null)}
                        >
                            <LogoTime src={logoTime2} alt="" />
                            <NomeTime $vencedor={foraVenceu}>{partida.time2}</NomeTime>
                            <Placar $vencedor={foraVenceu}>{partida.gols_fora}</Placar>
                        </LinhaResultado>
                    </BoxPlacar>
                </PartidaFinal>
            );
        });

    if (loading) return <Loading />;
    if (erro) return <p>Erro: {erro}</p>;

    return (
        <ContainerChave>
            <TituloSecao>Chaveamento</TituloSecao>

            <ScrollContainer ref={containerRef}>
                <DragArea ref={dragAreaRef}>
                    <canvas
                        id="linhas-canvas"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            pointerEvents: "none",
                        }}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <ContainerUpperAndLower>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <RotuloVertical>
                                    {"UPPER".split("").map((l, i) => (
                                        <div key={i}>{l}</div>
                                    ))}
                                </RotuloVertical>
                            </div>

                            {/* WRAPPER PARA AS COLUNAS */}
                            <div style={{ display: "flex", gap: "2rem", width: "fit-content" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <RodadasHeader>
                                        <NomeRodada>RODADA 1</NomeRodada>
                                        <NomeRodada>RODADA 2</NomeRodada>
                                        <NomeRodada>SEMIFINAIS</NomeRodada>
                                        <NomeRodada>FINAIS</NomeRodada>
                                    </RodadasHeader>

                                    <div style={{ display: "flex", gap: "2rem", width: "fit-content" }}>
                                        <Coluna>{renderPartidas(upper.rodada1)}</Coluna>
                                        <Coluna2>{renderPartidas(upper.rodada2)}</Coluna2>
                                        <Coluna>{renderPartidas(upper.final)}</Coluna>
                                        <Coluna>{renderPartidasFinais(final)}</Coluna>
                                    </div>
                                </div>
                            </div>
                        </ContainerUpperAndLower>

                        <ContainerUpperAndLower>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <RotuloVertical>
                                    {"LOWER".split("").map((l, i) => (
                                        <div key={i}>{l}</div>
                                    ))}
                                </RotuloVertical>
                            </div>
                            <div style={{ display: "flex", gap: "2rem", width: "fit-content" }}>
                                <Coluna>{renderPartidas(lower.rodada2)}</Coluna>
                                <Coluna>{renderPartidas(lower.rodada3)}</Coluna>
                                <Coluna>{renderPartidas(lower.rodada4)}</Coluna>
                                <Coluna>{renderPartidasFinais(lower.lowerFinal)}</Coluna>
                            </div>
                        </ContainerUpperAndLower>
                    </div>
                </DragArea>
            </ScrollContainer>

        </ContainerChave>
    );
};

export default Torneio;