import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import { logoutAcount } from '../redux/actions/acountActions';
import { fetchEntities } from '../redux/actions/entitiesActions';
import { fetchUsers } from '../redux/actions/usersActions';

const Profile = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEntities());
  }, [dispatch]);

  if (!Object.entries(acount).length)
    return (
      <Button
        bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}
        onClick={() => navigate('/login')}
      >
        Iniciar Sesión
      </Button>
    );

  return (
    <Menu>
      {acount.RoleId == 1 ? (
        <MenuButton>
          <Avatar
            name={`${acount.name} ${acount.last_name}`}
            src={acount.image}
          />
        </MenuButton>
      ) : (
        <MenuButton>
          <Avatar name={`${acount.name}`} src={acount.img} />
        </MenuButton>
      )}
      <MenuList>
        {acount.RoleId !== 4 ? (
          <MenuItem
            as={ReachLink}
            to={`/userprofile`}
            fontWeight={'700'}
            color={colorMode === 'light' ? 'green' : '#68D391'}
          >
            Mi perfil
          </MenuItem>
        ) : (
          <MenuItem
            as={ReachLink}
            to={`/entityprofile`}
            fontWeight={'700'}
            color={colorMode === 'light' ? 'green' : '#68D391'}
          >
            Mi perfil
          </MenuItem>
        )}
        {(acount?.RoleId === 2 || acount?.RoleId === 3) && (
          <MenuItem
            as={ReachLink}
            to={`/dashboard`}
            fontWeight={'700'}
            color={colorMode === 'light' ? 'green' : '#68D391'}
          >
            Dashboard
          </MenuItem>
        )}

        <MenuItem
          as={ReachLink}
          to="/home"
          fontWeight={'700'}
          color={colorMode === 'light' ? 'green' : '#68D391'}
          onClick={() => dispatch(logoutAcount())}
        >
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
