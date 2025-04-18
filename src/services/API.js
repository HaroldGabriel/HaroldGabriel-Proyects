const page = 1
const pageSize=20
const baseUrl = `https://api.disneyapi.dev/character/`

export const API = async ({search}) =>{  
  const API_URL = search
    ? `${baseUrl}?page=${page}&pageSize=${pageSize}&name=${search}`
    : `${baseUrl}?page=${page}&pageSize=${pageSize}`

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data.data)  

    let characters = data.data

    if (!Array.isArray(characters)) {
      characters = [characters];
    }

    return characters?.map(character => ({
      id: character._id,
      name: character.name,      
      imageUrl: character.imageUrl
    }))

  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    throw error;
  }
}
