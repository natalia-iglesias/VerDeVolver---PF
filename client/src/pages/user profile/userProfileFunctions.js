import axios from 'axios';

const deleteUser = (id, navigate) => {
  axios.delete(`http://localhost:3001/user/${id}`).then(() => {
    window.alert('El usuario a sido borrado');
    navigate('/home');
  });
};

const updateUser = (id, input) => {
  try {
    axios.put(`http://localhost:3001/user/${id}`, input).then(() => {
      window.alert('Los cambios se han guardado exitosamente');
    });
  } catch (error) {
    window.alert(error);
  }
};

export { deleteUser, updateUser };
