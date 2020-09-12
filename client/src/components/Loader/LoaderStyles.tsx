import styled, { keyframes } from 'styled-components';

const bouncingLoader = keyframes`
    to {
      opacity: 0.1;
      transform: translate3d(0, -1rem, 0);
    }
  `;

export const StyledBouncingLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  align-items: center;
  z-index: 10;
  & > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: ${bouncingLoader} 0.6s infinite alternate;
  }
  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
