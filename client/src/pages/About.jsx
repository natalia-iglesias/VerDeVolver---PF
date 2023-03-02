import React from 'react';
import {
  Text,
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Link,
  Image,
  Box, 
  useColorMode
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Logeduser } from '../../src/redux/actions/acountActions';

const About = () => {
  const dispatch = useDispatch();
  let userData = localStorage.getItem('LogedUser');
  if (userData) {
    useEffect(() => {
      dispatch(Logeduser());
    }, [dispatch]);
  }
  const { colorMode } = useColorMode();
  function renderDevCard(devName, devImg) {
    return (
      <Card backgroundColor='#FFFEEC' bg="brand.light-green" border="solid 3px" borderColor='#3B7A57' fontFamily='lato' w="20%" m="1vh" h="45vh" p='0.5rem'>
        <Image
          src={devImg}
          alt="Dev Photo"
          borderRadius="full"
          boxSize="100px"
          m="auto"
        />
        <CardHeader m="1px" p="1px" align="center">
          <Heading size="md">{devName}</Heading>
        </CardHeader>

        <CardBody mt="1px">
          <Stack divider={<StackDivider />} spacing="1">
            <Link href="https://www.instagram.com/" isExternal m="auto">
              Instagram <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href="https://ar.linkedin.com" isExternal m="auto">
              LinkedIn <ExternalLinkIcon mx="2px" />
            </Link>
            <Text pt="2" fontSize="sm" m="auto">
              Mail <CopyIcon mx="2px" />
            </Text>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  const devList = [
    {
      name: 'Solana Rocio Gomez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730208/sol_qut1t5.jpg',
    },
    {
      name: 'Milton Jeremias Amelino',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730247/tato_sa9zqk.jpg',
    },
    {
      name: 'Diana Noemi Atobe Gimenez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730798/dini_vcji6w.png',
    },
    {
      name: 'Juan Cruz Toloy',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730200/juan_c7r7qq.jpg',
    },
    {
      name: 'Cristian Mauricio Ortiz Cano',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730219/cris_zwqoxn.jpg',
    },
    {
      name: 'Rodrigo Jorge Figari',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730168/rodri_qg9lw6.jpg',
    },
    {
      name: 'Natalia  Iglesias Gonzalez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730233/naty_gktztr.jpg',
    },
    {
      name: 'Damián García Abreu',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730241/dami_sa1vpt.jpg',
    },
  ];

  return (
    <Flex flexDirection="column" align="center" backgroundColor='#b4c4ac' padding='1rem' >
      <Box borderRadius='lg' mb='0.8rem' p='0.7rem' bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}>
        <Heading align='center' fontFamily='Exo 2' mb='0.8rem' >Proyecto final Henry</Heading>
        <Text align='center' width="90vw" m='0.7rem' fontSize='xl' fontFamily='lato'>
      VerDeVolver es un sitio web sin fines de lucro, que busca promover e informar sobre el
      reciclaje y gestión de residuos a nivel nacional en Argentina, a través de una interfaz de
      usuario intuitiva y amigable.
      Ofrecemos una guía simple sobre los
      materiales reciclables (qué son, qué hacer con ellos, cuánto dañan el medio ambiente) y
      un mapa georreferenciado que muestra los lugares (entidades VdV) cercanos donde
      puedes entregar tus residuos. Las entidades VdV son organizaciones, cooperativas,
      emprendimientos, empresas o particulares que reciben, reciclan y/o reutilizan
      determinados residuos. VerDeVolver no está involucrada ni participa directamente con
      ninguno de los puntos de reciclaje en el mapa.
        </Text>
      </Box>
      
      <Flex flexWrap="wrap" align="center" w="100%" ml="30vh">
        {devList.map((dev) => renderDevCard(dev.name, dev.img))}
      </Flex>
    </Flex>
  );
};

export default About;
