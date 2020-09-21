import React from "react";
import {AppBar, Toolbar, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Card,CardMedia,CardContent} from '@material-ui/core';

const useStyles = makeStyles({
    pokedexContainer: {
    marginTop: "75px",
    paddingTop: "25px",
    paddingLeft: "50px",
    paddingRight: "50px",
}})

const getPokemonCard = () => {
    return (
    <Grid item xs={12} sm={4}> 
        <Card>Card</Card>
    </Grid>
    );
};


const Pokedex = () => {
    const classes = useStyles();
    return (
        <>
        <AppBar postion="static">
            <Toolbar></Toolbar>
        </AppBar>
        <Grid margin-top={75} container spacing={2} className={classes.pokedexContainer}>
             {getPokemonCard()}
             {getPokemonCard()}
             {getPokemonCard()}
        </Grid>
        </>
    );
};

export default Pokedex;