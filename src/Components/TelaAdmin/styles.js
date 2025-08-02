import styled from "styled-components";

export const HeaderAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;

  h1 {
    color: #e63946;
    font-size: 1.8rem;
    margin: 0;
  }

  p {
    color: #fff;
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  background-color: #0f0f0f;
  color: white;
  font-family: monospace;
  min-height: 100vh;
  padding: 2rem;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  background: ${(props) => (props.active ? "#e63946" : "#1a1a1a")};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #e7404e;
    color: #000;
  }
`;

export const ContentArea = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #e63946;
`;

export const Placeholder = styled.p`
  color: #ccc;
`;