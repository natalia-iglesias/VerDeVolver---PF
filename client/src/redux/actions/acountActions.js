import axios from 'axios';
export const AUTH_ACOUNT_LOCAL = 'AUTH_ACOUNT_LOCAL';
export const AUTH_ACOUNT_GOOGLE = 'AUTH_ACOUNT_GOOGLE';
export const LOGOUT_ACOUNT = 'LOGOUT_ACOUNT';
export const LOGED_USER = 'LOGED_USER';

import useLocalAcount from '../../hooks/useLocalAcount';
import useSessionAcount from '../../hooks/useSesionAcout';

const { setLocalAcount, getLocalAcount, removeLocalAcount } = useLocalAcount();
const { setSessionAcount, getSessionAcount, removeSessionAcount } =
  useSessionAcount();

  export const authAcountLocal = ({ mail, password, keepLogged }) => {
    return async (dispatch) => {
      try {
        const auth = await axios
          .post('/login', {
            mail: mail,
            password: password,
          })
          .catch(function (error) {
            if (error.response) {
              return error.response.data, error.response.status;
            }
          });
        if (auth !== 401) {
          const { token } = await auth.data;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          keepLogged
            ? setLocalAcount({ mail, token })
            : setSessionAcount({ mail, token });
  
          const acount = await axios
            .get(`/login?mail=${mail}`, config)
            .catch(function (error) {
              if (error.response) {
                return error.response.data, error.response.status;
              }
            });
  
          dispatch({ type: AUTH_ACOUNT_LOCAL, payload: acount.data });
        }
      } catch (error) {
        throw Error(error);
      }
    };
  };;

export const LogedUser = () => {
  
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
          `/login?mail=${user?.mail}`,
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
  window.location.href =
   
    'https://verdevolver-pf-production.up.railway.app/login/google';
};

export const logoutAcount = () => {
 
  removeLocalAcount();
  removeSessionAcount();
  return { type: LOGOUT_ACOUNT, payload: {} };
};
