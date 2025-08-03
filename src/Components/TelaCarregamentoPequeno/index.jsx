import React from "react";
import { CarregamentoContainer, Giro, Mensagem, PontinhosAnimados } from "./styles";

const LoadingPequeno = () => {

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
        </CarregamentoContainer>
    );
};

export default LoadingPequeno;