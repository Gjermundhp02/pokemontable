import { Action, createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Pokemon, PokemonPage } from "../../types"
import { REHYDRATE } from "redux-persist"

type next = string | void

type PokeList = {
    next: next
    pokemons: Pokemon[]
}

type RootState = any

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string
    payload: RootState
    err: unknown
  } {
    return action.type === REHYDRATE
  }

export const pokemonApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        // Dessigned to be called useGetPokemonListQuery(data.next)
        getPokemonList: builder.query<PokeList, next>({
            async queryFn(arg = "limit=20", api, extraOptions, baseQuery) {
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
            },
        }),
    }),
})

export const { useGetPokemonListQuery, useLazyGetPokemonListQuery } = pokemonApi

// export const pokemonSlice = createSlice({
//     name: "pokemon",
// })