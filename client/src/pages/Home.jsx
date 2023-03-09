import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputGroup,
  Select,
  Stack,
  Box,
  InputLeftElement,
  HStack,
  Flex,
  Grid,
  useToast,
  Text,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import PostsCarousel from '../Components/PostsCarousel';
import axios from 'axios';

const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { entities } = useSelector((state) => state.entitiesReducer);
  const { acount } = useSelector((state) => state.acountReducer);
  const [donation, setDonation] = useState({ amount: '', entity: '' });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleDonate = () => {
    const { id } = acount;
    const { amount, entity } = donation;

    if (!id) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder donar',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      throw error('Debes iniciar sesión para poder donar');
    }

    if (amount && entity) {
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: entity,
            amount: amount,
            UserId: id,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes seleccionar una entidad e ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };
  const { colorMode } = useColorMode();

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Box
      align="center"
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
      padding="6rem"
    >
      <Flex justifyContent="center">
        <Box
          align="center"
          // mb="0.8rem"
          p="0.7rem"
          bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
          w="90%"
          h="65rem"
          borderRadius="1rem"
          boxShadow="dark-lg"
        >
          <Box ml="1rem" width="45%" float="left" mt={'5rem'} h="100%">
            <Image
              src="https://res.cloudinary.com/verdevolver/image/upload/v1678234115/My_project-1_1_dmqtx2.png"
              w="8rem"
              style={{ transform: 'scale(2.1)' }}
            />

            <Text
              top="0"
              as="em"
              h="100%"
              textShadow={'1px 1px black'}
              fontSize={'7xl'}
              // fontWeight={'bold'}
              fontWeight={'bold harine'}
              color="green"
              mt="10rem"

              // textColor={colorMode === 'light' ? 'green' : '#68D391'}
            >
              VerdeVolver
            </Text>
            <Text
              fontSize={'3xl'}
              fontWeight={'hairline bold'}
              p="10%"
              textAlign={'justify'}
              boxShadow="dark-lg"
              borderRadius={'3rem'}
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }}
              mt="5rem"
            >
              {' '}
              ¡Bienvenido/a a nuestro sitio web! Nuestra aplicación está
              diseñada para el territorio argentino y te ayudará a encontrar
              soluciones prácticas para la gestión de residuos. Podrás encontrar
              información sobre los distintos lugares dedicados al reciclaje en
              toda Argentina, incluyendo los más cercanos a tu ubicación actual.
              ¡Gracias por cuidar el planeta junto a nosotros!
            </Text>
          </Box>
          <Box
            width="45%"
            float="right"
            mt={'3rem'}
            h="100%"
            // border={'solid 2px red'}
          >
            <Stack
              mt="2rem"
              p={'8'}
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              borderRadius="2rem"
              mr="1rem"
              mb="3rem"
            >
              <HStack flexDir={'column'} gap="4">
                <Text
                  fontSize={'4xl'}
                  fontWeight={'bold harine'}
                  // fontFamily={'Tilt Prism'}
                  textColor={colorMode === 'light' ? 'green' : '#68D391'}
                >
                  Colaborá con tu punto favorito!
                </Text>
                <Flex
                  // gap={'40%'}
                  mr="5rem"
                  direction={'column'}
                  align="center"
                  // border={'2px solid red'}
                  w="35rem"
                  // justifyContent={'center'}
                >
                  {/* <InputGroup
                    justifyContent={'center'}
                    // pl="30%"
                    // pr="30%"
                  > */}
                  <Select
                    shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                    placeholder="Puntos de reciclaje"
                    onChange={handleInputs}
                    name="entity"
                    // borderWidth="0.2rem"
                    w={'35%'}
                    // mr="10rem"

                    // borderColor="gray.300"
                  >
                    {entities?.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                  <InputGroup justifyContent="center" mt={'1rem'}>
                    <InputLeftElement
                      ml={'40%'}
                      children={<MdOutlineAttachMoney />}
                    />
                    <Input
                      shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                      textAlign={'center'}
                      // borderWidth="0.2rem"
                      // borderColor="gray.300"
                      name="amount"
                      placeholder="Monto"
                      type="number"
                      onChange={handleInputs}
                      w="10rem"
                    />
                  </InputGroup>
                  {/* </InputGroup> */}
                </Flex>
              </HStack>
              <Grid placeItems="center">
                <Button
                  //bg={colorMode === 'light' ? '#2c835b' : '#212933'}
                  color="vdv.main"
                  colorScheme="green"
                  width="30%"
                  onClick={handleDonate}
                  mt="0.3rem"
                  shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                  _hover={{
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  Donar
                </Button>
              </Grid>
            </Stack>

            <PostsCarousel />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
