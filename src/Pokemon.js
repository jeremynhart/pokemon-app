/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import './Pokemon.css'

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);


  useEffect(() => {
    axios
      .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(function (response) {
        const { data } = response;
        const selectedPokemon = data.pokemon.find(p => p.id === parseInt(pokemonId))
        setPokemon(selectedPokemon);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, height, weight, type, img, weaknesses } = pokemon;
    return (
      <div className="pokeCard">
        <Typography variant="h4">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={img} />
        </Typography>
        <img style={{ width: "200px", height: "200px" }} src={img} />
        <Typography>
          {"Species: "}
          <Link href={img}>{name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <br/>
        <Typography variant="h6"> Types:</Typography>
        {type.map(name => {
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
        <br/>
        <Typography variant="h6"> Weaknesses:</Typography>
        {weaknesses.map(name => {
          return <Typography key={name}> {`${name}`}</Typography>;
        })}        
      </div>
    );
  };
  return (
    <div className="btnCont">
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      <br/>
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </div>
  );
};
export default Pokemon;