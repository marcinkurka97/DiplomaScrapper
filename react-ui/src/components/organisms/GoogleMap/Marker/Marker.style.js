import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';

export const MarkerInGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50x;
  height: 50px;
  margin-left: -7px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
`;

export const bounce = keyframes`
0%,
20%,
50%,
80%,
100% {
  transform: scale(1) translateY(0);
}
40% {
  transform: scale(1.25) translateY(-20px);
}
60% {
  transform: scale(1.125) translateY(-10px);
}
`;

export const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;

  svg {
    transition: transform 0.3s;
  }

  svg:hover {
    transform: scale(1.2);
  }

  ${props =>
    props.hoverState && props.hoverIdState === props.markerId
      ? css`
          position: relative;
          transform: scale(1.5);
          animation-name: ${bounce};
          animation-duration: 1.5s;
          animation-fill-mode: both;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          z-index: 5;
        `
      : ''}
`;

export const scaleInCenter = keyframes`
0% {
  -webkit-transform: scale(0);
  transform: scale(0);
  opacity: 1;
}
100% {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
`;

export const MarkerInfoWindowWrapper = styled.div`
  position: relative;
  left: -175px;
  top: -220px;
  min-width: 400px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  transition: all 1s ease-out;
  animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  z-index: 10;

  &:after {
    background: #fff;
    content: '';
    height: 25px;
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 25px;
    z-index: -1;
  }

  .marker-window__img {
    width: 40%;
    height: 100%;
  }

  .marker-window__right {
    width: 55%;
    height: 100%;
    padding: 0 2.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${({ theme }) => theme.black};

    .marker-window__right__title {
      font-size: 14px;
      margin: 0;
    }

    .marker-window__right__price {
      font-size: 16px;
      margin: 0;
    }

    .marker-window__right__link {
      width: auto;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.blue} !important;

      &:hover {
        color: #6d6d6d;
      }
    }
  }
`;
