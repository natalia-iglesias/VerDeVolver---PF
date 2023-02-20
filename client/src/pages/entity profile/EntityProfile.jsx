import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Text,
  Card,
  CardBody,
  Textarea,
} from '@chakra-ui/react';
import OverflowScroll from '../../Components/OverflowScroll';
import InfoCardInput from '../../Components/InforCardInput';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  deleteMaterial,
  addMaterial,
  updateVdV,
  deleteVdV,
} from './entityProfileFunctions';

const EntityProfile = () => {
  const { id } = useParams();
  const [saveButton, setSaveButton] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    mail: '',
    password: '',
    cbu: '',
    Materials: [],
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      setInput({
        ...res.data,
        image:
          'https://media.lacapital.com.ar/p/c2a33864011f924c825debbc800fdc33/adjuntos/204/imagenes/028/327/0028327548/1200x675/smart/leo-mattiolijpg.jpg',
      });
    });
  }, []);

  const handleOnChange = (e) => {
    setInput((prevObj) => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
    setSaveButton(true);
  };

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
        <InfoCardInput
          mail={input.mail}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Dirección
        </Heading>
        <InfoCardInput
          adress={input.address}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Image src="https://i.blogs.es/0f9387/coche/450_1000.jpg" w="20vw" />
      </Flex>
      <Flex direction="column" align="center">
        <Image src={input.image} borderRadius="full" boxSize="140px" />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput
          password={input.password}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          CBU
        </Heading>
        <InfoCardInput
          cbu={input.cbu}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Materiales
        </Heading>
        {input.Materials?.map((mat, i) => {
          return (
            <Button
              key={i}
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
          onChange={(e) => addMaterial(e, input.Materials, setInput)}
        >
          {materialsArray.map((mat, i) => {
            return (
              <option key={i} value={mat}>
                {mat}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <OverflowScroll type="entityDonation" id={id} mb="0vh" />
        <Heading align="center" m="0vh">
          Descripcion
        </Heading>
        <Textarea
          value={input.description}
          name="description"
          onChange={(e) => handleOnChange(e)}
        />
        {saveButton && (
          <Button m="10vh auto" w="12vw" onClick={() => updateVdV(id, input)}>
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
        <Button mt="10vh" onClick={() => deleteVdV(id, navigate)}>
          Eliminar Perfil
        </Button>
      </Flex>
    </Flex>
  );
};

export default EntityProfile;

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
