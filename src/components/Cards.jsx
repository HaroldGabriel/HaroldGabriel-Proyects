import React from 'react'
import { Card } from './card'

function ListCharacters({characters}) {
  return (
    <ul className='Cards'>       
      {
        characters.map(character =>{
          return (
            character && character.imageUrl && <Card key={character.id} character={character}/>
          )
        })       
      }
      {characters?.length === 0 && <p>No personajes encontrados</p>}
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

export function Characters({characters}){
  const hasCharacters = characters?.length > 0

  return (
    hasCharacters? 
      <ListCharacters characters={characters}/>:
      <NoMoviesResults/>          
  )
}
