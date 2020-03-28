import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import LoaderBackground from '../../assets/loaderBackground.png';

export const ListAndMapWrapper = styled.div`
  position: relative;
  height: 70vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.backgroundGray};
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const AppWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ldsRing = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

export const Loader = styled.span`
  position: relative;
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundGray};

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${LoaderBackground});
    background-size: cover;
    filter: blur(3px);
    z-index: -1;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 120px;
    height: 120px;
    filter: blur(0);
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 96px;
    height: 96px;
    margin: 12px;
    border: 12px solid ${({ theme }) => theme.blue};
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.blue} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
