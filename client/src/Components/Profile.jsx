import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';

const Profile = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (!Object.entries(acount).length)
    return <Button onClick={() => navigate('/login')}>Login</Button>;

  return (
    <Menu>
      <MenuButton>
        <Avatar
          name={`${acount.name} ${acount.last_name}`}
          src={acount.image}
        />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={ReachLink}
          to={`/userprofile`}
          fontWeight={'700'}
          color={colorMode === 'light' ? 'green' : '#68D391'}
        >
          Mi perfil
        </MenuItem>
        <MenuItem
          as={ReachLink}
          to="/"
          fontWeight={'700'}
          color={colorMode === 'light' ? 'green' : '#68D391'}
        >
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
