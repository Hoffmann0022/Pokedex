const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.home.front_default

    // detalhes para a página de detalhes
    
    pokeDetail.stats.forEach(stat => {
        if (stat.stat.name === 'hp'){
            pokemon.hp = stat.base_stat;
        } else if (stat.stat.name === 'attack'){
            pokemon.attack = stat.base_stat;
        } else if (stat.stat.name === 'defense'){
            pokemon.defense = stat.base_stat;
        } else if (stat.stat.name === 'special-attack'){
            pokemon.spAttack = stat.base_stat;
        } else if (stat.stat.name === 'special-defense'){
            pokemon.spDefense = stat.base_stat;
        } else if (stat.stat.name === 'speed'){
            pokemon.speed = stat.base_stat;
        }
    })

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails) 

}
pokeApi.getPokemonDetailId = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

