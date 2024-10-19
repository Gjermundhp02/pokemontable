import React, { forwardRef, useEffect, useState } from "react"
import { TableState } from "../redux/table"
import "../styles/tableRow.css"
import { Link, useNavigate } from "react-router-dom"
import { KeyVal } from "../types/pokemonKeyVal"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


type TableRowProps = {
    pokemon: KeyVal
    index: number
}

export default forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ pokemon, index }: TableRowProps, ref): JSX.Element {
    const useAppSelector = useSelector.withTypes<RootState>()
    const table = useAppSelector((state) => state.TableState)
    const navigate = useNavigate()
    

    return (
            <tr key={pokemon.id} className={table.activeRow===index?'SelectedRow':undefined} ref={ref} onClick={()=>navigate(`/${pokemon.id}`)}>
                {table.image && <td><img src={pokemon.image} alt={pokemon.name} /></td>}
                <td>{pokemon.name}</td>
                <td>{pokemon.id}</td>
                {table.weight && <td>{pokemon.weight}</td>}
                {table.height && <td>{pokemon.height}</td>}
                {table.types && <td>{pokemon.types.join(", ")}</td>}
            </tr>
    )
})