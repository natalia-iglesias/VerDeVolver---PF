import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const SEARCH_ENTITIES = 'SEARCH_ENTITIES';
export const CREATE_NEW_ENTITY = 'CREATE_NEW_ENTITY';
export const GET_MATERIALS = 'GET_MATERIALS';
export const FILTER_BY_MATERIALS = 'FILTER_BY_MATERIALS';

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
      //console.log(response.data);
      const materials = response.data.map((m) => m.name);

      dispatch({ type: GET_MATERIALS, payload: materials });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const filterByMaterials = (array) => {
  console.log(array);
  return {
    type: FILTER_BY_MATERIALS,
    payload: array,
  };
};
