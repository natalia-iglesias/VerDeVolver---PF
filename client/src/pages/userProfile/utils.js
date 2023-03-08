import axios from 'axios';
import { logoutAcount } from '../../redux/actions/acountActions';

const deleteUser = (id, navigate, dispatch) => {
  axios.delete(`http://localhost:3001/user/${id}`).then(() => {
    dispatch(logoutAcount());
    navigate('/home');
  });
};

const updateUser = async (id, input) => {
  try {
    const res = await axios.put(`http://localhost:3001/user/${id}`, input);

    return res.data.id;
  } catch (error) {
    console.log(error);
    return 'No se han actualizado los datos';
  }
};

const updateUserPassword = async (id, password) => {
  try {
    const res = await axios.put(`http://localhost:3001/user/password/${id}`, password);
    return ((res.data.id), (res.status));
  } catch (error) {
    return 'No se ha actualizado la contraseña';
  }
};

export { deleteUser, updateUser, updateUserPassword };
