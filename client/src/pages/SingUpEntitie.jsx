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
    email: false,
    address: false,
    imageCloud: false,
    cbu: false,
    materials: false,
    description: false,
  });

  const handlerBlur = (ev) => {
    // const isError = form[ev.target.name].length === 0;
    const isError = validate(form, ev.target.name);

    setErrors({ ...errors, [ev.target.name]: isError });
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
  const validate = (form, name) => {
    let isError = false;
    if (form[name].length === 0) {
      isError = true;
      return isError;
    }
    if (name === 'email') {
      isError = form.email;
    }
    if (name === 'cbu') {
      isError = typeof form.cbu !== 'number' || form.cbu.length !== 22;
    }
    return isError;
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
      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="email"
          value={form.email}
        />
        {!errors.email ? (
          <FormHelperText>Ingresa tu email.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
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
      <FormLabel>CBU</FormLabel>
      <Input
        name="cbu"
        onChange={handlerChange}
        type="number"
        value={form.cbu}
      />
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
