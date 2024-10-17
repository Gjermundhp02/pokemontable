import React, { forwardRef, useEffect, useState } from "react"
import { Pokemon } from "../../types"
import { TableState } from "../redux/table"
import "../styles/tableRow.css"
import { Link, useNavigate } from "react-router-dom"

type TableRowProps = {
    pokemon: Pokemon
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
                {table.picture && <td><img src={pokemon.sprites.front_default} alt={pokemon.name} /></td>}
                <td>{pokemon.name}</td>
                <td>{pokemon.id}</td>
                {table.weight && <td>{pokemon.weight}</td>}
                {table.height && <td>{pokemon.height}</td>}
                {table.types && <td>{pokemon.types.map((type) => type.type.name).join(", ")}</td>}
            </tr>
    )
})