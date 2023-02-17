import { materials } from '../db.json';
import { useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
  Textarea,
  Button,
  GridItem,
  Grid,
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

  const validate = (form, name) => {
    let isError = {
      isError: false,
      errorMsg: '',
    };

    if (form[name].length === 0 && name !== 'cbu') {
      isError = {
        isError: true,
        errorMsg: 'Requerido',
      };
      return isError;
    }
    if (name === 'email') {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      isError = {
        isError: !regex.test(form.email),
        errorMsg: 'Por favor ingresa un email válido.',
      };
    }
    if (name === 'cbu') {
      isError = {
        isError: form.cbu.length !== 22 && form.cbu.length !== 0,
        errorMsg: 'El cbu debe ser de 22 digitos.',
      };
    }
    return isError;
  };
  const handlerChange = (e) => {
    let keyValue;
    if (typeof e === 'string') {
      keyValue = { ['materials']: [...form.materials, e] };
    } else {
      const { name, value } = e.target;
      keyValue = { [name]: value };
    }
    setForm({ ...form, ...keyValue });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
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
      <FormControl isInvalid={errors.cbu.isError}>
        <FormLabel>CBU</FormLabel>
        <Input
          name="cbu"
          onChange={handlerChange}
          onBlur={handlerBlur}
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
      <FormControl isRequired isInvalid={errors.materials.isError}>
        <FormLabel>Materiales Reciclables</FormLabel>
        <RadioGroup
          name="materials"
          onChange={handlerChange}
          onBlur={handlerBlur}
        >
          <HStack>
            <Grid templateColumns="repeat(4, 7fr)" gap={6}>
              {materials?.map((m, i) => (
                <GridItem key={i} w="100%" h="10" width={'auto'}>
                  <Radio key={i} colorScheme="green" value={m}>
                    {m}
                  </Radio>
                </GridItem>
              ))}
            </Grid>
          </HStack>
          {!errors.materials.isError && form.materials.length === 0 ? (
            <FormHelperText>
              Selecciona únicamente los materiales que recibirás.
            </FormHelperText>
          ) : (
            <FormErrorMessage>{errors.materials.errorMsg}</FormErrorMessage>
          )}
        </RadioGroup>
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
          <FormHelperText>Escribe una descripción.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.description.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="green" type="submit">
        Enviar
      </Button>
    </FormControl>
  );
};

export default SingUpEntitie;
