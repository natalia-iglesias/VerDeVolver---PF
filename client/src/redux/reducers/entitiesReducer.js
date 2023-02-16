import { FETCH_ENTITIES } from '../actions/entitiesActions';

const initialState = {
  entities: [],
};

export const entitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ENTITIES:
      return { ...state, entities: payload };

    default:
      return { ...state };
  }
};
