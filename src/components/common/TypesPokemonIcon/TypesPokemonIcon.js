import React from "react";
import PropTypes from "prop-types";
import "./TypePokemonIcon.scss";
import {
  GiGrass,
  GiPoisonBottle,
  GiBoxingGlove,
  GiGroundSprout,
  GiRock,
  GiSpottedBug,
  GiGhost,
  GiMetalBar,
  GiCelebrationFire,
  GiWaterSplash,
  GiElectric,
  GiPsychicWaves,
  GiIceCube,
  GiSpikedDragonHead,
  GiBlackHoleBolas,
  GiFairyWand,
  GiTwoShadows,
  GiWeight,
  GiBodyHeight,
  GiFlyingTarget,
} from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const TypesPokemonIcon = ({ type, value, classes }) => {
  return (
    <>
      {type === "grass" && (
        <div className="type">
          <GiGrass className={`type-icon grass ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "poison" && (
        <div className="type">
          <GiPoisonBottle className={`type-icon poison ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "fighting" && (
        <div className="type">
          <GiBoxingGlove className={`type-icon fighting ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "flying" && (
        <div className="type">
          <GiFlyingTarget className={`type-icon flying ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "ground" && (
        <div className="type">
          <GiGroundSprout className={`type-icon ground ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "rock" && (
        <div className="type">
          <GiRock className={`type-icon rock ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "bug" && (
        <div className="type">
          <GiSpottedBug className={`type-icon bug ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "ghost" && (
        <div className="type">
          <GiGhost className={`type-icon ghost ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "steel" && (
        <div className="type">
          <GiMetalBar className={`type-icon steel ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "fire" && (
        <div className="type">
          <GiCelebrationFire className={`type-icon fire ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "water" && (
        <div className="type">
          <GiWaterSplash className={`type-icon water ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "electric" && (
        <div className="type">
          <GiElectric className={`type-icon electric ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "psychic" && (
        <div className="type">
          <GiPsychicWaves className={`type-icon psychic ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "ice" && (
        <div className="type">
          <GiIceCube className={`type-icon ice ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "dragon" && (
        <div className="type">
          <GiSpikedDragonHead className={`type-icon dragon ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "dark" && (
        <div className="type">
          <GiBlackHoleBolas className={`type-icon dark ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "fairy" && (
        <div className="type">
          <GiFairyWand className={`type-icon fairy ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "unknown" && (
        <div className="type">
          <FaQuestion className={`type-icon unknow ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "shadow" && (
        <div className="type">
          <GiTwoShadows className={`type-icon shadow ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "normal" && (
        <div className="type">
          <MdDone className={`type-icon normal ${classes}`} />
          <p className="type-name">{type}</p>
        </div>
      )}
      {type === "weight" && (
        <div className="type">
          <GiWeight className="type-icon" />
          <p className="type-name">{value / 10} kg</p>
        </div>
      )}
      {type === "height" && (
        <div className="type">
          <GiBodyHeight className="type-icon" />
          <p className="type-name">{value / 10} m</p>
        </div>
      )}
    </>
  );
};

TypesPokemonIcon.propTypes = {
  type: PropTypes.string,
  value: PropTypes.number,
  classes: PropTypes.string,
};

export default TypesPokemonIcon;
