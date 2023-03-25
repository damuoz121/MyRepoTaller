const searchInput = document.querySelector('input');
const pokedexContent = document.querySelector('.pokedex__content');

const fetchPokemonData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  const pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-card__image');
  pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  pokemonCard.appendChild(pokemonImage);

  const pokemonName = document.createElement('h2');
  pokemonName.classList.add('pokemon-card__name');
  pokemonName.textContent = pokemon.name;
  pokemonCard.appendChild(pokemonName);

  const pokemonTypes = document.createElement('div');
  pokemonTypes.classList.add('pokemon-card__types');
  pokemon.types.forEach((type) => {
    const pokemonType = document.createElement('span');
    pokemonType.classList.add('pokemon-card__type', `pokemon-card__type--${type.type.name}`);
    pokemonType.textContent = type.type.name;
    pokemonTypes.appendChild(pokemonType);
  });
  pokemonCard.appendChild(pokemonTypes);

  pokedexContent.appendChild(pokemonCard);
};

const searchPokemon = async (name) => {
  pokedexContent.innerHTML = '';

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    createPokemonCard(data);
  } catch {
    console.log(`No se encontró ningún Pokémon con el nombre ${name}`);
  }
};

const loadPokemon = async () => {
  for (let i = 1; i <= 150; i++) {
    const data = await fetchPokemonData(i);
    createPokemonCard(data);
  }
};

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchValue = searchInput.value.toLowerCase();
    searchPokemon(searchValue);
  }
});

loadPokemon();