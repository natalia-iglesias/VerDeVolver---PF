import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="full"
        p="1rem"
        bg="#80808080"
        color="#e4ebed"
        pos="absolute"
        bottom="0"
      >
        <Text fontSize="l">
          © 2023 VerDeVolver. All rights reserved. Designed and developed by
          Henry students
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
