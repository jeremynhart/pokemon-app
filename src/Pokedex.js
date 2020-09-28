import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Toolbar, AppBar, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import {flattenDeep, uniq} from 'lodash';
import './Pokedex.css'

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
},

    cardMedia: {
    display: "flex-block",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "40px",
},

    cardContent: {
    height: "20px",
    textAlign: "center",
},

    searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginLeft: "35px",
    marginRight: "30px",
    marginTop: "20px",
    marginBottom: "20px",
},

    searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
},

    searchInput: {
    width: "200px",
    marginBottom: "20px",
},
}));

const Pokedex = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);

useEffect(() => {
    axios
        .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
        .then(function (response) {
        const { data } = response;
        const { pokemon } = data;
        const newPokemonData = {};
        pokemon.forEach((pokemon, index) => {
            newPokemonData[index + 1] = {
            id: index + 1,
            type: pokemon.type,
            name: pokemon.name,
            weaknesses: pokemon.weaknesses,
            sprite: pokemon.img,
            };
        });
        setPokemonData(newPokemonData);
    });
}, 
[]);

const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
}; 

const handleTypeChange = (e) => {
    const {name, checked} = e.target;
    if (checked){
        setSelectedTypes(types => types.concat(name));
    } else {
        setSelectedTypes(types => types.filter(type => type !== name));
    }
}

const handleWeaknessChange = (e) => {
    const {name, checked} = e.target;
    if (checked){
        setSelectedWeaknesses(weaknesses => weaknesses.concat(name));
    } else {
        setSelectedWeaknesses(weaknesses => weaknesses.filter(weakness => weakness !== name));
    }
}

const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
        <Grid item xs={12} sm={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${id}`)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={sprite}
                    style={{ width: "175px", height: "175px" }}
                />
            <CardContent className={classes.cardContent}>
                <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
            </CardContent>
            </Card>
        </Grid>
    );
};

return (
    <>
        <AppBar color="primary" position="static">
            <Toolbar>
            <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon} />
                <TextField
                    className={classes.searchInput}
                    onChange={handleSearchChange}
                    label="Search by Name"
                    ariant="standard"
                />
            </div>
            <div id="typeCheck">
                <h3>Search by Types</h3>
                {uniq(flattenDeep(Object.values(pokemonData).map(pokemon => pokemon.type))).map((type, i) => (
                    <FormControlLabel
                        key={i}
                        control={<Checkbox name={type} onChange={handleTypeChange} />}
                        label={type}
                    />
                ))}
            </div>
            <div id="weakCheck">
                <h3>Search by Weaknesses</h3>
                {uniq(flattenDeep(Object.values(pokemonData).map(pokemon => pokemon.weaknesses))).map((weakness, i) => (
                    <FormControlLabel
                        key={i}
                        control={<Checkbox onChange={handleWeaknessChange} name={weakness} />}
                        label={weakness}
                    />
                ))}
            </div>            
            </Toolbar>
            </AppBar>
        {pokemonData ? (
            <Grid container spacing={2} className={classes.pokedexContainer}>
                {Object.keys(pokemonData).map((pokemonId) =>
                    pokemonData[pokemonId].name.toLowerCase().includes(filter) &&
                    (selectedTypes.length ? selectedTypes.some(type => pokemonData[pokemonId].type.includes(type)) : true) &&
                    (selectedWeaknesses.length ? selectedWeaknesses.some(weakness => pokemonData[pokemonId].weaknesses.includes(weakness)) : true) &&                    
                    getPokemonCard(pokemonId)
                )}
        </Grid>
        ) : (
        <CircularProgress />
        )}
    </>
);
};
export default Pokedex;