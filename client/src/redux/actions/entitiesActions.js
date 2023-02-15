import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';

export const fetchEntities = () => {
  return async (dispatch) => {
    const res = await axios.get();
    const entities = res.data;

    dispatch({ type: FETCH_ENTITIES, payload: entities });
  };
};
