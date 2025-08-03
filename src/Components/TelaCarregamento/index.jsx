import React, { useEffect, useState } from "react";
import { CarregamentoContainer, Giro, Mensagem, PontinhosAnimados, SubMensagem } from "./styles";

const Loading = () => {
    const frases = ["Buscando dados da época do Milito", "Who is ONE?", "Consultando o VAR..."]

    const [indiceFrase, setIndiceFrase] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceFrase((prev) => (prev + 1) % frases.length);
        }, 3000);

        return () => clearInterval(intervalo);
    }, [frases.length]);

    return (
        <CarregamentoContainer>
            <Giro />
            <Mensagem>
                Carregando
                <PontinhosAnimados>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </PontinhosAnimados>
            </Mensagem>
            <SubMensagem>{frases[indiceFrase]}</SubMensagem>
        </CarregamentoContainer>
    );
};

export default Loading;