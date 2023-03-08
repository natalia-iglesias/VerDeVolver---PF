import axios from 'axios';

const deleteMaterial = (mat, materials, setInput) => {
  const newMaterials = materials.filter((eachMat) => eachMat.name !== mat);
  setInput((prevObj) => {
    return { ...prevObj, Materials: newMaterials };
  });
};

const addMaterial = (e, materials, setInput) => {
  let newMaterials = [...materials];
  const materialAdd = newMaterials.every(
    (objeto) => objeto.name !== e.target.value
  );
  materialAdd ? newMaterials.push({ name: e.target.value }) : null;
  const uniqueMaterials = [...new Set([...newMaterials])];
  setInput((prevObj) => {
    return { ...prevObj, Materials: uniqueMaterials };
  });
};

const updateVdV = (id, input) => {
  try {
    axios.get(`/material`).then((res) => {
      let numArray = [];
      console.log(input.Materials);
      res.data.forEach((mat) => {
        input.Materials.forEach((mat2) => {
          if (mat.name == mat2.name) numArray.push(mat.id);
        });
      });
      input.materials = numArray;
      console.log(numArray);
      axios.put(`/vdv/${id}`, input).then(() => {
        window.alert('Los cambios se han guardado exitosamente');
      });
    });
  } catch (error) {
    window.alert(error);
  }
};

const updatePassword = async (id, password) => {
  try {
    const res = await axios.put(`http://localhost:3001/vdv/password/${id}`, password);
    console.log(res)
    /* console.log(((res.data.id), (res.status)))
    return ((res.data.id), (res.status)); */
  } catch (error) {
    console.log(error);
    return 'No se ha actualizado la contraseña';
  }
};

const deleteVdV = (id, navigate) => {
  axios.delete(`/vdv/${id}`).then(() => {
    window.alert('La entidad a sido borrada');
    navigate('/home');
  });
};

export { deleteMaterial, addMaterial, updateVdV, deleteVdV, updatePassword };
