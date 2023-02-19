import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Flex,
  Heading,
  Image,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';
import OverflowScroll from '../../Components/OverflowScroll';
import InfoCardInput from '../../Components/InforCardInput';
import { deleteUser, updateUser } from './userProfileFunctions';

function UserProfile() {
  const { id } = useParams();
  const [input, setInput] = useState({
    name: '',
    image: '',
    mail: '',
    password: '',
  });
  const navigate = useNavigate();
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/user/${id}`).then((res) => {
      setInput({
        ...res.data,
        image:
          'https://media.lacapital.com.ar/p/c2a33864011f924c825debbc800fdc33/adjuntos/204/imagenes/028/327/0028327548/1200x675/smart/leo-mattiolijpg.jpg',
      });
    });
  }, []);

  return (
    <Flex direction="row">
      <Flex direction="column">
        <Heading size="lg" align="center" m="3vh">
          Nombre
        </Heading>
        <InfoCardInput
          name={input.name}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Mail
        </Heading>
        <InfoCardInput mail={input.mail} setInput={setInput} />
        {saveButton && (
          <Button m="10vh auto" w="12vw" onClick={() => updateUser(id, input)}>
            Guardar Cambios
          </Button>
        )}
        {!saveButton && (
          <Card w="12vw" h="7vh" m="10vh auto" pb="10vh">
            <CardBody w="12vw" m="auto">
              <Text m="auto">Guardar cambios</Text>
            </CardBody>
          </Card>
        )}
      </Flex>
      <Flex direction="column" align="center">
        <Image src={input.image} borderRadius="full" boxSize="140px" />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput password={input.password} setInput={setInput} />
        <Button mt="10vh" onClick={() => deleteUser(id, navigate)}>
          Eliminar Perfil
        </Button>
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <OverflowScroll type="userDonation" id={id} />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <OverflowScroll type="userService" id={id} />
      </Flex>
    </Flex>
  );
}

export default UserProfile;
