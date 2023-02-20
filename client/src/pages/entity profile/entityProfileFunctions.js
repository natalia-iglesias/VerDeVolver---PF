import axios from 'axios';

const deleteMaterial = (mat, materials, setInput) => {
  const newMaterials = materials.filter((eachMat) => eachMat.name !== mat);
  setInput((prevObj) => {
    return { ...prevObj, Materials: newMaterials };
  });
};

const addMaterial = (e, materials, setInput) => {
  let newMaterials = [...materials];
  newMaterials.push({ name: e.target.value });
  const uniqueMaterials = [...new Set([...newMaterials])];
  setInput((prevObj) => {
    return { ...prevObj, Materials: uniqueMaterials };
  });
};

const updateVdV = (id, input) => {
  try {
    axios.put(`http://localhost:3001/vdv/${id}`, input).then(() => {
      window.alert('Los cambios se han guardado exitosamente');
    });
  } catch (error) {
    window.alert(error);
  }
};

const deleteVdV = (id, navigate) => {
  axios.delete(`http://localhost:3001/vdv/${id}`).then(() => {
    window.alert('La entidad a sido borrada');
    navigate('/home');
  });
};

export { deleteMaterial, addMaterial, updateVdV, deleteVdV };
