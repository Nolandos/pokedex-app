import React from "react";
import styled from "styled-components";

//import components
import { EvolutionChainItem } from "../../index";

const Wrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: ${props => (props.direction === "column" ? "column" : "row")};
`;

const EvolutionChain = ({ evolutionChain }) => {
  const len = evolutionChain.length - 1;

  return (
    <Wrapper>
      {evolutionChain.map((evolution, index) => {
        console.log(index, len);
        return (
          <EvolutionChainItem
            evolution={evolution}
            arrow={index < len ? true : false}
          />
        );
      })}
    </Wrapper>
  );
};

export default EvolutionChain;
