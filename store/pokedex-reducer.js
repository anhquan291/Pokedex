import { SET_POKEDEX } from "./pokedex-actions";

const initialState = {
  pokedex: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEDEX:
      return {
        pokedex: action.pokedex,
      };
  }
  return state;
};
