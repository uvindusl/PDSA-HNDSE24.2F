import React from "react";
import styled from "styled-components";

const MinusBtn = () => {
  return (
    <StyledWrapper>
      <button className="bin-button">-</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bin-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 15px;
    background-color: rgba(255, 133, 133, 1);
    cursor: pointer;
    border: 3px solid rgb(255, 201, 201);
    transition-duration: 0.3s;
    color: white;
    font-size: 2rem;
  }
  .bin-button:hover {
    background-color: rgb(255, 0, 0);
    font-size: 4rem;
  }
  .bin-button:active {
    transform: scale(0.9);
  }
`;

export default MinusBtn;
