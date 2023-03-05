import axios from 'axios';

import { logoutAcount } from '../../redux/actions/acountActions';

const deleteUser = (id, navigate, dispatch) => {
  axios.delete(`$/user/${id}`).then(() => {
    dispatch(logoutAcount());
    navigate('/home');
  });
};

const updateUser = (id, input) => {
  try {
    axios.put(`/user/${id}`, input).then(() => {
      window.alert('Los cambios se han guardado exitosamente');
    });
  } catch (error) {
    window.alert(error);
  }
};

export { deleteUser, updateUser };
