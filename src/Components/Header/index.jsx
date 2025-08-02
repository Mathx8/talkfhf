import React, { useState } from "react";
import { HeaderContainer, NavLinks, ToggleButton, MobileMenu, Overlay, Logo, Dropdown, DropdownContent } from "./styles";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import competicoes from "../../Image/competicoes.png"
import plantel from "../../Image/plantel.png";
import museu from "../../Image/museu.png";
import talk from "../../Image/PKOTALK.ico"

const Header = () => {
    const [aberto, setAberto] = useState(false);
    const toggleMenu = () => setAberto(!aberto);
    const closeMenu = () => setAberto(false);

    const location = useLocation();

    const liberta = "https://cdn.jsdelivr.net/gh/Divinezx/hubbecdn/swfs/c_images/album1584/FHFLIB1.gif";
    const draft = "https://cdn.jsdelivr.net/gh/Divinezx/hubbecdn/swfs/c_images/album1584/TALKDRAFT1.gif";

    return (
        <>
            <HeaderContainer>
                <ToggleButton onClick={toggleMenu} title="Abrir menu">
                    <MdOutlineMenuOpen />
                </ToggleButton>

                <NavLinks>
                    <Dropdown className={["/draft-cup", "/libertadores"].includes(location.pathname) ? "ativo" : ""}>
                        <span><img src={competicoes} alt="" />COMPETIÇÕES</span>
                        <DropdownContent>
                            <Link to="/libertadores" className={location.pathname === "/libertadores" ? "ativo" : ""}>
                                <img src={liberta} alt="" />LIBERTADORES
                            </Link>
                            <Link to="/draft-cup" className={location.pathname === "/draft-cup" ? "ativo" : ""}>
                                <img src={draft} alt="" />DRAFT CUP
                            </Link>
                        </DropdownContent>
                    </Dropdown>
                    <Link to="/plantel" data-link="plantel" className={location.pathname === "/plantel" ? "ativo" : ""}>
                        <img src={plantel} alt="" />PLANTEL
                    </Link>
                    <Link to="/museu" data-link="museu" className={location.pathname === "/museu" ? "ativo" : ""}>
                        <img src={museu} alt="" />MUSEU
                    </Link>
                </NavLinks>


                <Logo>
                    <Link to="/" title="Início">
                        <img src={talk} alt="Logo" style={{ height: "50px" }} />
                    </Link>
                </Logo>

            </HeaderContainer>

            <MobileMenu aberto={aberto}>
                {/*<span style={{ fontWeight: "bold", color: "#fff" }}><img src={competicoes} alt="" />COMPETIÇÕES</span>*/}
                <Link to="/libertadores" onClick={closeMenu}><img src={liberta} alt="" />LIBERTADORES</Link>
                <Link to="/draft-cup" onClick={closeMenu}><img src={draft} alt="" />DRAFT CUP</Link>
                <Link to="/plantel" onClick={closeMenu}><img src={plantel} alt="" />PLANTEL</Link>
                <Link to="/museu" onClick={closeMenu}><img src={museu} alt="" />MUSEU</Link>
            </MobileMenu>

            {aberto && <Overlay onClick={closeMenu} />}
        </>
    );
};

export default Header;