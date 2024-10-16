type Pokemon = {
    name: string
    id: number
    image: string | null
    weight: number
    height: number
    types: string[]
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
    species: string
    region: string
    generation: string
}

export interface PokemonPage {
    count: number
    next: string | null
    previous: string | null 
    results: Result[]
}

export interface Result {
    name: string
    url: string
}
  