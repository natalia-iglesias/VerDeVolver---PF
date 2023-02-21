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
          'https://www.anahuac.mx/mexico/sites/default/files/styles/webp/public/noticias/El-plastico-reciclado-eficiente-como-material-de-construccion.jpg.webp?itok=rEmpK8uY',
      });
    });
  }, []);

  return (
    <Flex direction="row">
      <Flex direction="column" w="40vw">
        <Heading size="lg" align="center" m="3vh">
          Nombre
        </Heading>
        <InfoCardInput
          type="name"
          data={input.name}
          setInput={setInput}
          setSaveButton={setSaveButton}
          input={input}
        />
        <Heading size="lg" align="center" m="3vh">
          Mail
        </Heading>
        <InfoCardInput
          type="mail"
          data={input.mail}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput
          type="password"
          data={input.password}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
      </Flex>
      <Flex direction="column" align="center" w="40vw">
        <Image
          src={input.image}
          borderRadius="2vh"
          boxSize="200px"
          m="10vh auto"
        />
        {saveButton && (
          <Button
            m="10vh auto"
            w="20vw"
            h="10vh"
            border="solid green 2px"
            onClick={() => updateUser(id, input)}
          >
            Guardar Cambios
          </Button>
        )}
        {!saveButton && (
          <Card w="20vw" h="7vh" m="10vh auto" pb="10vh">
            <CardBody w="20vw" m="auto">
              <Text m="auto" align="center">
                Guardar cambios
              </Text>
            </CardBody>
          </Card>
        )}
        <Button
          mt="0vh"
          w="20vw"
          h="10vh"
          border="solid red 2px"
          onClick={() => deleteUser(id, navigate)}
        >
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
