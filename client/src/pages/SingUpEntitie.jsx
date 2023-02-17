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
    adress: '',
    imageCloud: '',
    cbu: '',
    materials: [],
    description: '',
  });
  //const [errors, setErrors] = useState([]);
  //const isError = errors.length !== 0;
  const isErrorName = form.name === '';
  const isErrorEmail = form.email === '';
  const isErrorAdress = form.adress === '';
  const isErrorImageCloud = form.imageCloud === '';
  const isErrorMaterials = form.materials === [];
  const isErrorDescription = form.description === '';

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
      <FormControl isInvalid={{ isErrorName }}>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="name"
          onChange={handlerChange}
          type="text"
          value={form.name}
        />
        {!isErrorName ? (
          <FormHelperText>Ingresa el nombre.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={{ isErrorEmail }}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          onChange={handlerChange}
          type="email"
          value={form.email}
        />
        {!isErrorEmail ? (
          <FormHelperText>Ingresa tu email.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={{ isErrorAdress }}>
        <FormLabel>Dirección</FormLabel>
        <Input
          name="adress"
          onChange={handlerChange}
          type="text"
          value={form.adress}
        />
        {!isErrorAdress ? (
          <FormHelperText>Indica la dirección.</FormHelperText>
        ) : (
          <FormErrorMessage>Requerido.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={{ isErrorImageCloud }}>
        <FormLabel>Imagen</FormLabel>
        <Input
          name="image"
          onChange={handlerChange}
          type="text"
          value={form.imageCloud}
        />
        {!isErrorImageCloud ? (
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
      <FormControl isInvalid={{ isErrorMaterials }}>
        <FormLabel>Materiales Reciclables</FormLabel>
        <RadioGroup name="materials" onChange={handlerChange}>
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
          {!isErrorMaterials ? (
            <FormHelperText>
              Selecciona únicamente los materiales que recibirás.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Requerido.</FormErrorMessage>
          )}
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl isInvalid={{ isErrorDescription }}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          onChange={handlerChange}
          name="description"
          placeholder="Ingresa una descripción..."
          value={form.description}
        />
        {!isErrorDescription ? (
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
