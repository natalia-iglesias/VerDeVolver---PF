import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
} from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="white" p={8}>
      <Flex justifyContent="space-between">
        <Box boxSize="10em">
          <Image src="/images/verdevolverimage.png" />
        </Box>
        <Box fontWeight={'700'} fontSize="1.5em">
          <Link as={ReachLink} to="/map" color="green" mr={5}>
            Mapa
          </Link>
          <Link as={ReachLink} to="/login" color="green" mr={5}>
            SerVdV
          </Link>
          <Link as={ReachLink} to="/entities" color="green" mr={5}>
            VdVs
          </Link>
          <Menu>
            <MenuButton fontWeight={'700'} color="green">
              Contactanos
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/about"
                fontWeight={'700'}
                color="green"
              >
                Quienes somos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/contact"
                fontWeight={'700'}
                color="green"
              >
                Contacto
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box boxSize="150px">
          <Image borderRadius="full" src="/images/mundoverde.png" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
