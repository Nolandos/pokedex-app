import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeballImg from "./pokeball.png";
import PropTypes from "prop-types";

import { GoArrowRight } from "react-icons/go";

const PreviewCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  width: 200px;
  transform-origin: left top;
  transition: transform 0.5s;
  &:hover {
    cursor: pointer;
    transform: translateY(-15px);
  }
`;

const PhotoBox = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: 15px;
  background-color: #ff5a00;
  overflow: hidden;
  background-image: url(${pokeballImg});
  background-position: center;
  background-size: contain;
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

const Arrow = styled.p`
  font-size: 65px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  position: absolute;
  margin: 0;
  right: -35px;
  top: 80px;
  color: #000;
  font-weight: bold;
  @media (max-width: 768px) {
    display: none;
  }
`;

const EvolutionChainItem = ({ evolution, arrow }) => {
  return (
    <Link
      to={`/pokemon/${evolution.name}`}
      activeClassName={`${PreviewCard}`}
      style={{ textDecoration: "none" }}
    >
      <PreviewCard>
        <PhotoBox>
          <Photo src={evolution.imageUrl} />
        </PhotoBox>
        <Name>{evolution.name}</Name>
        {arrow && (
          <Arrow>
            <GoArrowRight />
          </Arrow>
        )}
      </PreviewCard>
    </Link>
  );
};

EvolutionChainItem.propTypes = {
  evolution: PropTypes.object,
  arrow: PropTypes.bool
};

export default EvolutionChainItem;
