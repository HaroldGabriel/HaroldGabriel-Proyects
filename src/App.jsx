import { useCallback, useEffect,useState } from 'react'
import './App.css'
import { Characters } from './components/Cards'
import { useSearch } from './hooks/useSearch'
import { useCharacters } from './hooks/useCharacters';
import  debounce from 'just-debounce-it'

function App() {
  const [sort , setSort] = useState(false)
  const {search,error,setSearch} = useSearch()
  const {characters , getCharacters , loading} = useCharacters({search , sort})

  const debounceGetCharacters = useCallback(
    debounce(search => {
    getCharacters({search})
  }
  , 500),[getCharacters])

  const handleSubmit = (event)=>{
    event.preventDefault()
  }

  const handleChange=(e)=>{
    const newSearch = e.target.value
    setSearch(newSearch)
    debounceGetCharacters(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(() => {
    getCharacters({ search: '' }); // Llama a la API con un valor vacío para cargar la lista inicial
  }, [getCharacters]);//recordar que solo cambia si cambia la referencia de la función

  return (
    <div className='container'>
      <header className='header'>
        <form className='form' onSubmit={handleSubmit}>
          <input className="input" onChange={handleChange} value={search} name='query' placeholder='Search by name' />    
          <button className='button' type='button' onClick={handleSort}>
              {sort ? '🡅' : '🡇'}
          </button>      
        </form>    
        {error && <p className='error'>{error}</p>}
      </header>
      <br></br>          
      <main className='main'>
        {loading ? 
          <p className="spinner">Loading...</p>:
          <Characters characters={characters} />
        }       
      </main>     
    </div>
  )
}

export default App

//recordar pasar useSearch directo a la App