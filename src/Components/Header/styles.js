import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
    box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
    position: relative;
    z-index: 1001;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    a {
        display: flex;
        align-items: center;
        gap: 0 0.4rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: ${({ theme }) => theme.text2};
        text-decoration: none;
        letter-spacing: 2px;

        &:hover {
            color: ${({ theme }) => theme.text};
        }
    }

    img {
        width: auto;
        height: 30px;
        object-fit: contain;
        background-size: 200% 200%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        border-radius: 50%;
        background: linear-gradient(135deg, rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 25%, rgba(233, 79, 92, 1) 50%, rgba(236, 105, 115, 1) 75%), rgba(230, 57, 70, 1) 100%;
        padding: 1px;

        &:hover {
            transform: scale(1.08);
        }
    }
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    svg {
        width: 48px;
        height: 48px;
        color: #e63946;
        transition: transform 0.2s ease-in-out;

        &:hover {
        transform: scale(1.1);
        }
    }

    @media (min-width: 769px) {
        display: none;
    }
`;

export const NavLinks = styled.nav`
    display: flex;
    position: relative;
    overflow: visible;
    border: 1px solid #e63946;
    border-radius: 16px 0px;

    a {
        font-size: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.text};
        text-decoration: none;
        font-weight: 500;
        padding: 0.4rem 0.8rem;
        transition: all 0.2s ease-in-out;
        border-radius: 0;

        &:hover {
            font-size: 100%;
        }

        &.ativo {
            font-size: 100%;
            background: linear-gradient(135deg, rgba(230, 57, 70, 1) 0%, rgba(236, 105, 115, 1) 25%, rgba(233, 79, 92, 1) 50%, rgba(236, 105, 115, 1) 75%), rgba(230, 57, 70, 1) 100%;
            color: ${({ theme }) => theme.text};
        }

        &.ativo img {
            transition: filter 0.3s ease;
        }

        &:last-child {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 14px;
        }
    }

    a[data-link="plantel"] img,
    a[data-link="museu"] img {
        filter: ${({ theme }) => theme.filter};
    }

    img {
        width: 24px;
        height: 24px;
        object-fit: contain;
        margin-right: 0.4rem;
        transition: filter 0.3s ease;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export const MobileMenu = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: #e63946;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transform: ${({ aberto }) => (aberto ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
    z-index: 1002;

    a {
        display: flex;
        align-items: center;
        gap: 0 0.4rem;
        color: #000;
        text-decoration: none;
        font-size: 1.2rem;

        &:hover {
            color: #fff;
        }
    }

    img {
        width: 24px;
        height: 24px;
        object-fit: contain;
        margin-right: 0.4rem;
    }

    @media (min-width: 769px) {
        display: none;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
`;

export const Dropdown = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    font-size: 0;
    transition: all 0.4s ease-in-out;
    overflow: visible;

    &:hover {
        font-size: 100%;
    }

    &.ativo {
        font-size: 100%;
        background: linear-gradient(
            135deg,
            rgba(230, 57, 70, 1) 0%,
            rgba(236, 105, 115, 1) 25%,
            rgba(233, 79, 92, 1) 50%,
            rgba(236, 105, 115, 1) 75%
        );
        color: ${({ theme }) => theme.text};
    }

    &:first-child {
        border-top-left-radius: 16px;
        border-bottom-left-radius: 0px;
    }

    &:last-child {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }

    span {
        display: flex;
        align-items: center;
        white-space: nowrap;
    }
`;

export const DropdownContent = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    min-width: max-content;
    background-color: ${({ theme }) => theme.header};
    border: 1px solid #e63946;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.15);
    border-radius: 0px 0px 16px 16px;
    z-index: 1003;
    overflow: hidden;

    opacity: 0;
    transform: translateY(-10px);
    transform-origin: top;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-decoration: none;
        color: ${({ theme }) => theme.text};
        font-size: 100%;
        transition: background 0.4s ease-in-out;

        &:hover {
            color: #facc15;
        }

        img {
            width: 20px;
            height: 20px;
            margin-right: 0.4rem;
        }
    }

    ${Dropdown}:hover & {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }
`;