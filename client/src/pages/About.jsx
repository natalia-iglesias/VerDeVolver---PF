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
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';

const About = () => {
  function renderDevCard(devName) {
    return (
      <Card bg="brand.light-green" border="solid 3px" w="20%" m="1vh" h="45vh">
        <Image
          src="https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg"
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
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Milton Jeremias Amelino',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Diana Noemi Atobe Gimenez',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Juan Cruz Toloy',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Cristian Mauricio Ortiz Cano',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Rodrigo Jorge Figari',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Natalia  Iglesias Gonzalez',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
    {
      name: 'Damián García Abreu',
      img: 'https://img.freepik.com/vector-premium/enfrenta-avatar-circulo-retrato-joven-gafas-estilo-dibujos-animados-plana_101266-4756.jpg',
    },
  ];

  return (
    <Flex flexDirection="column" align="center">
      <Heading>Proyecto final Henry</Heading>
      <Text>
        Explicacion del proyecto.Explicacion del proyecto.Explicacion del
        proyecto.Explicacion del proyecto.Explicacion del proyecto.Explicacion
        del proyecto.Explicacion del proyecto.Explicacion del
        proyecto.Explicacion del proyecto.Explicacion del proyecto.Explicacion
        del proyecto.Explicacion del proyecto.Explicacion del
        proyecto.Explicacion del proyecto.Explicacion del proyecto.Explicacion
        del proyecto.
      </Text>
      <Flex flexWrap="wrap" align="center" w="100%" ml="30vh">
        {devList.map((dev) => renderDevCard(dev.name))}
      </Flex>
    </Flex>
  );
};

export default About;
