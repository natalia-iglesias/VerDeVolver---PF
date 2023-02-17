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
  //const [errors, setErrors] = useState([]);
  //const isError = errors.length !== 0;
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    address: false,
    imageCloud: false,
    cbu: false,
    materials: false,
    description: false,
  });
  // const isErrorName = form.name === '';
  // const isErrorEmail = form.email === '';
  // const isErroraddress = form.address === '';
  // const isErrorImageCloud = form.imageCloud === '';
  // const isErrorMaterials = form.materials === [];
  // const isErrorDescription = form.description === '';
  const handlerBlur = (ev) => {
    console.log('blur', ev);
    const isError =
      ev.target.name === 'materials'
        ? form[ev.target.name].length > 0
        : form[ev.target.name] === '';
    setErrors({ ...errors, [ev.target.name]: isError });
  };
  const handlerChange = (e) => {
    let keyValue;
    if (typeof e === 'string') {
      keyValue = { ['materials']: [...form.materials, e] };
    } else {
      const { name, value } = e.target;
      keyValue = { [name]: value };
      //handleErrors(name, value);
    }
    setForm({ ...form, ...keyValue });
  };
  // const handleErrors = (name, value) => {
  //   console.log(value);
  //   if (value.length === 0) {
  //     setErrors(name);
  //   }
  // };
  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl margin="3%" isRequired onSubmit={handlerSubmit}>
      <FormControl isInvalid={errors.name}>
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
      <FormControl isInvalid={errors.email}>
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
      <FormControl isInvalid={errors.address}>
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
      <FormControl isInvalid={errors.imageCloud}>
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
      <FormLabel requiredIndicator>CBU</FormLabel>
      <Input
        name="cbu"
        onChange={handlerChange}
        type="number"
        value={form.cbu}
      />
      <FormControl isInvalid={errors.materials}>
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
      <FormControl isInvalid={errors.description}>
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
