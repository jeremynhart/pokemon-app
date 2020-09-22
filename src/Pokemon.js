import React from "react";

const Pokemon = props => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
return <div>Pokemon ID = {pokemonId}</div>
};

export default Pokemon;