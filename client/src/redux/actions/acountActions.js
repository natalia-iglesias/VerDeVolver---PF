import axios from 'axios';

export const AUTH_ACOUNT_LOCAL = 'AUTH_ACOUNT_LOCAL';
export const AUTH_ACOUNT_GOOGLE = 'AUTH_ACOUNT_GOOGLE';

export const authAcountLocal = ({ mail, password }) => {
  return async (dispatch) => {
    try {
      const auth = await axios.post('http://localhost:3001/login', {
        mail,
        password,
      });
      const { token } = await auth.data;

      const cfg = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const acount = await axios.get('http://localhost:3001/login', mail, cfg);

      dispatch({ type: AUTH_ACOUNT_LOCAL, payload: acount.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const authAcountGoogle = () => {
  return async (dispatch) => {
    try {
      const auth = await axios.get('http://localhost:3001/login/google');

      dispatch({ type: AUTH_ACOUNT_GOOGLE, payload: auth.data });
    } catch (error) {
      alert(error.message);
    }
  };
};
