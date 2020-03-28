import styled, { keyframes, css } from 'styled-components';

export const MarkerCounter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  padding: 0 10px 0 5px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  border-bottom-right-radius: 100px;
  border-top-right-radius: 100px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  background-color: #fff;
  left: -10%;
  z-index: -1;

  &:before {
    box-sizing: initial;
    content: '';
    position: absolute;
    height: 100%;
    width: 25px;
    left: -52%;
    background: #fff;
    z-index: -2;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
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

export const MarkerGroup = styled.div`
  position: relative;
  top: -48px;
  left: -17px;
  display: flex;
  align-items: center;
  width: 70px;

  ${props =>
    props.hoverState && props.points.some(obj => obj.markerId === props.hoverIdState)
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
