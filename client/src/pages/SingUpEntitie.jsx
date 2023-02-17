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
    name: false,
    email: { isError: false, errorMsg: '' },
    address: false,
    imageCloud: false,
    cbu: false,
    materials: false,
    description: false,
  });
  console.log(errors.email.isError);
  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);

    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const validate = (form, name) => {
    let isError = {};

    if (form[name].length === 0) {
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
        isError: form.cbu.length !== 22,
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
      <FormControl isRequired isInvalid={errors.name}>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="name"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="text"
          value={form.name}
        />
        {!errors.name ? (
          <FormHelperText>Ingresa el nombre.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
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
      <FormControl isRequired isInvalid={errors.address}>
        <FormLabel>Dirección</FormLabel>
        <Input
          name="address"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="text"
          value={form.address}
        />
        {!errors.address ? (
          <FormHelperText>Indica la dirección.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={errors.imageCloud}>
        <FormLabel>Imagen</FormLabel>
        <Input
          name="imageCloud"
          type="text"
          onChange={handlerChange}
          onBlur={handlerBlur}
          value={form.imageCloud}
        />
        {!errors.imageCloud ? (
          <FormHelperText>
            Arrastra aquí la imagen de tu entidad.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.cbu}>
        <FormLabel>CBU</FormLabel>
        <Input
          name="cbu"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="number"
          value={form.cbu}
        />
      </FormControl>
      <FormControl isRequired isInvalid={errors.materials}>
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
          {!errors.materials ? (
            <FormHelperText>
              Selecciona únicamente los materiales que recibirás.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Requerido.</FormErrorMessage>
          )}
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.description}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          onChange={handlerChange}
          onBlur={handlerBlur}
          name="description"
          placeholder="Ingresa una descripción..."
          value={form.description}
        />
        {!errors.description ? (
          <FormHelperText>Escribe una descripción.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="green" type="submit">
        Enviar
      </Button>
    </FormControl>
  );
};

export default SingUpEntitie;
