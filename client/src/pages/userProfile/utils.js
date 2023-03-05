import axios from 'axios';
require('dotenv').config();
const { BASE_URL } = process.env;
import { logoutAcount } from '../../redux/actions/acountActions';

const deleteUser = (id, navigate, dispatch) => {
  axios.delete(`${BASE_URL}/user/${id}`).then(() => {
    dispatch(logoutAcount());
    navigate('/home');
  });
};

const updateUser = (id, input) => {
  try {
    axios.put(`${BASE_URL}/user/${id}`, input).then(() => {
      window.alert('Los cambios se han guardado exitosamente');
    });
  } catch (error) {
    window.alert(error);
  }
};

export { deleteUser, updateUser };
