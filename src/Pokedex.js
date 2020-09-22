import React, {useState} from "react";
import {AppBar, Toolbar, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Card,CardMedia,CardContent} from '@material-ui/core';
import mockData from './mockData';
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
    pokedexContainer: {
    marginTop: "75px",
    paddingTop: "25px",
    paddingLeft: "50px",
    paddingRight: "50px",
    },
});


const Pokedex = () => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(mockData);

    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]);
        const { id , name } = pokemonData[`${pokemonId}`];
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (

    <Grid item xs={12} sm={4} key={pokemonId}> 
        <CardContent>
            <Card>Card</Card>
        </CardContent>       
    </Grid>

    );
};




    return (
    <>
        <AppBar postion="static">
            <Toolbar></Toolbar>
        </AppBar>
        {pokemonData ? (
        <Grid margin-top={75} container spacing={2} className={classes.pokedexContainer}>
            {Object.keys(pokemonData).map(pokemonId =>
                getPokemonCard(pokemonData) )}
        </Grid>
        ) : (
            <CircularProgress /> 
        )}
    </>
    );
};

export default Pokedex;