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
          mb="0.8rem"
          p="0.7rem"
          bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
          w="90%"
          h="65rem"
          borderRadius="1rem"
          boxShadow="dark-lg"
          _hover={{
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Box width="45%" float="left">
            <Text
              top="0"
              as="em"
              textShadow={'1px 1px black'}
              fontSize={'7xl'}
              fontWeight={'bold'}
              fontFamily={'Tilt Prism'}
              textColor={colorMode === 'light' ? 'green' : '#68D391'}
            >
              VerdeVolver
            </Text>
            <Text
              fontSize={'3xl'}
              fontWeight={'bold'}
              p="10%"
              textAlign={'justify'}
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
          <Box width="45%" float="right">
            <Stack p={'8'}>
              <HStack flexDir={'column'} gap="4">
                <Text
                  fontSize={'3xl'}
                  fontWeight={'bold'}
                  fontFamily={'Tilt Prism'}
                  textColor={colorMode === 'light' ? 'green' : '#68D391'}
                >
                  Colaborá con tu punto favorito!
                </Text>
                <Select
                  placeholder="Puntos de reciclaje"
                  onChange={handleInputs}
                  name="entity"
                  borderWidth="0.2rem"
                  borderColor="gray.300"
                >
                  {entities?.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </Select>
                <InputGroup justifyContent={'center'} pl="30%" pr="30%">
                  <InputLeftElement
                    ml={'30%'}
                    children={<MdOutlineAttachMoney />}
                  />
                  <Input
                    textAlign={'center'}
                    borderWidth="0.2rem"
                    borderColor="gray.300"
                    name="amount"
                    placeholder="Monto"
                    type="number"
                    onChange={handleInputs}
                  />
                </InputGroup>
              </HStack>
              <Grid placeItems="center">
                <Button
                  //bg={colorMode === 'light' ? '#2c835b' : '#212933'}
                  color="vdv.main"
                  colorScheme="green"
                  width="30%"
                  onClick={handleDonate}
                  mt="0.3rem"
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
