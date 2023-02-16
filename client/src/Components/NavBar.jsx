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
    <Box bg="#F5F2EB">
      <Flex justifyContent={'center'} mb={'3rem'}>
        <Box boxSize="10em" position={'absolute'} top="-10" left={0}>
          <Image boxSize="170px" objectFit="cover" src="/images/logo.png" />
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
        <Box boxSize="50px" position={'absolute'} top="2" right={2}>
          <Menu>
            <MenuButton>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png"
                alt="Perfil"
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/profileentitie"
                fontWeight={'700'}
                color="green"
              >
                Mi perfil
              </MenuItem>
              <MenuItem as={ReachLink} to="/" fontWeight={'700'} color="green">
                Configuracion
              </MenuItem>
              <MenuItem as={ReachLink} to="/" fontWeight={'700'} color="green">
                Cerrar Seción
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
