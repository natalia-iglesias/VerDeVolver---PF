import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validate from './utils';
import { createNewContact } from '../../redux/actions/usersActions';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Flex,
  FormHelperText,
  FormErrorMessage,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { LogedUser } from '../../redux/actions/acountActions';

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    name: '',
    mail: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: { isError: false, errorMsg: '' },
    mail: { isError: false, errorMsg: '' },
    description: { isError: false, errorMsg: '' },
  });

  const [msg, setMsg] = useState('');
  const [descMsg, setdescMsg] = useState('');
  const { colorMode } = useColorMode();

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });

    if (name === 'description') {
      setdescMsg(value.length);
    }
    setForm({ ...form, [name]: value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    let errorsObj = {};
    Object.keys(form).forEach((name) => {
      const errOjb = { [name]: validate(form, name) };
      errorsObj = { ...errorsObj, ...errOjb };
    });
    setErrors({ ...errors, ...errorsObj });
    const isError = Object.keys(errors).find(
      (error) => errorsObj[error].isError
    );
    if (isError) {
      return toast({
        title: 'Error',
        description: 'Por favor chequea que no haya ningun campo sin llenar',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    dispatch(createNewContact(form));
    navigate('/home');
    toast({
      title: 'Email Enviado Exitosamente',
      description: 'Muchas gracias! Nos pondremos en contacto vía email.',
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <Box bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}>
      <Box mr="10%" ml="10%" pt={'5%'}>
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          h="65vh"
          bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        >
          <VStack as="form" spacing={4}>
            <Box fontWeight={'700'} fontSize="1.8em">
              <h1>Contáctate con nosotros!</h1>
            </Box>
            <Flex w="100%" justifyContent="space-between" pr="5%" pl="5%">
              <FormControl
                isRequired
                isInvalid={errors.name.isError}
                pb={'2%'}
                mr={'5%'}
                bg={colorMode === 'light' ? '#F5F2EB' : '#333C49'}
                borderRadius="1rem"
                borderColor="#F5F2EB"
                pr={'5%'}
                pl={'5%'}
                boxShadow="2xl"
                p="6"
              >
                <FormLabel textAlign={'center'}>Nombre</FormLabel>
                <Input
                  _focus={{
                    boxShadow: 'none',
                  }}
                  borderBottom={'2px'}
                  border={'none'}
                  textAlign={'center'}
                  name="name"
                  onChange={handlerChange}
                  onBlur={handlerBlur}
                  type="text"
                  value={form.name}
                />
                {!errors.name.isError && form.name.length === 0 ? (
                  <FormHelperText textAlign={'center'}>
                    Ingresá tu nombre
                  </FormHelperText>
                ) : (
                  <FormErrorMessage textAlign={'center'}>
                    {errors.name.errorMsg}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isRequired
                isInvalid={errors.mail.isError}
                ml={'5%'}
                borderRadius="1rem"
                borderColor="#F5F2EB"
                bg={colorMode === 'light' ? '#F5F2EB' : '#333C49'}
                pr={'5%'}
                pl={'5%'}
                p="6"
                boxShadow="2xl"
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
                  name="mail"
                  onChange={handlerChange}
                  onBlur={handlerBlur}
                  type="email"
                  value={form.mail}
                />
                {!errors.mail.isError && form.mail.length === 0 ? (
                  <FormHelperText textAlign={'center'}>
                    Ingresá tu email
                  </FormHelperText>
                ) : (
                  <FormErrorMessage textAlign={'center'}>
                    {errors.mail.errorMsg}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <Flex w="100%" pr="5%" pl="5%" pt="2%" pb="2%">
              <FormControl
                isRequired
                isInvalid={errors.description.isError}
                pb={'2%'}
                pr={'5%'}
                pl={'5%'}
                borderRadius="1rem"
                borderColor="#F5F2EB"
                bg={colorMode === 'light' ? '#F5F2EB' : '#333C49'}
                id="descripcion"
                p="6"
                boxShadow="2xl"
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
                  onChange={handlerChange}
                  onBlur={handlerBlur}
                  name="description"
                  value={form.description}
                />
                {form.description.length !== 0 &&
                !errors.description.isError ? (
                  <FormHelperText textAlign={'center'}>
                    Por favor ingresa como mínimo 20 caracteres, vas {descMsg}
                  </FormHelperText>
                ) : (
                  ''
                )}
                {!errors.description.isError &&
                form.description.length === 0 ? (
                  <FormHelperText textAlign={'center'}>
                    Dejanos tu consulta!
                  </FormHelperText>
                ) : (
                  <FormErrorMessage textAlign={'center'}>
                    {errors.description.errorMsg}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <Button
              colorScheme="green"
              size="lg"
              type="submit"
              onClick={handlerSubmit}
            >
              Enviar
            </Button>
          </VStack>
        </Box>
        <Box height={'22rem'}></Box>
      </Box>
    </Box>
  );
};

export default Contact;
