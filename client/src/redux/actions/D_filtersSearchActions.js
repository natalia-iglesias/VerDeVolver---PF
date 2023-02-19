import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const FILTER_BY_MATERIAL = 'FILTER_BY_MATERIAL';
export const ORDER_BY_RATING = 'ORDER_BY_RATING'; 
export const GET_MATERIALS = 'GET_MATERIALS';
export const FETCH_FEEDBACKS = 'FETCH_FEEDBACKS';

//nada de esto esta implementado

//me copie el que ya estaba
export const fetchEntities = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get('http://localhost:3001/vdv');
  
        const entities = res.data;
  
        dispatch({ type: FETCH_ENTITIES, payload: entities });
      } catch (error) {
        alert(error.message);
      }
    };
};

export const fetchFeedbacks = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get('http://localhost:3001/feedback');
  
        const feedbacks = res.data;
  
        dispatch({ type: FETCH_FEEDBACKS, payload: feedbacks });
      } catch (error) {
        alert(error.message);
      }
    };
};

export function filterByMaterial(payload) {
    return {
      type: FILTER_BY_MATERIAL,
      payload,
    };
};

export function orderByRating(payload) {
    return {
      type: ORDER_BY_RATING,
      payload,
    };
};

//me copie el que ya estaba
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
