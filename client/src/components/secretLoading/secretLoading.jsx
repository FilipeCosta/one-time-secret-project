import styled, { keyframes } from "styled-components";

const spin = keyframes`
    100% {
        transform: rotate(360deg)
    }
`;

const LoadingSpinner = styled.div`
  pointer-events: none;
  width: 2.5em;
  height: 2.5em;
  border: 0.4em solid transparent;
  border-color: white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SecretLoading = () => {
  return <LoadingSpinner />;
};

export default SecretLoading;
