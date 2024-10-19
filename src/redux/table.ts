import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TableState {
    image: boolean
    weight: boolean
    height: boolean
    types: boolean
    activeRow: number
}

const initialState: TableState = {
    image: true,
    weight: true,
    height: true,
    types: true,
    activeRow: 0
}

const pokemonSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<keyof Omit<TableState, "activeRow">>) => {
            state[action.payload] = !state[action.payload]
        },
        setActiveRow: (state, action: PayloadAction<number>) => {
            state.activeRow = action.payload
        }
    },
})

export const { toggle, setActiveRow } = pokemonSlice.actions
export default pokemonSlice.reducer