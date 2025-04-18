import {useState , useEffect ,useRef } from 'react'

export function useSearch() {
    const [search, setSearch] = useState('')
    const [error , setError] = useState('')
    const firstSearch = useRef(true)

    useEffect(()=>{
        if (firstSearch.current) {
            if (search === '') return
            firstSearch.current = false
        }
        
        /*if (search === '') {
            setError('No se puede buscar una película vacía')
            return
        }*/

        if (search.match(/^\d+$/)) {
            setError('No se puede buscar una película con un número')
            return
        }

        if (search.length < 3) {
            setError('La búsqueda debe tener al menos 3 caracteres')
            return
        }       
        setError(null)
    }
    ,[search])

    return { search, setSearch, error }
}
