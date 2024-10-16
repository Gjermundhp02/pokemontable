import { useEffect } from "react"
import { useGetPokemonListQuery, useLazyGetPokemonListQuery } from "../redux/pokemon"

export default function Home() {
    const { data, isFetching, isLoading } = useGetPokemonListQuery()
    const [fetchNextPage] = useLazyGetPokemonListQuery()
    const nexturl = data?.next

    const getNextData = () => {
        fetchNextPage(nexturl)
    }
    console.log(data)

    return <></>
}