import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./styles/PokeCard.css";

const typeColors = {
  fire: "#FF5733",
  water: "#3388FF",
  grass: "#499249",
  electric: "#FFFF33",
  psychic: "#FF33FF",
  bug: "#718a59"
};

const PokeCard = ({ url }) => {
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };

  // Función para obtener el color basado en el tipo principal del Pokémon
  const getTypeColor = () => {
    const primaryType = pokemon?.types[0]?.type.name.toLowerCase();
    // Verificamos si el tipo principal existe en la paleta de colores
    if (typeColors.hasOwnProperty(primaryType)) {
      return typeColors[primaryType];
    }
    // Si el tipo no está en la paleta, podemos asignar un color predeterminado
    return "#CCCCCC"; // Gris por defecto
  };

  return (
    <article
      className="pokecard"
      style={{ backgroundColor: getTypeColor() }}
      onClick={handleClick}
    >
        <header className="pokecard__header">
          <img 
          className="pokecard__image"
          src={pokemon?.sprites.other['official-artwork'].front_default} 
          alt="" />
        </header>
        <section className="pokecard__body">
          <h3 className="pokecard__name">{pokemon?.name}</h3>
          <ul className="pokecard__types">
            {
              pokemon?.types.map(typeInfo => (
                <li className="pokecard__typename" key={typeInfo.type.url}>{typeInfo.type.name}</li>
              ))}
          </ul>
          <hr className="pokecard__hr"/>
          <ul className="pokecard__stats">
            {pokemon?.stats.map((statInfo) => (
                <li className="pokecard__stat" key={statInfo.stat.url}>
                  <h4 className="pokecard__stat__name">{statInfo.stat.name}</h4>
                  <span className="pokecard__stat__value">{statInfo.base_stat}</span>
                </li>
              ))}
          </ul>
        </section>
    </article>
  );
};

export default PokeCard;
