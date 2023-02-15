import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  // FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';

const LogIn = () => {
  return (
    <FormControl>
      <FormLabel>Nombre</FormLabel>
      <Input type="name" />
      <FormLabel>Email</FormLabel>
      <Input type="email" />
      <FormLabel>Dirección</FormLabel>
      <Input type="adress" />
      <FormLabel>Imagen</FormLabel>
      <Input type="image" />
      <FormLabel>CBU</FormLabel>
      <Input type="cbu" />
      <FormHelperText>
        Completa este campo si estás de acuerdo en recibir donaciones.
      </FormHelperText>
      <FormLabel>Alias</FormLabel>
      <Input type="alias" />
      <FormHelperText>
        Completa este campo si estás de acuerdo en recibir donaciones.
      </FormHelperText>
      <FormLabel as="legend">Materiales Reciclables</FormLabel>
      <RadioGroup defaultValue="Itachi">
        <HStack spacing="24px">
          <Radio value="Sasuke">Sasuke</Radio>
          <Radio value="Nagato">Nagato</Radio>
          <Radio value="Itachi">Itachi</Radio>
          <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
        </HStack>
      </RadioGroup>
      <FormHelperText>
        Selecciona únicamente los materiales que puedes recibir.
      </FormHelperText>
    </FormControl>
  );
};

export default LogIn;
