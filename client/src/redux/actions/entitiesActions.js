import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';

export const fetchEntities = (entityName, materialFilter, rankingSort) => {
  return async (dispatch) => {
    const res = await axios.get(
      'https://run.mocky.io/v3/ba0379db-1de8-4b72-a9c0-011fad535922'
    );

    const entities = res.data;
    console.log('entities:::', entities);

    dispatch({ type: FETCH_ENTITIES, payload: entities });
  };
};
