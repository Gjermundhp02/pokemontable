import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { filterPokemon, formatPokemon} from "../utils/formatRes"
import { KeyVal } from "../types/pokemonKeyVal"
import { Page } from "../types/page"
import { Pokemon } from "../types/pokemon"
import { Species } from "../types/species"
import { Generation } from "../types/generation"

type next = string | void

type PokeList = {
    next: next
    pokemons: KeyVal[]
}

/**
 * Fetches a list of pokemons from the pokeapi
 * @param arg The query string to use
 * 
 * TODO: Filter down to only the used data
 * TODO: Persist how far the user has scrolled/how many is loaded (offset)
 */
export const pokemonApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getPokemon: builder.query<KeyVal, number>({
            async queryFn(arg, _api, _extraOptions, baseQuery) {
                const [res, speciesRes] = await Promise.all([
                    baseQuery(`pokemon/${arg}`),
                    baseQuery(`pokemon-species/${arg}`)
                ])
                if (res.error) {
                    return { error: res.error }
                }
                if (speciesRes.error) {
                    return { error: speciesRes.error }
                }
                const generationRes = await baseQuery(`generation/${(speciesRes.data as Species).generation.name}`)

                return { data: formatPokemon(filterPokemon(res.data as Pokemon, 
                                                          (speciesRes.data as Species).generation.name, 
                                                          (generationRes.data as Generation).main_region.name))
                }
            }
        }),

        // Dessigned to be called useGetPokemonListQuery(data.next)
        getPokemonList: builder.query<PokeList, next>({
            async queryFn(arg = "limit=20", _api, _extraOptions, baseQuery) {
                const res = await baseQuery(`pokemon?${arg}`);
                if(res.error) {
                    return { error: res.error }
                }

                const data = res.data as Page // Type assertion
                const next = data.next ? data.next.split("?").pop() : null
                if (!next) return { error: { status: 'CUSTOM_ERROR', error: 'Next url missing params' } }

                const pokemons = (await Promise.all(data.results.map(async (pokemon) => {
                    const param = pokemon.url.split("/").filter(Boolean).pop()
                    const res = await baseQuery(`pokemon/${param}`)
                    if (res.error) return null
                    return formatPokemon(filterPokemon(res.data as Pokemon))
                }))).filter(Boolean) as KeyVal[] // Filter out any null values (TODO: Should pass on error)

                return { data: { next: next, pokemons: pokemons } }
            },
            // Remove the query args from the cache key
            serializeQueryArgs: () => 0,
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.pokemons.push(...newItems.pokemons)
                currentCache.next = newItems.next
            },
        }),
    }),
})

export const { useGetPokemonListQuery, useLazyGetPokemonListQuery, useGetPokemonQuery } = pokemonApi