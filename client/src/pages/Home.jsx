import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEntities } from '../redux/actions/entitiesActions';
import {
  Button,
  Input,
  InputGroup,
  Select,
  Stack,
  Box,
  InputLeftElement,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import PostsCarousel from '../Components/PostsCarousel';
import { Logeduser } from '../../src/redux/actions/acountActions';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.entitiesReducer);

  const [inputVdv, setInputVdV] = useState('');
  const [inputMonto, setInputMonto] = useState('');
  const navigate = useNavigate();

  let userData = localStorage.getItem('LogedUser');
  useEffect(() => {
    if (userData) {
      dispatch(Logeduser());
    }
    dispatch(fetchEntities());
  }, [dispatch]);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    name === 'Monto' ? setInputMonto(value) : setInputVdV(value);
  };

  const handleButton = (event) => {
    let userData = JSON.parse(localStorage.getItem('LogedUser'));
    if (!userData) {
      navigate('/login');
      alert('Debes iniciar sesión para poder donar');
      throw Error('Debes iniciar sesión para poder donar');
    }
    if (inputMonto && inputVdv) {
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: inputVdv,
            amount: inputMonto,
            UserId: userData.id,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      alert('Seleccione entidad e ingrese monto');
    }
  };

  return (
    <Box justify="center" align="center">
      <Heading
        as="h1"
        size="l"
        bg="#2F855A"
        w="70%"
        h="100px"
        color="white"
        padding="2%"
        borderRadius="md"
      >
        Te brindamos información sobre los distintos lugares dedicados al
        reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
        experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
        cuidar el planeta junto a nosotrxs!
      </Heading>
      <Stack p={'4'}>
        <HStack>
          <Select
            placeholder="Colabora con el punto de reciclaje que te haya ayudado.."
            onChange={handleInputs}
          >
            {entities?.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </Select>
          <InputGroup>
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input
              name="Monto"
              placeholder="Monto"
              type="number"
              onChange={handleInputs}
            />
          </InputGroup>
        </HStack>
        <Button color={'vdv.main'} colorScheme="green" onClick={handleButton}>
          Donar
        </Button>
      </Stack>

      <PostsCarousel />
    </Box>
  );
};

export default Home;
