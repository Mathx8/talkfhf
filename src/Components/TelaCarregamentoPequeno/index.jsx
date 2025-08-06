import React from "react";
import { CarregamentoContainer, Mensagem, PontinhosAnimados } from "./styles";

const LoadingPequeno = () => {

    return (
        <CarregamentoContainer>
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