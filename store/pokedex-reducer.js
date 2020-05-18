import {
  SET_POKEDEX,
  SET_FAVORITE,
  REMOVE_FAVORITE,
  ADD_FAVORITE,
} from "./pokedex-actions";

const initialState = {
  pokedex: [],
  pokemonInfo: [],
  pokeAbilites: [],
  pokeMoves: [],
  pokeFavorite: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEDEX:
      return {
        pokedex: [...action.pokedex],
        pokemonInfo: [...action.pokemonInfo],
        pokeAbilites: [...action.pokeAbilites],
        pokeMoves: [...action.pokeMoves],
        pokeFavorite: [...action.favorite],
      };

    // const checkFav = state.pokeFavorite.findIndex(
    //   (pokemon) => pokemon.id === action.pokemonID
    // );
    // if (checkFav >= 0) {
    //   const updatedPokedex = [...state.pokeFavorite];
    //   updatedPokedex.splice(checkFav, 1);
    //   return { ...state, pokeFavorite: updatedPokedex };
    // } else {
    //   const pokedex = state.pokedex.find(
    //     (pokemon) => pokemon.id === action.pokemonID
    //   );
    //   return { ...state, pokeFavorite: state.pokeFavorite.concat(pokedex) };
    // }
    // return state;
    case ADD_FAVORITE:
      const pokedex = state.pokedex.find((pokemon) => pokemon.id === action.id);
      return { ...state, pokeFavorite: state.pokeFavorite.concat(pokedex) };

    case REMOVE_FAVORITE:
      return {
        ...state,
        pokeFavorite: state.pokeFavorite.filter(
          (pokemon) => pokemon.id !== action.id
        ),
      };
    default:
      return state;
  }
};
