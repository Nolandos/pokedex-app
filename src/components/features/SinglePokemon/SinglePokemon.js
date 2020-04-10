import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { loadSinglePokemonRequest } from "../../../redux/pokemonsReducer";
import { resetRequest } from "../../../redux/requestsStatusReducer";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//import components
import { Loader } from "../../index";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
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
  const request = useSelector(({ requests }) => requests.pokemons_request);

  const fetchData = async () => {
    await dispatch(resetRequest("pokemons_request"));
    dispatch(loadSinglePokemonRequest(parseInt(match.params.id)));
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
          <Grid item xs={6}>
            <Wrapper>
              <img src={pokemon.imageUrl}></img>
            </Wrapper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {pokemon.species.flavor_text_entries[1].flavor_text}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      )}
    </CardContent>
  );
};

export default SinglePokemon;
