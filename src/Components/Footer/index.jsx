import React from "react";
import { FooterContainer, FooterContent, FooterSection, FooterText, FooterButtons, FooterButton } from "./styles";
import { FaYoutube, FaHotel, FaDiscord } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../ThemeContext";

const Footer = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterText>
            © {new Date().getFullYear()} TALK. Todos os direitos reservados.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterButtons>
            <FooterButton
              title="Hubbe"
              href="https://hubbe.biz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaHotel size={18} />
            </FooterButton>
            <FooterButton
              title="FHF - Youtube"
              href="https://www.youtube.com/@aFHFTV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={18} />
            </FooterButton>
            <FooterButton
              title="Discord"
              href="https://discord.gg/mxntkCUV5K"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={18} />
            </FooterButton>
            <FooterButton onClick={toggleTheme} title="Alternar tema">
              {isDark ? <MdLightMode /> : <MdDarkMode />}
            </FooterButton>
          </FooterButtons>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;