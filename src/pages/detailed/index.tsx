import { useCallback, useEffect } from "react"
import { useGetPokemonQuery } from "../../redux/api"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import "../../styles/detailed.css"
import Nav from "../../components/nav"
import { useDispatch } from "react-redux"
import { setActiveRow } from "../../redux/table"

export async function loader({ params }: { params: any}) {
    const id = parseInt(params.id)
    if (isNaN(id) || id < 1) {
        throw new Response("Invalid ID", { status: 400 })
    }
    return { id: parseInt(params.id) }
}

export default function Detailed() {
    const navigate = useNavigate()
    const loderdata = useLoaderData()
    const id = (loderdata as { id: number }).id // Type assertion
    const { data, error, isLoading } = useGetPokemonQuery(id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setActiveRow(id-1))
    })
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            navigate("/")
        }
    }, [])

    // Register eventlisteners
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <div className="detailedContainer">
            <Nav id={data?.id}/>
            <div>
                <img src={data?.image} alt={data?.name} />
                <div className="headerCard">
                    <h1>{data?.name}<span><i>#</i>{data?.id}</span></h1>
                    <div className="content">
                        <div>
                            <p>{data?.generation && data?.generation[0]} <span>{data?.generation && data.generation[1]}</span> · {data?.region}</p>
                            <p>Types: {data?.types.join(', ')}</p>
                        </div>
                        <div className="statCard">
                            <h2>Stats:</h2>
                            <div>
                                <div>
                                    <div><p>Height: </p><p>{data?.height}</p></div>
                                    <div><p>Weight: </p><p>{data?.weight}</p></div>
                                    <div><p>HP: </p><p>{data?.stats.hp}</p></div>
                                    <div><p>Attack: </p><p>{data?.stats.attack}</p></div>
                                </div>
                                <div>
                                    <div><p>Defense: </p><p>{data?.stats.defense}</p></div>
                                    <div><p>Special Attack: </p><p>{data?.stats.special_attack}</p></div>
                                    <div><p>Special Defense: </p><p>{data?.stats.special_defense}</p></div>
                                    <div><p>Speed: </p><p>{data?.stats.speed}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}