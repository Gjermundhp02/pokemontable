import { Pokemon } from "../types/pokemon"
import { KeyVal } from "../types/pokemonKeyVal"

export function filterPokemon(pokemon: Pokemon, generation?: string, region?: string): KeyVal {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        generation: generation?.split('-'),
        region: region,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((type) => type.type.name),
        // Assumes order of stats is always the same
        stats: {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            special_attack: pokemon.stats[3].base_stat,
            special_defense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
        },
    }
}

export function formatPokemon(pokemon: KeyVal): KeyVal {
    if(pokemon.generation){
        pokemon.generation[0] = pokemon.generation[0][0].toUpperCase() + pokemon.generation[0].slice(1)
        pokemon.generation[1] = pokemon.generation[1].toUpperCase()
    }

    return {
        ...pokemon,
        name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
        generation: pokemon.generation,
        region: pokemon.region ? pokemon.region[0].toUpperCase() + pokemon.region.slice(1) : undefined,
        types: pokemon.types.map((type) => type[0].toUpperCase() + type.slice(1)),
    }
}
