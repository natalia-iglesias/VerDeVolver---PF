import {
  FETCH_ENTITIES,
  SEARCH_ENTITIES,
  CREATE_NEW_ENTITY,
  GET_MATERIALS,
  FILTER_ENTITIES_BY_MATERIAL,
  SORT_ENTITIES_BY_RANKING,
} from '../actions/entitiesActions';

const initialState = {
  entities: [],
  message: '',
  materials: [],
  filteredEntities: [],
};
export const entitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ENTITIES:
      return { ...state, entities: payload, filteredEntities: payload };
    case SEARCH_ENTITIES:
      return {
        ...state,
        entities: payload,
      };
    case CREATE_NEW_ENTITY:
      return { ...state, message: payload };
    case GET_MATERIALS:
      return { ...state, materials: payload };
    case FILTER_ENTITIES_BY_MATERIAL:
      if (!payload) {
        return { ...state, filteredEntities: [...state.entities] };
      }
      const filteredEntities = state.entities.filter((entity) => {
        return entity.Materials.find((material) => {
          if (material.name === payload) {
            return true;
          }
        });
      });
      return { ...state, filteredEntities: [...filteredEntities] };
    case SORT_ENTITIES_BY_RANKING:
      const sortedEntities =
        action.payload === '1'
          ? state.filteredEntities.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            })
          : state.filteredEntities.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              return 0;
            });
      return {
        ...state,
        filteredEntities: [...sortedEntities],
      };
    default:
      return { ...state };
  }
};
