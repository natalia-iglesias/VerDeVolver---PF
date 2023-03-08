import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  Textarea,
  VStack,
  useToast,
  useColorMode,
  DarkMode,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import {
  getEntityById,
  getEntityFeedbacks,
} from '../redux/actions/entitiesActions';
import CreateRating from '../Components/CreateRating';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    dispatch(getEntityById(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);

  const { entity, feedbacks } = useSelector((state) => state.entitiesReducer);
  const { acount } = useSelector((state) => state.acountReducer);

  if (!entity || !feedbacks) return <PropagateLoader color="#1c5738" />;

  const navigate = useNavigate();
  const [inputMonto, setInputMonto] = useState('');
  const [inputReview, setInputReview] = useState('');
  const [stars, setStars] = useState(0);

  const handleInputs = (event) => {
    event.target.name === 'Monto'
      ? setInputMonto(event.target.value)
      : setInputReview(event.target.value);
  };

  const handleDonate = () => {
    const userId = acount.id;
    if (!userId) {
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
    if (inputMonto) {
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: id,
            amount: inputMonto,
            UserId: userId,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleComment = async (event) => {
    const userId = acount.id;
    if (!userId) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder dejar tu reseña',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (!inputReview) {
      toast({
        title: 'Error',
        description: 'Debes elegir una puntuación y escribir un comentario',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (inputReview && userId) {
      try {
        await axios.post('http://localhost:3001/feedback/create', {
          comment: inputReview,
          rating: stars,
          UserId: userId,
          VdVId: id,
        });
        location.reload();
        toast({
          title: 'Éxito',
          description: 'Creación de reseña exitosa',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      } catch (error) {
        throw Error(error.message);
      }
    }
  };

  return (
    <Box bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}>
      <Box mr="10%" ml="10%" pt={'5%'} paddingBottom="5rem">
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          minH="92vh"
          // marginBottom="11vh"
          backgroundColor={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        >
          <Box
            width="100%"
            height="20vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="6vh"
            marginBottom="4vh"
          >
            <Box
              backgroundColor="#b4c4ac"
              width="55%"
              height="85%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="1vh"
              transition="2s"
              _hover={{ height: '87%', width: '87%' }}
            >
              <Box
                height="28vh"
                width="28vh"
                borderRadius="50%"
                backgroundColor="#b4c4ac"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="dark-lg"
                transition="2s"
                _hover={{ height: '30vh', width: '30vh' }}
              >
                <Image
                  src={entity.img}
                  height="26vh"
                  width="26vh"
                  borderRadius="50%"
                  transition="2s"
                  _hover={{ height: '28vh', width: '28vh' }}
                />
                {console.log(entity.img)}
              </Box>
            </Box>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
            <GridItem>
              <Box margin="5vh">
                <Heading>{entity.name}</Heading>
                <HStack my="1rem">
                  {entity.Materials?.map(({ name }, i) => (
                    <Badge key={i} variant="solid" colorScheme="green">
                      {name}
                    </Badge>
                  ))}
                </HStack>
                <Text fontSize={'lg'} lineHeight="8">
                  {entity.description}
                </Text>
                <Stack mt="1rem" spacing={'1rem'}>
                  <Heading fontSize={'lg'}>Reseñas</Heading>
                  <Divider />
                  <VStack
                    alignItems="flex-start"
                    overflowY={'scroll'}
                    maxH="25vh"
                    paddingBottom="2vh"
                    divider={<StackDivider />}
                  >
                    {feedbacks?.map(({ User, comment, rating }) => (
                      <Box key={User + comment}>
                        <HStack spacing="1rem">
                          {User.image == null ? (
                            <Avatar name={User.name} size="sm" />
                          ) : (
                            <Avatar src={User.image} size="sm" />
                          )}
                          <Text>{User.name}</Text>
                          <RankingStars stars={rating} />
                        </HStack>
                        <Text>{comment}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Stack>
              </Box>
            </GridItem>
            <GridItem>
              <Box margin="5vh">
                <Heading marginBottom="2vh">Deja tu Reseña</Heading>
                <Box>
                  <CreateRating stars={stars} setStars={setStars} />
                </Box>
                <VStack
                  marginBottom="3vh"
                  display="flex"
                  alignItems="flex-start"
                >
                  <Textarea
                    name="Review"
                    placeholder="Deja tu reseña"
                    type={'text'}
                    onChange={handleInputs}
                    borderRadius="1rem"
                    borderColor="black"
                  />
                  <Button
                    onClick={handleComment}
                    w="30%"
                    colorScheme="green"
                    transition="1s"
                  >
                    Comentar
                  </Button>
                </VStack>
                <VStack ml="1rem" display="flex" alignItems="flex-start">
                  <InputGroup>
                    <InputLeftElement children={<MdOutlineAttachMoney />} />
                    <Input
                      name="Monto"
                      placeholder="Monto"
                      type={'number'}
                      onChange={handleInputs}
                      borderRadius="1rem"
                      borderColor="black"
                      width="15vw"
                      color="white"
                    />
                    <Button
                      onClick={handleDonate}
                      colorScheme="green"
                      marginLeft="1vw"
                      transition="1s"
                    >
                      Donar
                    </Button>
                  </InputGroup>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EntityDetail;
