import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Flex,
} from '@chakra-ui/react';

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre) {
      alert('Por favor ingresa tu nombre.');
    } else if (!email) {
      alert('Por favor ingresa tu correo electrónico.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
    } else if (descripcion.length < 20) {
      alert('La descripción debe tener al menos 20 caracteres.');
    } else {
      console.log(nombre, email, descripcion);
    }
  };

  return (
    <Box mr="10%" ml="10%" mt="5%">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Box fontWeight={'700'} fontSize="1.4em">
          <h1>Contáctate con nosotros!</h1>
        </Box>
        <Flex w="100%" justifyContent="space-between">
          <FormControl
            isRequired
            pb={'2%'}
            mr={'5%'}
            border={'4px'}
            borderRadius={'6px'}
            borderColor="green"
            pr={'5%'}
            pl={'5%'}
            id="nombre"
          >
            <FormLabel textAlign={'center'}>Nombre:</FormLabel>
            <Input
              _focus={{
                boxShadow: 'none',
              }}
              borderBottom={'2px'}
              border={'none'}
              textAlign={'center'}
              placeholder="Ingresá tu nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </FormControl>
          <FormControl
            isRequired
            ml={'5%'}
            border={'4px'}
            borderRadius={'6px'}
            borderColor="green"
            pr={'5%'}
            pl={'5%'}
            id="email"
          >
            <FormLabel textAlign={'center'}>Correo electrónico:</FormLabel>
            <Input
              _focus={{
                boxShadow: 'none',
              }}
              borderBottom={'2px'}
              border={'none'}
              _hover={{ color: 'brand.green' }}
              textAlign={'center'}
              placeholder="Ingresá tu email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
        </Flex>
        <FormControl
          isRequired
          pb={'2%'}
          pr={'5%'}
          pl={'5%'}
          border={'4px'}
          borderRadius={'6px'}
          borderColor="green"
          id="descripcion"
        >
          <FormLabel textAlign={'center'}>Descripción:</FormLabel>
          <Textarea
            _focus={{
              boxShadow: 'none',
            }}
            borderBottom={'1px'}
            border={'none'}
            _hover={{ color: 'brand.green' }}
            textAlign={'center'}
            placeholder="Ingresá una descripción!"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </FormControl>
        <Button colorScheme="green" size="sm" type="submit">
          Enviar
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
