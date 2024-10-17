export type KeyVal = {
    id: number
    name: string
    image: string
    height: number
    weight: number
    types: string[]
    stats: Stats
    generation?: string
    region?: string
}

export interface Stats {
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
}