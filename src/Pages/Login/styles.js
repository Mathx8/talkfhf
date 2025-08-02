import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0f0f0f;
  font-family: monospace;
`;

export const LoginCard = styled.div`
  background-color: #1a1a1a;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 0 10px #e6394633;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 350px;
`;

export const Title = styled.h2`
  color: #e63946;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  background-color: #2b2b2b;
  border: 2px solid #444;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #e63946;
    box-shadow: 0 0 5px #e6394688;
  }
`;

export const Button = styled.button`
  background-color: #e63946;
  color: #000;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-family: monospace;
  transition: 0.3s;

  &:hover {
    background-color: #e7404e;
  }
`;

export const Error = styled.p`
  color: #ff4444;
  font-size: 0.9rem;
  text-align: center;
`;