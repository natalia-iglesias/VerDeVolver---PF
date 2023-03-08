import { useState, useEffect } from 'react';
//import OverflowScroll from '../../Components/OverFlowScroll/OverflowScroll.jsx';
import { deleteUser, updateUser, updateUserPassword } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Avatar,
  Stack,
  HStack,
  VStack,
  Divider,
  StackDivider,
  Flex,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BiUser, BiUserX } from 'react-icons/bi';
import UploadImage from '../../Components/Cloudinary';
import {
  getUserDonations,
  getUserFeedbacks,
} from '../../redux/actions/usersActions';
import { authAcountLocal } from '../../redux/actions/acountActions';
import RankingStars from '../../Components/RankingStars';

function UserProfile() {
  const dispatch = useDispatch();

  const { acount } = useSelector((state) => state.acountReducer);
  const { donations, feedbacks } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const userId = acount.id;
  useEffect(() => {
    dispatch(getUserDonations(userId));
    dispatch(getUserFeedbacks(userId));
  }, [userId]);

  const [input, setInput] = useState({
    name: acount?.name,
    last_name: acount?.last_name,
    mail: acount?.mail,
    image: acount?.image,
  });
  /*   const [show, setShow] = useState(false); */

  const [inputPassword, setInputPassword] = useState({
    password: '',
  });

  const handleChangePassword = (e) => {
    setInputPassword({ [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /* const handleShow = (e) => setShow(!show); */

  const handleSaveChanges = () => {
    const setUpdateuser = async () => {
      const message = await updateUser(acount?.id, input);

      if (message == acount.id) {
        toast({
          title: 'Datos actualizados correctamente',
          description: 'Los cambios han sido guardados satisfactoriamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return dispatch(authAcountLocal(acount));
      } else {
        return toast({
          title: 'Error',
          description:
            'Ha ocurrido algun error en alguno de los datos que se intentan actualizar',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      }
    };
    setUpdateuser();
  };

  const handleSaveChangePassword = async () => {
    await updateUserPassword(acount?.id, inputPassword);
  };

  const handleCancelChanges = () => {
    setInput({
      name: acount?.name,
      last_name: acount?.last_name,
      mail: acount?.mail,
      image: acount?.image,
    });
  };

  const handleDeleteUser = () => {
    deleteUser(acount?.id, navigate, dispatch);
    return toast({
      title: 'Usuario Eliminado',
      description: 'El usuario ha sido eliminado satisfactoriamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUploadImage = (url) => {
    setInput({ ...input, image: url });
  };

  if (!Object.entries(acount).length) return navigate('/login');

  return (
    <Box bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}>
      <Box mr="25%" ml="25%" pt={'5%'} paddingBottom="5rem" paddingTop="15vh">
        <Box
          borderRadius="3rem"
          boxShadow="dark-lg"
          p="6"
          minH="92vh"
          backgroundColor={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        >
          <Flex
            width="100%"
            minH="31vh"
            justifyContent="center"
            alignItems="center"
            marginTop="-13vh"
            marginBottom="10vh"
            flexDirection="column"
          >
            <Box
              bg="#F5F2EB"
              borderRadius="full"
              height="22vh"
              width="22vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="dark-lg"
              mb="2vh"
              //pt="5vh"
            >
              <Image
                src={input.image}
                name={`${input.name}${input.last_name}`}
                borderRadius="full"
                height="20vh"
                width="20vh"
              />
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading fontSize={'3rem'}>
                {input.name} {input.last_name}
              </Heading>
            </Box>
          </Flex>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              flexDirection="column"
              width="80%"
              boxShadow="2xl"
              padding="2rem"
              borderRadius="2rem"
            >
              <Heading mb={'1rem'}>Información del usuario</Heading>

              <Box my="1rem">
                <Text>Nombre</Text>
                <InputGroup>
                  <InputLeftElement children={<BiUser />} />
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>
              <Box my="1rem">
                <Text>Apellido</Text>
                <InputGroup>
                  <InputLeftElement children={<BiUser />} />
                  <Input
                    type="text"
                    name="last_name"
                    value={input.last_name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>
              <Box my="1rem">
                <Text>Mail</Text>
                <InputGroup>
                  <InputLeftElement children={<AtSignIcon />} />
                  <Input
                    type="email"
                    name="mail"
                    value={input.mail}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>
              <Box my="1rem">
                <Text>Cambiar contraseña</Text>
                <InputGroup>
                  <InputLeftElement children={<LockIcon />} />
                  <Input
                    type="text"
                    name="password"
                    value={inputPassword.password}
                    onChange={handleChangePassword}
                  />
                  <Button
                    colorScheme={'green'}
                    w="40%"
                    onClick={handleSaveChangePassword}
                  >
                    Actualizar
                  </Button>
                </InputGroup>
              </Box>
              <UploadImage onUpload={handleUploadImage} value={input.image} />

              <ButtonGroup
                // variant={'outline'}
                w="full"
                justifyContent={'center'}
                mt="1rem"
              >
                <Button
                  colorScheme={'green'}
                  w="40%"
                  onClick={handleSaveChanges}
                >
                  Guardar
                </Button>
                <Button
                  colorScheme={'blue'}
                  w="40%"
                  onClick={handleCancelChanges}
                >
                  Cancelar
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme={'red'} w="40%" leftIcon={<BiUserX />}>
                      Eliminar usuario
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight="bold" pr={'2rem'}>
                      Estas seguro de que deseas eliminar tu usuario de forma
                      definitiva?
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      ⚠️ Una vez que elimines tu usuario todos tus datos seran
                      eliminados de nuestra base de datos sin posibildad de ser
                      recuperados
                    </PopoverBody>
                    <Button colorScheme={'red'} onClick={handleDeleteUser}>
                      Confirmar
                    </Button>
                  </PopoverContent>
                </Popover>
              </ButtonGroup>
            </Flex>

            <Flex
              width="80%"
              mt="2rem"
              boxShadow="2xl"
              padding="2rem"
              borderRadius="2rem"
            >
              <Stack mt="1rem" spacing={'1rem'} width="100%">
                <Heading mt="1rem">Donaciones</Heading>
                <Divider />
                <VStack
                  alignItems="flex-start"
                  maxH="25vh"
                  overflowY={'scroll'}
                  divider={<StackDivider />}
                >
                  {donations.length !== 0 ? (
                    donations.map(({ amount, date, VdV }) => (
                      <Box>
                        <HStack spacing="1rem">
                          <Avatar src={VdV.img} name={VdV.name} size="sm" />
                          <Flex justifyContent="start" width="24vw">
                            <Text>{VdV.name}</Text>
                          </Flex>
                          <Flex justifyContent="start" width="10vw" ml="2rem">
                            <Text>{amount}</Text>
                          </Flex>
                          <Flex justifyContent="flex-start" width="9vw">
                            <Text>{date}</Text>
                          </Flex>
                        </HStack>
                      </Box>
                    ))
                  ) : (
                    <Box display="flex" h="20vh" alignItems="center">
                      <Text fontSize="lg" as="b" ml="1rem">
                        {' '}
                        No se encontraron donaciones pertenecientes a este
                        usuario{' '}
                      </Text>
                    </Box>
                  )}
                </VStack>

                <Heading>Reseñas</Heading>
                <Divider></Divider>
                <VStack
                  alignItems="flex-start"
                  maxH="25vh"
                  overflowY={'scroll'}
                  divider={<StackDivider />}
                >
                  {feedbacks.length !== 0 ? (
                    feedbacks.map(({ comment, rating, date, VdV }) => (
                      <Box>
                        <HStack spacing="1rem">
                          <Avatar src={VdV.img} name={VdV.name} size="sm" />
                          <RankingStars stars={rating}></RankingStars>
                          <Flex justifyContent="start" width="22vw">
                            <Text>{comment}</Text>
                          </Flex>
                          <Flex justifyContent="flex-end" width="9vw">
                            <Text>{date}</Text>
                          </Flex>
                        </HStack>
                        <Text>{VdV.name}</Text>
                      </Box>
                    ))
                  ) : (
                    <Box display="flex" h="20vh" alignItems="center">
                      <Text fontSize="lg" as="b" ml="1rem">
                        {' '}
                        No se encontraron reseñas pertenecientes a este usuario{' '}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </Stack>
              <Box height={'20rem'}></Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
