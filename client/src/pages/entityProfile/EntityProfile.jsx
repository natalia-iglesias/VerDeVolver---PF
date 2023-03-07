import { useState, useEffect } from 'react';
import axios from 'axios';
import { updateVdV, deleteVdV, addMaterial, deleteMaterial } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
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
  Flex,
  Image,
  useToast,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { BiUser, BiUserX } from 'react-icons/bi';
import UploadImage from '../../Components/Cloudinary';
import {
  getEntityDonation,
  getEntityFeedbacks,
} from '../../redux/actions/entitiesActions';
import RankingStars from '../../Components/RankingStars';

const materialsArray = [
  'Plástico',
  'Vidrio',
  'Metal',
  'Vidrio',
  'Tapitas',
  'Cartón',
  'Aceite',
  'Aluminio',
  'Madera',
  'Textiles',
  'Baterias',
  'Papel',
];

function EntityProfile() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(5);

  const { acount } = useSelector((state) => state.acountReducer);
  const { id } = useParams();
  const { donations, feedbacks } = useSelector(
    (state) => state.entitiesReducer
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showCBU, setShowCBU] = useState(false);
  const [input, setInput] = useState({});
  const [CBU, setCBU] = useState(acount.cbu);
  const [errorCBU, setErrorCBU] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      setInput({
        ...res.data,
      });
      // );
    });
    dispatch(getEntityDonation(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);

  const handleCBU = (e) => {
    const { value } = e.target;
    value.length < 23 && setCBU(value);
    value.length < 22 ? setErrorCBU('Faltan caracteres') : setErrorCBU('');
  };

  const handleButtonCBU = (e) => {
    const res = axios
      .post('http://localhost:3001/cbuRequest', { cbu: CBU, idVdV: id })
      .then(
        toast({
          title: 'Success',
          description: 'Solicitud enviada. Recibirás un email de confirmación.',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      )
      .catch(
        toast({
          title: 'Error',
          description:
            'El CBU ya se encuentra asociado a un punto de reciclaje',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      );
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (url) => {
    setInput({ ...input, img: url });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowCBU = () => setShowCBU(!showCBU);

  const handleSaveChanges = () => {
    updateVdV(id, input);
  };

  const handleCancelChanges = () => {
    setInput(acount);
    setCBU(acount.cbu);
  };

  const handleDeleteEntity = () => {
    deleteVdV(id, navigate);
  };

  const handlePlaceSelected = (e) => {
    const latitude = e.geometry.location.lat();
    const longitude = e.geometry.location.lng();
    setMapCenter({
      lat: latitude,
      lng: longitude,
    });
    setZoom(13);
    setActiveMarker(e);
    setInput((prevForm) => {
      return {
        ...prevForm,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      };
    });
  };

  return (
    <Grid templateColumns={'repeat(2, 1fr)'} gap="2rem">
      <GridItem ml="2rem" mr="3rem" mt="1rem" minWidth={'40rem'}>
        <Heading ml={'3rem'} mb={'1rem'} w={'400px'}>
          Información del Punto de Reciclaje
        </Heading>
        <Box display={'flex'} justifyContent={'beetwen'} alignItems={'center'}>
          <Text ml={'3rem'} mb={'1rem'} w={'400px'} fontSize={'30px'}>
            {input.name}
          </Text>
          <Image
            src={input.img}
            borderRadius="full"
            boxSize="300px"
            mb="5vh"
            border={'green solid 4px'}
          />
        </Box>
        <Box my="1rem">
          <Text>Nombre</Text>
          <InputGroup>
            <InputLeftElement children={<BiUser />} />
            <Input
              name="name"
              type="text"
              value={input.name}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Mail</Text>
          <InputGroup>
            <InputLeftElement children={<AtSignIcon />} />
            <Input
              name="mail"
              type="email"
              value={input.mail}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box>
          <Text>Direccion</Text>
          <InputGroup>
            <InputLeftElement children={<TriangleDownIcon />} />
            <Input
              name="address"
              type="text"
              value={input.address}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Contraseña</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                name="password"
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShowPassword}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <UploadImage onUpload={handleUploadImage} value={input.img} />
        <Box my="1rem" mb={'3rem'}>
          <Text>Solicitar el cambio del CBU</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              name="cbu"
              type={showCBU ? 'text' : 'password'}
              value={CBU}
              onChange={handleCBU}
            />
            <InputRightElement>
              <IconButton
                name="cbu"
                icon={showCBU ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShowCBU}
              />
            </InputRightElement>
          </InputGroup>
          {errorCBU ? (
            <Text color={'red'} fontFamily="unset">
              {errorCBU}{' '}
            </Text>
          ) : (
            <Button
              // variant={'outline'}
              colorScheme={'green'}
              mt="0.3rem"
              display={'flex'}
              onClick={handleButtonCBU}
            >
              Enviar
            </Button>
          )}
        </Box>

        <GridItem mb={'2rem'}>
          <Box my="1rem">
            <Text>Materiales</Text>
            {input.Materials?.map((mat, i) => {
              return (
                <Button
                  key={i}
                  mb={'1rem'}
                  ml={'0.2rem'}
                  onClick={() =>
                    deleteMaterial(mat.name, input.Materials, setInput)
                  }
                >
                  {mat.name}
                </Button>
              );
            })}
            <Select
              placeholder="Agregar material"
              w="13vw"
              onChange={
                (e) => addMaterial(e, input.Materials, setInput) //
              }
            >
              {materialsArray.map((mat, i) => {
                return (
                  <option key={i} value={mat}>
                    {mat}
                  </option>
                );
              })}
            </Select>
          </Box>
        </GridItem>

        <GridItem>
          <ButtonGroup
            mb={'7rem'}
            // variant={'outline'}
            w="full"
            justifyContent={'center'}
            mt="1rem"
          >
            <Button colorScheme={'green'} w="30%" onClick={handleSaveChanges}>
              Guardar
            </Button>
            <Button colorScheme={'blue'} w="30%" onClick={handleCancelChanges}>
              Cancelar
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme={'red'} w="40%" leftIcon={<BiUserX />}>
                  Eliminar Punto de reciclaje
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="bold" pr={'2rem'}>
                  Estas seguro de que deseas eliminar tu perfl de forma
                  definitiva?
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  ⚠️ Una vez que elimines tu Perfil todos tus datos seran
                  eliminados de nuestra base de datos sin posibildad de ser
                  recuperados
                </PopoverBody>
                <Button colorScheme={'red'} onClick={handleDeleteEntity}>
                  Confirmar
                </Button>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </GridItem>
      </GridItem>

      <GridItem>
        <GridItem>
          <Box>
            <Text mt={'2rem'} mb={'1rem'} ml={'10rem'} fontSize={'2rem'}>
              Cambie su direccion
            </Text>

            <Box align="center" w={'50%'} ml={'10rem'}>
              <Autocomplete
                onPlaceSelected={(e) => handlePlaceSelected(e)}
                style={autocompleteStyle}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'ar' },
                }}
              />
            </Box>

            <Box align={'center'}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
              >
                {activeMarker && (
                  <Marker
                    position={{
                      lat: activeMarker.geometry.location.lat(),
                      lng: activeMarker.geometry.location.lng(),
                    }}
                  />
                )}
              </GoogleMap>
            </Box>
          </Box>
        </GridItem>

        <GridItem mt="8rem" mb="2rem" w={'70%'} align={'center'} ml={'10rem'}>
          <Stack mt="1rem" spacing={'1rem'}>
            <Heading mt="1rem">Donaciones</Heading>

            <VStack
              mb={'2rem'}
              alignItems="flex-start"
              maxH="25vh"
              overflowY={'scroll'}
            >
              {donations.length !== 0 ? (
                donations.map(({ amount, date, User }, index) => (
                  <Box
                    key={index}
                    w={'95%'}
                    h={'3rem'}
                    border={'solid 2px #233142'}
                    borderRadius={'10px'}
                  >
                    <HStack spacing="1rem" mt={'6px'}>
                      <Avatar
                        alignItems={'center'}
                        ml="1rem"
                        src={User.image}
                        size="sm"
                      />

                      <Flex width="95%" justifyContent="space-around">
                        <Text>{User.name}</Text>
                        <Text>${amount}</Text>
                        <Text>{date}</Text>
                      </Flex>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Box display="flex" h="20vh" alignItems="center">
                  <Text fontSize="lg" as="b" ml="1rem">
                    {' '}
                    No se encontraron donaciones realizadas a este Punto de
                    reciclaje{' '}
                  </Text>
                </Box>
              )}
            </VStack>

            <Heading>Reseñas</Heading>

            <VStack alignItems="flex-start" maxH="25vh" overflowY={'scroll'}>
              {feedbacks.length !== 0 ? (
                feedbacks.map(({ comment, rating, date, User }, index) => (
                  <Box
                    key={index}
                    w={'95%'}
                    // h={'5rem'}
                    border={'solid 2px #233142'}
                    borderRadius={'10px'}
                  >
                    <HStack spacing="1rem" mt={'10px'}>
                      <Avatar ml="1rem" src={User.image} size="sm" />
                      <Flex direction={'column'} w="90%">
                        <Flex
                          justifyContent="space-around"
                          // border="solid 2px green"
                        >
                          <Text>{User.name}</Text>
                          <RankingStars stars={rating}></RankingStars>
                          <Text>{date}</Text>
                        </Flex>
                        <Divider></Divider>
                        <Text mt="0.3rem" pb={'1rem'} mr="1rem">
                          {comment}
                        </Text>
                      </Flex>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Box display="flex" h="20vh" alignItems="center">
                  <Text fontSize="lg" as="b" ml="1rem">
                    {' '}
                    No se encontraron reseñas realizadas a este Punto de
                    reciclaje{' '}
                  </Text>
                </Box>
              )}
            </VStack>
          </Stack>
          <Box height={'8rem'}></Box>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default EntityProfile;

const autocompleteStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
};

const containerStyle = {
  marginLeft: '1rem',
  borderRadius: '10px',
  marginTop: '1rem',
  maxWidth: '40vw',
  height: '50vh',
  // position: 'absolute',
  // right: '0vw',
  // top: '50vh',
};
