import React from "react";
import {
    CarregamentoContainer,
    Giro,
    Mensagem,
    PontinhosAnimados,
    SubMensagem,
} from "./styles";

const Loading = () => {
    return (
        <CarregamentoContainer>
            <Giro />
            <Mensagem>
                Carregando
                <PontinhosAnimados>...</PontinhosAnimados>
            </Mensagem>
            <SubMensagem>Buscando dados da época do Milito</SubMensagem>
        </CarregamentoContainer>
    );
};

export default Loading;