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
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import {
  getEntityById,
  getEntityFeedbacks,
} from '../redux/actions/entitiesActions';
import { Logeduser } from "../../src/redux/actions/acountActions";
import CreateRating from '../Components/CreateRating';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  let userData = localStorage.getItem("LogedUser");
  useEffect(() => {
    if (userData){
      dispatch(Logeduser())
    }
    dispatch(getEntityById(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);
  
  const { entity, feedbacks } = useSelector((state) => state.entitiesReducer);

  if (!entity || !feedbacks) return <PropagateLoader color="#1c5738" />;

  const navigate = useNavigate();
  const [inputMonto, setInputMonto] = useState('');
  const [inputReview, setInputReview] = useState('');
  const [stars, setStars] = useState(1);

  const handleInputs = (event) => {
    event.target.name === 'Monto'
      ? setInputMonto(event.target.value)
      : setInputReview(event.target.value);
  };

  const handleButton = (event) => {
    let userData = JSON.parse(localStorage.getItem('LogedUser'));
    if (inputMonto) {
      if (!userData) {
        navigate('/login');
        alert('Debes iniciar sesión para donar')
        throw Error ('Debes iniciar sesión para donar')
      }
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: id,
            amount: inputMonto,
            UserId: userData.id,
          }) 
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      alert('ingrese monto');
    }
  };

  const handleButtonReview = async (event) => {
    let userData = JSON.parse(localStorage.getItem('LogedUser'));
    if (!userData) {
      navigate('/login');
      alert('Debes iniciar sesión para poder dejar tu reseña');
      throw Error ('Debes iniciar sesión para poder dejar tu reseña')
    }
    if (inputReview && userData) {
      try {
        const resultAxios = await axios.post(
          'http://localhost:3001/feedback/create',
          {
            comment: inputReview,
            rating: stars,
            UserId: userData.id,
            VdVId: id,
          }
        );
        alert('Creacion de comentario exitosa!');
      } catch (error) {
        throw Error(error.message);
      }
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
        <VStack ml="1rem">
          <Image src={entity.img} maxHeight="35%" maxWidth="50%" />
          <InputGroup>
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input
              name="Monto"
              placeholder="Monto"
              type={'number'}
              onChange={handleInputs}
            />
            <Button onClick={handleButton}>Donar</Button>
          </InputGroup>
        </VStack>
      </GridItem>
      <GridItem>
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

        <Stack mt="1rem">
          <Heading fontSize={'lg'}>Reseñas</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            overflowY={'scroll'}
            maxH="25vh"
            divider={<StackDivider />}
          >
            {feedbacks?.map(({ User, comment, rating }, i) => (
              <Box key={i}>
                <HStack>
                  <Avatar name={User.name} size="sm" />
                  <RankingStars stars={rating} />
                </HStack>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
          <br></br>
          <br></br>
        </Stack>
        <Box
          border="solid 0.2rem "
          borderRadius="1rem"
          mr="5vw"
          p="1rem"
          alignItems="center"
        >
          <Box mr="5vw" >
            <Box mb='0.5rem'>
              <CreateRating stars={stars} setStars={setStars}/>
            </Box>
            <VStack ml="1rem">
              <InputGroup align="center">
                <InputLeftElement />
                <Textarea
                  name="Review"
                  placeholder="Deja tu reseña"
                  type={'text'}
                  onChange={handleInputs}
                />
              </InputGroup>
              <Button onClick={handleButtonReview}>Comentar</Button>
            </VStack>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default EntityDetail;
