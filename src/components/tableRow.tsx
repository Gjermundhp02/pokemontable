import React, { forwardRef, useEffect, useState } from "react"
import { TableState } from "../redux/table"
import "../styles/tableRow.css"
import { Link, useNavigate } from "react-router-dom"
import { KeyVal } from "../types/pokemonKeyVal"

type TableRowProps = {
    pokemon: KeyVal
    table: TableState
    index: number
    activeRow: number
}

export default forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ pokemon, table, index, activeRow }: TableRowProps, ref): JSX.Element {
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        if(index === activeRow) {
            setActive("SelectedRow")
        }
        else{
            setActive("")
        }
    }, [activeRow])

    return (
            <tr key={pokemon.id} className={active} ref={ref} onClick={()=>navigate(`/${pokemon.id}`)}>
                {table.picture && <td><img src={pokemon.image} alt={pokemon.name} /></td>}
                <td>{pokemon.name}</td>
                <td>{pokemon.id}</td>
                {table.weight && <td>{pokemon.weight}</td>}
                {table.height && <td>{pokemon.height}</td>}
                {table.types && <td>{pokemon.types.join(", ")}</td>}
            </tr>
    )
})