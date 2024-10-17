import { useCallback, useEffect } from "react"
import { useGetPokemonQuery } from "../../redux/api"
import { useLoaderData } from "react-router-dom"

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
        <div>
            <img src={data?.sprites.front_default} alt={data?.name} />
            <h1>{data?.name}</h1>
        </div>
    )
}