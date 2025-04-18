import { useCallback, useMemo, useRef, useState } from 'react'
import { API } from '../services/API.js'

export function useCharacters({search , sort}){
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true);
    const previousSearch = useRef(null)

    const getCharacters = useCallback(async ({search})=>{
        if (search === previousSearch.current) return
        try {
            setLoading(true)
            previousSearch.current = search
            const newCharacters = await API({search})
            setCharacters(newCharacters)
        } catch (error) {
            console.error('Error fetching characters:', error);
            setCharacters([]);
        }finally {
            setLoading(false); // Asegurar que loading sea false al finalizar
        }
    }, [])

    const sortCharacters = useMemo(()=>{
        console.log('useMemo recalculated')
        if (characters.length === 0) return characters
        return sort ? [...characters].sort((a, b) => a.name.localeCompare(b.name))
        : characters
        }, [sort , characters])

    return {characters : sortCharacters ,getCharacters,loading}
}