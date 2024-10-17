import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TableState {
    picture: boolean
    weight: boolean
    height: boolean
    types: boolean
}

const initialState: TableState = {
    picture: true,
    weight: true,
    height: true,
    types: true,
}

const pokemonSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<keyof typeof initialState>) => {
            state[action.payload] = !state[action.payload]
        }
    },
})

export const { toggle } = pokemonSlice.actions
export default pokemonSlice.reducer