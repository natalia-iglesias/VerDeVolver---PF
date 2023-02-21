import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const SEARCH_ENTITIES = 'SEARCH_ENTITIES';
export const CREATE_NEW_ENTITY = 'CREATE_NEW_ENTITY';
export const GET_MATERIALS = 'GET_MATERIALS';
// export const FILTER_BY_MATERIALS = 'FILTER_BY_MATERIALS';
export const FILTER_ENTITIES_BY_MATERIAL = 'FILTER_ENTITIES_BY_MATERIAL';
export const SORT_ENTITIES_BY_RANKING = 'SORT_ENTITIES_BY_RANKING';

export const fetchEntities = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/vdv');

      const entities = res.data;

      dispatch({ type: FETCH_ENTITIES, payload: entities });
    } catch (error) {}
  };
};

export const searchEntities = (search) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/vdv?name=${search}`);
    const entities = res.data;

    dispatch({ type: SEARCH_ENTITIES, payload: entities });
  };
};

export const createNewEntity = (entity) => {
  return async function (dispatch) {
    try {
      const res = await axios.post('http://localhost:3001/vdv', entity);
      const message = res.data;
      dispatch({ type: CREATE_NEW_ENTITY, payload: message });
      alert(
        'Muchas gracias por completar tus datos! Dentro de las próximas 48 horas recibirás un mail con los pasos a seguir.'
      );
    } catch (error) {
      alert('No pudimos crear el formulario.');
      dispatch({ type: CREATE_NEW_ENTITY, payload: error.message });
    }
  };
};

export const getMaterials = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/material');

      const materials = response.data;

      dispatch({ type: GET_MATERIALS, payload: materials });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const filterEntitiesByMaterial = (material) => {
  return async function (dispatch) {
    dispatch({ type: FILTER_ENTITIES_BY_MATERIAL, payload: material });
  };
};

export const sortEntitiesByRanking = (order) => {
  return async function (dispatch) {
    dispatch({ type: SORT_ENTITIES_BY_RANKING, payload: order });
  };
};
