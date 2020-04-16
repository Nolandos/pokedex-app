import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { loadSinglePokemonRequest } from "../../../redux/pokemonsReducer";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

//import components
import {
  Loader,
  TypesPokemonIcon,
  AbilityPopover,
  EvolutionChain
} from "../../index";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${props => (props.direction === "column" ? "column" : "row")};
`;

const Image = styled.img`
  max-width: 350px;
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  font-size: 2.5em;
`;

const SectionTitle = styled.h2`
  display: flex;
  font-size: 2.2em;
  margin-bottom: 0;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
`;

const Description = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2em;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const SinglePokemon = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pokemon = useSelector(({ pokemons }) => pokemons.singlePokemon);
  const request = useSelector(
    ({ requests }) => requests.single_pokemon_request
  );

  const fetchData = async () => {
    dispatch(loadSinglePokemonRequest(match.params.id));
  };

  useEffect(() => {
    fetchData();
  }, [match.params.id]);

  return (
    <CardContent className="card-content">
      {request.pending && <Loader />}
      {request.success && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Title>{pokemon.name}</Title>
          </Grid>
          <Grid item xs={12} md={6}>
            <Wrapper>
              <Image src={pokemon.imageUrl}></Image>
            </Wrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Description>
              {
                pokemon.species.flavor_text_entries.find(
                  item => item.language.name === "en"
                ).flavor_text
              }
            </Description>
          </Grid>
          <Grid item xs={12} md={4}>
            <SectionTitle>Types</SectionTitle>
            <Wrapper>
              {pokemon.types.map((type, index) => {
                return <TypesPokemonIcon key={index} type={type.type.name} />;
              })}
            </Wrapper>
          </Grid>
          <Grid item xs={12} md={4}>
            <SectionTitle>Size</SectionTitle>
            <Wrapper>
              <TypesPokemonIcon type="weight" value={pokemon.weight} />
              <TypesPokemonIcon type="height" value={pokemon.height} />
            </Wrapper>
          </Grid>
          <Grid item xs={12} md={4}>
            <SectionTitle>Ability</SectionTitle>
            <Wrapper direction="column">
              {pokemon.abilities.map((ability, index) => {
                return (
                  <AbilityPopover
                    name={ability.ability.name}
                    key={index}
                    index={index}
                    description={
                      ability.description.find(
                        item => item.language.name === "en"
                      ).flavor_text
                    }
                  />
                );
              })}
            </Wrapper>
          </Grid>
          <Grid item xs={12}>
            <SectionTitle>Evolution Chain</SectionTitle>
            <EvolutionChain evolutionChain={pokemon.evoChain} />
          </Grid>
        </Grid>
      )}
    </CardContent>
  );
};

SinglePokemon.propTypes = {
  match: PropTypes.object
};

export default SinglePokemon;
