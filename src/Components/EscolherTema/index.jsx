import React from "react";
import { Overlay, EscolhaBox, BotaoTema, Titulo } from "./styles";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const OverlayEscolherTema = ({ onEscolher }) => {
    return (
        <Overlay>
            <EscolhaBox>
                <Titulo>Escolha seu tema</Titulo>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                    <BotaoTema modo="light" onClick={() => onEscolher("light")}>
                        <MdLightMode /> Claro
                    </BotaoTema>

                    <BotaoTema modo="dark" onClick={() => onEscolher("dark")}>
                        <MdDarkMode /> Escuro
                    </BotaoTema>
                </div>
            </EscolhaBox>
        </Overlay>
    );
};

export default OverlayEscolherTema;