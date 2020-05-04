export const SET_POKEDEX = "SET_POKEDEX";

export const fetchPokedex = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();

    const pokemon = await Promise.all(
      resData.results.map(async (data, index) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        const res = await fetch(url);
        const pokemonData = await res.json();
        return pokemonData;
      })
    );
    dispatch({
      type: SET_POKEDEX,
      pokedex: pokemon,
    });
  };
};
