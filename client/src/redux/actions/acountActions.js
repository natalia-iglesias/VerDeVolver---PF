import axios from 'axios';

export const AUTH_ACOUNT_LOCAL = 'AUTH_ACOUNT_LOCAL';
export const AUTH_ACOUNT_GOOGLE = 'AUTH_ACOUNT_GOOGLE';
export const LOGOUT_ACOUNT = 'LOGOUT_ACOUNT';
export const LOGED_USER = 'LOGED_USER';

export const authAcountLocal = ({ mail, password }) => {
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

      localStorage.setItem('LogedUser', JSON.stringify(auth.data));

      const acount = await axios.get(
        `http://localhost:3001/login?mail=${mail}`,
        config
      );

      dispatch({ type: AUTH_ACOUNT_LOCAL, payload: acount.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export function Logeduser() {
  return async function (dispatch) {
    try {
      let userData = localStorage.getItem("LogedUser");
      let userLS = JSON.parse(userData); 

      const config = {
        headers: {
          Authorization: `Bearer ${userLS.token}`,
        },
      };

      const userInfo = await axios.get(
        `http://localhost:3001/login?mail=${userLS.mail}`,
        config
      );
      const userDataDb = userInfo.data;

      const payload = {...userLS, ...userDataDb}

      return dispatch({
        type: LOGED_USER,
        payload: payload
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export const authAcountGoogle = () => {
  window.location.href = 'http://localhost:3001/login/google';
};

export const logoutAcount = () => {
  localStorage.removeItem('LogedUser');
  return { type: LOGOUT_ACOUNT, payload: {} };
};
