import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import  PokeCard  from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"

 const PokedexPage = () => {
  
    const [inputValue, setInputValue] = useState("")
    const [typeSelected, setTypeSelected] = useState("allPokemons")
    
 const trainer = useSelector(store => store.trainer)
  
  const inputSearch = useRef()
  
  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"
  
  const [ pokemons, getPokemons, getTypePokemons] = useFetch(url)

    useEffect(() => {
        if (typeSelected === "allPokemons") {
            getPokemons()         
        } else{
            getTypePokemons(typeSelected)
        }
    }, [typeSelected])

    const handleSearch = e => {
        e.preventDefault()
        setInputValue(inputSearch.current.value.trim().toLowerCase())
    }

    const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))

    return (
    <div className="Pagina2">
        <h2><span className="trainer-text">"{trainer}"</span> Welcome to the adventure</h2>
        <form onSubmit={handleSearch}>
            <input ref={inputSearch} type="text" placeholder="write here" />
            <button>Search</button>
        </form>
        <SelectType
          setTypeSelected={setTypeSelected}/>
        <div>
            {
                pokeFiltered?.map(poke => (
                    <PokeCard
                        key={poke.url}
                        url={poke.url}
                    />
                ))
            }
        </div>
    </div>
  )
}


export default PokedexPage