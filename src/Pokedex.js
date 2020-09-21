import React from "react";
import {AppBar, Toolbar, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    pokedexContainer: {
    marginTop: "75px",
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
}})

const Pokedex = () => {
    const classes = useStyles();
    return (
        <>
        <AppBar postion="static">
            <Toolbar></Toolbar>
        </AppBar>
        <Grid margin-top={75} container spacing={2} className={classes.pokedexContainer}>
            <Grid item xs={4}>
                Item 1
            </Grid>
            <Grid item xs={4}>
                Item 2
            </Grid>
            <Grid item xs={4}>
                Item 3
            </Grid>
        </Grid>
        </>
    );
};

export default Pokedex;