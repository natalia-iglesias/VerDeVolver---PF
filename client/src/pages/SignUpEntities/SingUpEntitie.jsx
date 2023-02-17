import { materials } from '../../db.json';
import { useState } from 'react';
import validate from './validate';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  FormHelperText,
  Textarea,
  Button,
} from '@chakra-ui/react';

const SingUpEntitie = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    imageCloud: '',
    cbu: '',
    materials: [],
    description: '',
  });

  const [errors, setErrors] = useState({
    name: { isError: false, errorMsg: '' },
    email: { isError: false, errorMsg: '' },
    address: { isError: false, errorMsg: '' },
    imageCloud: { isError: false, errorMsg: '' },
    cbu: { isError: false, errorMsg: '' },
    materials: { isError: false, errorMsg: '' },
    description: { isError: false, errorMsg: '' },
  });

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    Object.keys(form).forEach((name) => {
      const errOjb = validate(form, name);

      setErrors({ ...errors, [name]: errOjb });
    });
  };
  const deleteMaterial = (mat) => {
    const newMaterials = form.materials.filter((eachMat) => eachMat !== mat);
    setForm({ ...form, materials: newMaterials });
  };

  const addMaterial = (e) => {
    let newMaterials = [...form.materials];
    newMaterials.push(e.target.value);
    const uniqueMaterials = [...new Set([...newMaterials])];
    setForm({ ...form, materials: uniqueMaterials });
  };
  return (
    <FormControl margin="3%" onSubmit={handlerSubmit}>
      <FormControl isRequired isInvalid={errors.name.isError}>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="name"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="text"
          value={form.name}
        />
        {!errors.name.isError && form.name.length === 0 ? (
          <FormHelperText>Ingresa el nombre de tu proyecto.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.name.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.email.isError}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="email"
          value={form.email}
        />
        {!errors.email.isError && form.email.length === 0 ? (
          <FormHelperText>Ingresa tu email.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.email.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.address.isError}>
        <FormLabel>Dirección</FormLabel>
        <Input
          name="address"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="text"
          value={form.address}
        />
        {!errors.address.isError && form.address.length === 0 ? (
          <FormHelperText>Indica la dirección.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.address.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.imageCloud.isError}>
        <FormLabel>Imagen</FormLabel>
        <Input
          name="imageCloud"
          type="text"
          onChange={handlerChange}
          onBlur={handlerBlur}
          value={form.imageCloud}
        />
        {!errors.imageCloud.isError && form.imageCloud.length === 0 ? (
          <FormHelperText>
            Arrastra aquí la imagen de tu entidad.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.address.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isInvalid={errors.cbu.isError}>
        <FormLabel>CBU</FormLabel>
        <Input
          name="cbu"
          onChange={handlerChange}
          type="number"
          value={form.cbu}
        />
        {!errors.cbu.isError ? (
          <FormHelperText>
            Puedes ingresar tu CBU para recibir donaciones.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.cbu.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.materials.isError}>
        <FormLabel>Materiales Reciclables</FormLabel>
        <Select
          placeholder="Elegir material"
          w="18vw"
          name="materials"
          onChange={(e) => addMaterial(e)}
          onBlur={handlerBlur}
        >
          {materials.map((mat, i) => {
            return (
              <option key={i} value={mat}>
                {mat}
              </option>
            );
          })}
        </Select>
        <br />
        {form.materials.map((mat, i) => {
          return (
            <Button key={i} onClick={() => deleteMaterial(mat)}>
              {mat}
            </Button>
          );
        })}

        {!errors.materials.isError && form.materials.length === 0 ? (
          <FormHelperText>
            Selecciona únicamente los materiales que recibirás.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.materials.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.description.isError}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          onChange={handlerChange}
          onBlur={handlerBlur}
          name="description"
          placeholder="Ingresa una descripción..."
          value={form.description}
        />
        {!errors.description.isError && form.description.length === 0 ? (
          <FormHelperText>
            Cuéntanos brevemente sobre tu proyecto.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.description.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <Button colorScheme="green" type="submit" onClick={handlerSubmit}>
        Enviar
      </Button>
      <br />
    </FormControl>
  );
};

export default SingUpEntitie;
