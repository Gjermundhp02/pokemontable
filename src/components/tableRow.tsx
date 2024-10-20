import { forwardRef, useCallback, useEffect, useRef} from "react"
import { setActiveRow } from "../redux/table"
import "../styles/tableRow.css"
import { useNavigate } from "react-router-dom"
import { KeyVal } from "../types/pokemonKeyVal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"


type TableRowProps = {
    pokemon: KeyVal
    index: number
}

export default forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ pokemon, index }, ref): JSX.Element {
    const useAppSelector = useSelector.withTypes<RootState>()
    const table = useAppSelector((state) => state.TableState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const localRef = useRef<HTMLTableRowElement | null>(null)

    const handleMouseEnter = useCallback(() => 
        dispatch(setActiveRow(index))
    , [index, dispatch])

    useEffect(() => {
        if (localRef.current) {
            localRef.current.addEventListener("mouseenter", handleMouseEnter)
            return () => {
                localRef.current?.removeEventListener("mouseenter", handleMouseEnter)
            }
        }
    }, [ref, handleMouseEnter])

    return (
            <tr key={pokemon.id} className={table.activeRow===index?'SelectedRow':undefined} ref={(el)=>{
                localRef.current = el
                if (typeof ref === "function") {
                    ref(el)
                }
                else if (ref) {
                    ref.current = el
                }
            }} onClick={()=>navigate(`/${pokemon.id}`)}>
                {table.image && <td><img src={pokemon.image} alt={pokemon.name} /></td>}
                <td>{pokemon.name}</td>
                <td>{pokemon.id}</td>
                {table.weight && <td>{pokemon.weight}</td>}
                {table.height && <td>{pokemon.height}</td>}
                {table.types && <td>{pokemon.types.join(", ")}</td>}
            </tr>
    )
})