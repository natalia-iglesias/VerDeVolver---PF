import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

function EntitieDetail() {
  return (
    <>
      <Flex
        id="entitieDetail"
        justifyContent="space-around"
        flexDirection="row"
        height="100vh"
      >
        <Flex
          id="leftColumn"
          justifyContent="space-around"
          flexDirection="column"
        >
          <Image
            boxSize="300px"
            objectFit="cover"
            src="https://www.semm.com.uy/wp-content/uploads/2021/11/img-nota-ecologia.png"
            alt="Entitie image"
          />
        </Flex>
        <Flex
          id="righttColumn"
          justifyContent="space-around"
          flexDirection="column"
        >
          <Box>nombre</Box>
          <Box>descripcion</Box>
        </Flex>
      </Flex>
    </>
  );
}

export default EntitieDetail;
