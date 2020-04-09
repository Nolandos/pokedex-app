import React, { useEffect } from "react";
import styled from "styled-components";

const PreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  width: 350px;
`;
const PhotoBox = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: 15px;
  background-color: #ff5a00;
  overflow: hidden;
  background-image: url("pokeball.png");
  background-position: center;
  background-size: auto;
  border: 1px solid #000;
`;
const Photo = styled.img`
  width: auto;
  height: 90%;
`;

const Name = styled.p`
  font-size: 1.5em;
  text-transform: uppercase;
  margin-top: 0;
  font-weight: bold;
`;

const PreviewPokemon = ({ pokemon }) => {
  const { name, imageUrl } = pokemon;

  return (
    <PreviewCard>
      <PhotoBox>
        <Photo src={imageUrl} />
      </PhotoBox>
      <Name>{name}</Name>
    </PreviewCard>
  );
};

export default PreviewPokemon;
