import { useGetPokemonListQuery, useLazyGetPokemonListQuery } from "../redux/api"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import TableRow from "../components/tableRow"
import { useCallback, useEffect, useRef, useState } from "react"
import "../styles/table.css"

export default function Home() {
    const { data, isFetching, isLoading } = useGetPokemonListQuery()
    const [fetchNextPage] = useLazyGetPokemonListQuery()
    const useAppSelector = useSelector.withTypes<RootState>()
    const table = useAppSelector((state) => state.TableState)

    const listRefs = useRef<HTMLElement[]>([])
    const [activeRow, setActiveRow] = useState(0);

    const listitems = data?.pokemons.map((pokemon, index) => {
        return <TableRow 
                    ref={(el: HTMLTableRowElement) => listRefs.current[index] = el} 
                    key={index}
                    {...{pokemon, table, index, activeRow}} 
                />
    })

    const documentRef = useRef(document)

    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                if (!data?.pokemons) return false
                e.preventDefault()
                setActiveRow((prev) => Math.min(prev + 1, data?.pokemons.length - 1))
                listRefs.current[activeRow+1]?.scrollIntoView({ behavior: "smooth", block: "center" })
                break;
            case "ArrowUp":
                if (!data?.pokemons) return false
                e.preventDefault()
                setActiveRow((prev) => Math.max(prev - 1, 0))
                listRefs.current[activeRow-1]?.scrollIntoView({ behavior: "smooth", block: "center" })
                break;
            case "Enter":
                if (!data?.pokemons) return false
                e.preventDefault()
                listRefs.current[activeRow]?.click()
                break;
        }
    }, [data?.pokemons, activeRow])

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
    })

    return <div id="table">
        <table>
            <thead>
                <tr id="thr">
                    {table.picture && <th>Picture</th>}
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