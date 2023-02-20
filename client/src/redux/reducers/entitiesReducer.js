import {
  FETCH_ENTITIES,
  SEARCH_ENTITIES,
  CREATE_NEW_ENTITY,
  GET_MATERIALS,
  FILTER_BY_MATERIALS,
} from '../actions/entitiesActions';

const initialState = {
  entities: [],
  message: '',
  materials: [],
  filterbymaterial: [],
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
      return { ...state, message: payload };
    case GET_MATERIALS:
      return { ...state, materials: payload };
    case FILTER_BY_MATERIALS:
      return { ...state, filterbymaterial: payload };
    default:
      return { ...state };
  }
};
