import { FETCH_USERS } from '../actions/usersActions';

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, users: payload };
    default:
      return { ...state };
  }
};
