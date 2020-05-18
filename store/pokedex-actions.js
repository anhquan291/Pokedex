import {
  insertPlace,
  init,
  fetchFavPokemon,
  removeFavPoke,
} from "../helper/favPoke";
export const SET_POKEDEX = "SET_POKEDEX";
export const SET_FAVORITE = "SET_FAVORITE";
export const FETCH_FAVORITE = "FETCH_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

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
    const pokemonInfo = await Promise.all(
      resData.results.map(async (data, index) => {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${index + 1}`;
        const res = await fetch(url);
        const pokemonData = await res.json();
        return pokemonData;
      })
    );
    // const indexAbility = [];
    // for (let i = 1; i <= 232; i++) {
    //   indexAbility.push(i);
    // }
    const indexAbility = [];
    for (let i = 1; i <= 100; i++) {
      indexAbility.push(i);
    }
    const pokeAbilites = await Promise.all(
      indexAbility.map(async (data, index) => {
        const url = `https://pokeapi.co/api/v2/ability/${index + 1}`;
        const res = await fetch(url);
        const pokeAbility = await res.json();
        return pokeAbility;
      })
    );
    const moves = [];
    for (let i = 1; i <= 100; i++) {
      moves.push(i);
    }
    const pokeMoves = await Promise.all(
      moves.map(async (data, index) => {
        const url = `https://pokeapi.co/api/v2/move/${index + 1}`;
        const res = await fetch(url);
        const pokeMove = await res.json();
        return pokeMove;
      })
    );
    //create sqlite database
    init();
    const dbResult = await fetchFavPokemon();
    const favPoke = dbResult.rows._array;
    const favFinal = [];
    favPoke.map((pokemon) => favFinal.push(JSON.parse(pokemon.data)));
    dispatch({
      type: SET_POKEDEX,
      pokedex: pokemon,
      pokemonInfo,
      pokeAbilites,
      pokeMoves,
      favorite: favFinal,
    });
  };
};

// export const fetchFavoritePokemon = () => {
//   return async (dispatch) => {
//     try {
//       const dbResult = await fetchFavPokemon();
//       dispatch({ type: SET_FAVORITE, favorite: dbResult.rows._array });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const deleteFav = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await removeFavPoke(id);
      dispatch({ type: REMOVE_FAVORITE, id });
    } catch (err) {
      throw err;
    }
  };
};
export const addFavPokemon = (id, data) => {
  return async (dispatch) => {
    const dbResult = await insertPlace(id, data);
    dispatch({
      type: ADD_FAVORITE,
      id,
    });
  };
};
