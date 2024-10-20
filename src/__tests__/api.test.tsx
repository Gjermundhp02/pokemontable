import Store from '../redux/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetPokemonListQuery, useGetPokemonQuery, useLazyGetPokemonListQuery } from '../redux/api';

function Wrapper(props: { children: ReactNode }) {
    return <Provider store={Store}>{props.children}</Provider>;
}

const data = {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    generation: [ 'Generation', 'I' ],
    region: 'Kanto',
    height: 7,
    weight: 69,
    types: [ 'Grass', 'Poison' ],
    stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45
    }
}
describe("Individual pokemon", () => {
    it('Tests walid input', async () => {
        const { result } = renderHook(() => useGetPokemonQuery(1), { wrapper: Wrapper });
        expect(result.current).toMatchObject({
            status: 'pending',
            endpointName: 'getPokemon',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(data);
    });

    it('Tests invalid input', async () => {
        const { result } = renderHook(() => useGetPokemonQuery(-1), { wrapper: Wrapper });
        expect(result.current).toMatchObject({
            status: 'pending',
            endpointName: 'getPokemon',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toMatchObject({ originalStatus: 404 }); // The api does not return json on 404 so the query fails to parse the response
    })
})

describe('Pokemon list', () => {
    it('Tests base function', async () => {
        const { result } = renderHook(() => useGetPokemonListQuery(), { wrapper: Wrapper });
        expect(result.current).toMatchObject({
            status: 'pending',
            endpointName: 'getPokemonList',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.pokemons).toHaveLength(20);
    })
})