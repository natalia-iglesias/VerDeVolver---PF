import axios from 'axios';

export const AUTH_ACOUNT_LOCAL = 'AUTH_ACOUNT_LOCAL';
export const AUTH_ACOUNT_GOOGLE = 'AUTH_ACOUNT_GOOGLE';
export const LOGOUT_ACOUNT = 'LOGOUT_ACOUNT';
export const LOGED_USER = 'LOGED_USER';
/* export const AUTH_ACOUNT_ENTITY = 'AUTH_ACOUNT_ENTITY'; */

import useLocalAcount from '../../hooks/useLocalAcount';
import useSessionAcount from '../../hooks/useSesionAcout';

const { setLocalAcount, getLocalAcount, removeLocalAcount } = useLocalAcount();
const { setSessionAcount, getSessionAcount, removeSessionAcount } =
  useSessionAcount();

export const authAcountLocal = ({ mail, password, keepLogged }) => {
  return async (dispatch) => {
    try {
      const auth = await axios.post('http://localhost:3001/login', {
        mail: mail,
        password: password,
      });

      const { token } = await auth.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      keepLogged
        ? setLocalAcount({ mail, token })
        : setSessionAcount({ mail, token });

      const acount = await axios.get(
        `http://localhost:3001/login?mail=${mail}`,
        config
      );

      dispatch({ type: AUTH_ACOUNT_LOCAL, payload: acount.data });
    } catch (error) {
      alert('Contraseña o mail incorrectos')
    }
  };
};

export const LogedUser = () => {
  ///////este tendria que funcionar para ambos despues de un pequeno cambio que le hice
  return async function (dispatch) {
    try {
      const user = getLocalAcount() ?? getSessionAcount();

      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const res = await axios.get(
          `http://localhost:3001/login?mail=${user?.mail}`,
          config
        );

        const userData = res.data;

        return dispatch({ type: LOGED_USER, payload: userData });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const authAcountGoogle = () => {
  window.location.href = 'http://localhost:3001/login/google';
};

export const logoutAcount = () => {
  ///////este tendria que funcionar para ambos, entidades y users
  removeLocalAcount();
  removeSessionAcount();
  return { type: LOGOUT_ACOUNT, payload: {} };
};

/* export const authAcountEntity = ({ mail, password, keepLogged }) => {
  return async (dispatch) => {
    try {
      const auth = await axios.post('http://localhost:3001/loginVdv', {
        mail: mail,
        password: password,
      });

      const { token } = await auth.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      keepLogged
        ? setLocalAcount({ mail, token })
        : setSessionAcount({ mail, token });

      const acount = await axios.get(
        `http://localhost:3001/loginVdv?mail=${mail}`,
        config
      );

      dispatch({ type: AUTH_ACOUNT_ENTITY, payload: acount.data });
    } catch (error) {
      alert(error.message);
    }
  };
}; */
