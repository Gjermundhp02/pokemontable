import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Pokemon, PokemonPage } from "../../types"

type next = string | void

type PokeList = {
    next: next
    pokemons: Pokemon[]
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
        getPokemon: builder.query<Pokemon, number>({
            query: (id) => `pokemon/${id}`
        }),

        // Dessigned to be called useGetPokemonListQuery(data.next)
        getPokemonList: builder.query<PokeList, next>({
            async queryFn(arg = "limit=20", _api, _extraOptions, baseQuery) {
                const res = await baseQuery(`pokemon?${arg}`);
                if(res.error) {
                    return { error: res.error }
                }

                const data = res.data as PokemonPage // Type assertion
                const next = data.next ? data.next.split("?").pop() : null
                if (!next) return { error: { status: 'CUSTOM_ERROR', error: 'Next url missing params' } }

                const pokemons = (await Promise.all(data.results.map(async (pokemon) => {
                    const param = pokemon.url.split("/").filter(Boolean).pop()
                    const res = await baseQuery(`pokemon/${param}`)
                    if (res.error) return null
                    return res.data as Pokemon
                }))).filter(Boolean) as Pokemon[] // Filter out any null values (TODO: Should pass on error)

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