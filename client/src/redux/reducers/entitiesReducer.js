import {
  FETCH_ENTITIES,
  SEARCH_ENTITIES,
  CREATE_NEW_ENTITY,
} from '../actions/entitiesActions';

const initialState = {
  entities: [],
};

export const entitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ENTITIES:
      return { ...state, entities: payload };
    case SEARCH_ENTITIES:
      return {
        ...state,
        entities: payload,
      };
    case CREATE_NEW_ENTITY:
      return { ...state, message: action.payload };
    default:
      return { ...state };
  }
};
