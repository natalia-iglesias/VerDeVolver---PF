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
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // usael hook useColorMode

  return (
    <Box bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}>
      <Flex justifyContent={'center'} mb={'3rem'}>
        <Link as={ReachLink} to="/home">
          <Box boxSize="10em" position={'absolute'} top="-10" left={0}>
            <Image boxSize="170px" objectFit="cover" src="/images/logo.png" />
          </Box>
        </Link>
        <Box fontWeight={'700'} fontSize="1.5em" mt={'2%'}>
          <Link as={ReachLink} to="/map" color="green" mr={5}>
            Mapa
          </Link>
          <Link as={ReachLink} to="/beVdV" color="green" mr={5}>
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
                src="https://img.icons8.com/ios11/600/FFFFFF/user.png"
                alt="Perfil"
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/userprofile"
                fontWeight={'700'}
                color="green"
              >
                Mi perfil
              </MenuItem>
              <MenuItem as={ReachLink} to="/" fontWeight={'700'} color="green">
                Cerrar Sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Flex ml={'2%'}>
          <Button
            mt={'130%'}
            colorScheme="green"
            size={'xs'}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
