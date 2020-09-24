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
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className="pokeCard">
        <Typography position variant="h4">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "200px", height: "200px" }} src={fullImageUrl} />
        <br/><br/>
        <Typography variant="h5">Pokemon Info</Typography>
        <br/>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <br/>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
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