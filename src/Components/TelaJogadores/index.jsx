import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { FaTimesCircle, FaDownload } from "react-icons/fa";
import api from "../../API/api";
import JogadorDetalhes from "../Jogador";
import LoadingPequeno from "../TelaCarregamentoPequeno";
import { Container, TituloContainer, SearchInput, JogadorContainer, JogadorCard, Avatar, Nome, ModalOverlay, ModalContent } from "./styles";

const Jogadores = () => {
  const [busca, setBusca] = useState("");
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const res = await api.get("/jogador/geral");

        const jogadoresOrdenados = res.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );

        setJogadores(jogadoresOrdenados);
      } catch (err) {
        console.error("Erro ao buscar jogadores:", err);
      } finally {
        setCarregando(false);
      }
    };

    fetchJogadores();
  }, []);

  const jogadoresFiltrados = jogadores.filter((j) =>
    j.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModal = (jogador) => {
    setSelecionado(jogador);
  };

  const fecharModal = () => {
    setSelecionado(null);
  };

  const MeuModal = ({ selecionado, fecharModal }) => {
    const contentRef = useRef(null);

    const baixarPNG = () => {
      if (!contentRef.current) return;

      toPng(contentRef.current, {
        cacheBust: true,
        filter: (node) => {
          if (node.classList) {
            return !node.classList.contains("close-btn") &&
              !node.classList.contains("download-btn");
          }
          return true;
        }
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${selecionado?.nome || "jogador"}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erro ao gerar PNG", err);
        });
    };

    return (
      selecionado && (
        <ModalOverlay onClick={fecharModal}>
          <ModalContent
            ref={contentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="close-btn" onClick={fecharModal} title="Fechar">
              <FaTimesCircle />
            </div>
            <div className="download-btn" onClick={baixarPNG} title="Baixar">
              <FaDownload />
            </div>

            <JogadorDetalhes jogador={selecionado} />
          </ModalContent>
        </ModalOverlay>
      )
    );
  };

  if (carregando) return <> <Container><TituloContainer>Jogadores</TituloContainer><LoadingPequeno /> <Container /></Container></>;

  return (
    <Container>
      <TituloContainer>Jogadores</TituloContainer>
      <SearchInput
        placeholder="Buscar jogador..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <JogadorContainer>
        {jogadoresFiltrados.map((jogador) => (
          <JogadorCard key={jogador.id} onClick={() => abrirModal(jogador)}>
            <Avatar
              src={`https://hubbe.biz/avatar/${jogador.nome}?img_format=png&headonly=2&direction=3`}
              alt={jogador.nome}
            />
            <Nome>{jogador.nome}</Nome>
          </JogadorCard>
        ))}
      </JogadorContainer>

      <MeuModal selecionado={selecionado} fecharModal={fecharModal} />
    </Container>
  );
};

export default Jogadores;