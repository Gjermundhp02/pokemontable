import { useCallback, useEffect } from "react"
import { useGetPokemonQuery } from "../../redux/api"
import { useLoaderData } from "react-router-dom"
import "../../styles/detailed.css"

export async function loader({ params }: { params: any}) {
    const id = parseInt(params.id)
    if (isNaN(id)) {
        throw new Response("Invalid ID", { status: 400 })
    }
    return { id: parseInt(params.id) }
}

export default function Detailed() {
    const loderdata = useLoaderData()
    const id = (loderdata as { id: number }).id // Type assertion
    const { data, error, isLoading } = useGetPokemonQuery(id)

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            window.history.back()
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
        <div className="container">
            <div>
                <img src={data?.image} alt={data?.name} />
                <h1>{data?.name}</h1>
            </div>
            <div>
                <div>
                    <div>
                        <p>Height: {data?.height}</p>
                        <p>Weight: {data?.weight}</p>
                    </div>

                </div>
                <div></div>
            </div>
        </div>
    )
}