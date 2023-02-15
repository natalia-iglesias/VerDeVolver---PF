import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Heading,
} from '@chakra-ui/react';

function EntitieDetail() {
  return (
    <>
      <Flex
        id="entitieDetail"
        flexDirection="row"
        height="100vh"
        bg="brand.light-green"
      >
        <Flex
          id="leftColumn"
          justifyContent="space-around"
          flexDirection="column"
          w="70vh"
          ml="20vh"
        >
          <Image
            boxSize="500px"
            objectFit="cover"
            src="https://www.semm.com.uy/wp-content/uploads/2021/11/img-nota-ecologia.png"
            alt="Entitie image"
            border="solid 4px"
            borderRadius="10px"
          />
        </Flex>
        <Flex
          id="righttColumn"
          justifyContent="space-evenly"
          flexDirection="column"
          w="70vh"
          m="auto"
        >
          <Flex flexDirection="row">
            <Input
              color="brand.green"
              placeholder="Ingresar monto..."
              _placeholder={{ color: 'inherit' }}
              border="solid 2px"
            />
            <Button
              bg="brand.green"
              color="brand.main"
              _hover={{ bg: 'brand.main', color: 'brand.green' }}
            >
              Aportar a VdV
            </Button>
          </Flex>

          <Heading as="h1" size="xl" m="3vh">
            Nombre de la entidad
          </Heading>
          <Text w="80vh" h="50vh">
            Esto es una descripcion de la entidad.Esto es una descripcion de la
            entidad.Esto es una descripcion de la entidad.Esto es una
            descripcion de la entidad.Esto es una descripcion de la entidad.Esto
            es una descripcion de la entidad.Esto es una descripcion de la
            entidad.Esto es una descripcion de la entidad.Esto es una
            descripcion de la entidad.Esto es una descripcion de la entidad.Esto
            es una descripcion de la entidad.Esto es una descripcion de la
            entidad.Esto es una descripcion de la entidad.Esto es una
            descripcion de la entidad.Esto es una descripcion de la entidad.Esto
            es una descripcion de la entidad.Esto es una descripcion de la
            entidad.Esto es una descripcion de la entidad.Esto es una
            descripcion de la entidad.Esto es una descripcion de la entidad.
          </Text>
          <Box w="80vh" h="20vh" overflow="auto">
            <Flex overflowX="scroll" px={4} py={2} flexDirection="column">
              <Box w="90vh" h="100px" bg="blue.200" m={2} />
              <Box w="90vh" h="100px" bg="green.200" m={2} />
              <Box w="90vh" h="100px" bg="red.200" m={2} />
              <Box w="90vh" h="100px" bg="purple.200" m={2} />
              <Box w="90vh" h="100px" bg="orange.200" m={2} />
              <Box w="90vh" h="100px" bg="teal.200" m={2} />
              <Box w="90vh" h="100px" bg="yellow.200" m={2} />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default EntitieDetail;
