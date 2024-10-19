import { useGetPokemonListQuery, useLazyGetPokemonListQuery } from "../redux/api"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import TableRow from "../components/tableRow"
import { useCallback, useEffect, useRef } from "react"
import "../styles/table.css"
import { setActiveRow } from "../redux/table"

export default function Home() {
    const { data, isFetching, isLoading } = useGetPokemonListQuery()
    const [fetchNextPage] = useLazyGetPokemonListQuery()
    const useAppSelector = useSelector.withTypes<RootState>()
    const table = useAppSelector((state) => state.TableState)
    const dispatch = useDispatch()

    const listRefs = useRef<HTMLElement[]>([])
    const documentRef = useRef(document)

    const listitems = data?.pokemons.map((pokemon, index) => {
        return <TableRow 
                    ref={(el: HTMLTableRowElement) => listRefs.current[index] = el} 
                    key={index}
                    {...{pokemon, table, index}} 
                />
    })


    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                if (!data?.pokemons) return false
                e.preventDefault()
                dispatch(setActiveRow(Math.min(table.activeRow + 1, data?.pokemons.length - 1)))
                listRefs.current[table.activeRow+1]?.scrollIntoView({ behavior: "smooth", block: "center" })
                break;
            case "ArrowUp":
                if (!data?.pokemons) return false
                e.preventDefault()
                dispatch(setActiveRow(Math.max(table.activeRow - 1, 0)))
                listRefs.current[table.activeRow-1]?.scrollIntoView({ behavior: "smooth", block: "center" })
                break;
            case "Enter":
                if (!data?.pokemons) return false
                e.preventDefault()
                listRefs.current[table.activeRow]?.click()
                break;
        }
    }, [data?.pokemons, table.activeRow, dispatch])

    const handleScroll = useCallback((e: Event) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight-window.innerHeight && !isFetching) {
            fetchNextPage(data?.next)
        }
    }, [data?.next, fetchNextPage, isFetching])
    
    // Register eventlisteners
    useEffect(() => {
        documentRef.current.addEventListener("keydown", handleKeyDown)
        documentRef.current.addEventListener("scroll", handleScroll)
        return () => {
            documentRef.current.removeEventListener("keydown", handleKeyDown)
            documentRef.current.removeEventListener("scroll", handleScroll)
        }
    }, [handleKeyDown, handleScroll])

    // Scroll to active row when entering the page
    useEffect(() => {
        listRefs.current[table.activeRow]?.scrollIntoView({ behavior: "auto", block: "center" })
    }, [])

    return <div id="table">
        <table>
            <thead>
                <tr id="thr">
                    {table.image && <th>Picture</th>}
                    <th>Name</th>
                    <th>ID</th>
                    {table.weight && <th>Weight</th>}
                    {table.height && <th>Height</th>}
                    {table.types && <th>Types</th>}
                </tr>
            </thead>
            <tbody>
                {listitems}
            </tbody>
        </table>
    </div>
}