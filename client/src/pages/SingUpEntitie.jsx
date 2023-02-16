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
  const isError = form.email === '';

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      margin="3%"
      isRequired
      onSubmit={handlerSubmit}
      isInvalid={isError}
    >
      <FormLabel>Nombre</FormLabel>
      <Input name="name" onChange={handlerChange} type="text" />
      <FormLabel>Email</FormLabel>
      <Input
        name="email"
        onChange={handlerChange}
        type="email"
        value={form.email}
      />
      {!isError ? (
        <FormHelperText>Ingresa tu email.</FormHelperText>
      ) : (
        <FormErrorMessage>El email es requerido.</FormErrorMessage>
      )}
      <FormLabel>Dirección</FormLabel>
      <Input name="adress" onChange={handlerChange} type="text" />
      <FormLabel>Imagen</FormLabel>
      <Input name="image" onChange={handlerChange} type="text" />
      <FormLabel requiredIndicator>CBU</FormLabel>
      <Input name="cbu" onChange={handlerChange} type="number" />
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
      </RadioGroup>
      <FormHelperText>
        Selecciona únicamente los materiales que recibirás.
      </FormHelperText>
      <br />
      <FormLabel>Descripción</FormLabel>

      <Textarea
        onChange={handlerChange}
        name="description"
        placeholder="Ingresa una descripción..."
      />
      <Button colorScheme="green" type="submit">
        Enviar
      </Button>
    </FormControl>
  );
};

export default SingUpEntitie;
