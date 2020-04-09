import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  width: 350px;
  transform-origin: left top;
  transition: transform 0.5s;
  &:hover {
    cursor: pointer;
    transform: translateY(-30px);
  }
`;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.6);
  ${PreviewCard}:hover & {
    opacity: 1;
  }
  > p {
    color: #fff;
    font-size: 2em;
  }
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
  position: relative;
`;
const Photo = styled.img`
  width: auto;
  height: 90%;
`;

const Name = styled.p`
  font-size: 1.5em;
  text-transform: uppercase;
  color: #000;
  margin-top: 0;
  font-weight: bold;
`;

const PreviewPokemon = ({ pokemon }) => {
  const { name, imageUrl, id } = pokemon;

  return (
    <Link
      to={`/pokemon/${id}`}
      activeClassName={`${PreviewCard}`}
      style={{ textDecoration: "none" }}
    >
      <PreviewCard>
        <PhotoBox>
          <Overlay>
            <p>See More...</p>
          </Overlay>
          <Photo src={imageUrl} />
        </PhotoBox>
        <Name>{name}</Name>
      </PreviewCard>
    </Link>
  );
};

export default PreviewPokemon;
