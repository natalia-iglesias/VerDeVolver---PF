import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewContact } from '../redux/actions/usersActions';
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
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert('Por favor ingresa tu nombre.');
    } else if (!mail) {
      alert('Por favor ingresa tu correo electrónico.');
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      alert('Por favor ingresa un correo electrónico válido.');
    } else if (description.length < 20) {
      alert('La descripción debe tener al menos 20 caracteres.');
    } else {
      console.log(name, mail, description);
    }
    const body = { name, mail, description };
    dispatch(createNewContact(body));
    navigate('/home');
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={mail}
              onChange={(event) => setMail(event.target.value)}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
