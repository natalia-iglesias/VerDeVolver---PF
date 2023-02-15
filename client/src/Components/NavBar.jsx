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
    <Box bg="#F5F2EB" p={3}>
      <Flex justifyContent={'center'} mb={'3rem'}>
        <Box boxSize="8em" position={'absolute'} top="-10" left={0}>
          <Image boxSize="190px" objectFit="cover" src="/images/logo.png" />
        </Box>
        <Box fontWeight={'700'} fontSize="1.5em" mt={'2%'}>
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
        <Box boxSize="120px" position={'absolute'} top="1" right={0}>
          <Image borderRadius="full" src="/images/mundoverde.png" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
