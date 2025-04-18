export function Card({ character }) {
  return (
    <li>
        <img src={character.imageUrl}/>
        <p>{character.name}</p>
        
    </li>
  )
}