import { FETCH_FEEDBACKS, FILTER_BY_MATERIAL, ORDER_BY_RATING, FETCH_ENTITIES, GET_MATERIALS} from '../actions/D_filtersSearchActions';

const initialState = {
    entities: [],
    allEntities: [],
    materials: [],
    feedbacks: [],
};

//no lo implemente lo deje aca nomas 

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
    //este lo copie pero modifique el estado
      case FETCH_ENTITIES:
        return { 
            ...state, 
            allEntities: payload 
        };

      case FETCH_FEEDBACKS:
        return { 
            ...state, 
            feedbacks: payload 
        };
    
      case FILTER_BY_MATERIAL:
        const filterByMaterial = state.allEntities
        const filteredMaterials = filterByMaterial.filter((element) => { 
          return element.materials.find((element) => { return element.name === action.payload; }); 
        });
  
        if (action.payload === 'todos') {
          return {
            ...state, 
            entities: filterByMaterial
          }
        } else {
          return {
            ...state,
            entities: filteredMaterials
          }
        }
  // este lo hice a la pasada para tener algo desde donde comenzar a cranear mejor
  // sorry por el choclo de codigo repetido, me fue mas facil hacerlo asi mientras 
  // ni en pedo anda todavia 
      case ORDER_BY_RATING:
        let orderEntitiesByRating;

        if (action.payload === 5) {
            state.feedbacks.filter((element) => { 
                return element.rating.find((element) => { return element.rating === action.payload; }); });
          return {
              ...state, 
              feedbacks: orderEntitiesByRating
            }
        };
        if (action.payload === 4) {
            state.feedbacks.filter((element) => { 
                return element.rating.find((element) => { return element.rating === action.payload; }); });
          return {
              ...state, 
              feedbacks: orderEntitiesByRating
            }
        };
        if (action.payload === 3) {
            state.feedbacks.filter((element) => { 
                return element.rating.find((element) => { return element.rating === action.payload; }); });
          return {
              ...state, 
              feedbacks: orderEntitiesByRating
            }
        };
        if (action.payload === 2) {
            state.feedbacks.filter((element) => { 
                return element.rating.find((element) => { return element.rating === action.payload; }); });
          return {
              ...state, 
              feedbacks: orderEntitiesByRating
            }
        };
        if (action.payload === 1) {
            state.feedbacks.filter((element) => { 
                return element.rating.find((element) => { return element.rating === action.payload; }); });
          return {
              ...state, 
              feedbacks: orderEntitiesByRating
            }
        };

    //este lo copie
     case GET_MATERIALS:
      return { 
        ...state, 
        materials: payload 
        };

     default:
      return { ...state };

    }
};