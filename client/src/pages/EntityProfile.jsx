import React, { useState } from 'react';
import { Button, Flex, Heading, Image, Select } from '@chakra-ui/react';
import OverflowScroll from '../Components/OverflowScroll';
import InfoCardInput from '../Components/InforCardInput';

const EntityProfile = () => {
  const [input, setInput] = useState({
    name: 'Entidad recicladora de cosas',
    image: 'https://i.ytimg.com/vi/WOR0ytnVuB4/maxresdefault.jpg',
    mail: 'entidadentidad@gmail.com',
    password: 'ceowncowencwo',
    adress: 'av tanto numero tanto',
    cbu: '1234123512351235',
    materials: ['Plástico', 'Vidrio', 'Metal'],
  });

  const deleteMaterial = (mat) => {
    const newMaterials = input.materials.filter((eachMat) => eachMat !== mat);
    setInput((prevObj) => {
      return { ...prevObj, materials: newMaterials };
    });
  };

  const addMaterial = (e) => {
    let newMaterials = [...input.materials];
    newMaterials.push(e.target.value);
    const uniqueMaterials = [...new Set([...newMaterials])];
    setInput((prevObj) => {
      return { ...prevObj, materials: uniqueMaterials };
    });
  };
  return (
    <Flex direction="row">
      <Flex direction="column">
        <Heading size="lg" align="center" m="3vh">
          Nombre
        </Heading>
        <InfoCardInput name={input.name} setInput={setInput} />
        <Heading size="lg" align="center" m="3vh">
          Mail
        </Heading>
        <InfoCardInput mail={input.mail} setInput={setInput} />
        <Heading size="lg" align="center" m="3vh">
          Dirección
        </Heading>
        <InfoCardInput adress={input.adress} setInput={setInput} />
        <Image src="https://i.blogs.es/0f9387/coche/450_1000.jpg" w="20vw" />
      </Flex>
      <Flex direction="column" align="center">
        <Image src={input.image} borderRadius="full" boxSize="140px" />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput password={input.password} setInput={setInput} />
        <Heading size="lg" align="center" m="3vh">
          CBU
        </Heading>
        <InfoCardInput cbu={input.cbu} setInput={setInput} />
        <Heading size="lg" align="center" m="3vh">
          Materiales
        </Heading>
        {input.materials.map((mat, i) => {
          return (
            <Button key={i} onClick={() => deleteMaterial(mat)}>
              {mat}
            </Button>
          );
        })}
        <Select
          placeholder="Agregar material"
          w="13vw"
          onChange={(e) => addMaterial(e)}
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
        <OverflowScroll type="donation" />
        <Button
          onClick={() =>
            window.alert(
              'Los cambios en el cbu no se verán reflejados automáticamente. Se enviará una solicitud para su revisión. Muchas Gracias.'
            )
          }
          mt="10vh"
        >
          Guardar Cambios
        </Button>
        <Button mt="10vh">Eliminar Perfil</Button>
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
