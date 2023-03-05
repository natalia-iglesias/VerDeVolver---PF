import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BiUser, BiDirections, BiImage } from 'react-icons/bi';
import axios from 'axios';
import {
  authAcountLocal,
  authAcountGoogle,
} from '../redux/actions/acountActions';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../Components/Cloudinary';
import { fetchUsers } from '../redux/actions/usersActions';
import { fetchEntities } from '../redux/actions/entitiesActions';

const validate = ({ name, last_name, mail, password }, users, entities) => {
  const errors = {};

  if (!name) {
    errors.name = 'El nombre es obligatorio';
  } else if (name.length < 4 || name.length > 16) {
    errors.name = 'El nombre debe tener entre 4 y 16 caracteres';
  }

  if (!last_name) {
    errors.last_name = 'El apellido es obligatorio';
  } else if (last_name.length < 4 || last_name.length > 16) {
    errors.last_name = 'El apellido debe tener entre 4 y 16 caracteres';
  }

  const userMails = users?.filter(element => element.mail == mail); 
  const vdvsMails = entities?.filter(element => element.mail == mail);
  if (!mail) {
    errors.mail = 'El mail es obligatorio';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail)) {
    errors.mail = 'Formato de mail invalido';
  }else if (userMails!==undefined && vdvsMails!==undefined){
    if (userMails.length>0 || vdvsMails.length>0){
      errors.mail = 'El mail ingresado se encuentra asociado a otra cuenta';
    }
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 4 || password.length > 16) {
    errors.password = 'La contraseña debe tener entre 4 y 16 caracteres';
  }

  return errors;
};

const SingUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { acount } = useSelector((state) => state.acountReducer);
  const { entities } = useSelector((state) => state.entitiesReducer);
  const { users } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    Object.entries(acount).length && navigate('/home');
  }, [acount]);
  useEffect(() => {
    dispatch(fetchUsers()); 
    dispatch(fetchEntities()); 
  }, [dispatch]);

  const [singUpData, setSingUpData] = useState({
    name: '',
    last_name: '',
    mail: '',
    password: '',
    image: '',
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingUpData({ ...singUpData, [name]: value });
    setErrors(validate({ ...singUpData, [name]: value }, users, entities));
  };

  const handleSubmit = async () => {
    const errors = validate(singUpData, users, entities);
    setErrors(errors);

    if(Object.keys(errors).length>0){
      return toast({
        title: 'Error',
        description: 'Por favor chequea que no haya errores en ningun campo',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    else if (!Object.keys(errors).length) {
      console.log(singUpData);
      const res = await axios.post('http://localhost:3001/user', {
        ...singUpData,
      });
      toast({
        title: 'Éxito',
        description: 'Creación de usuario exitosa. Muchas gracias por registrarte!',
        status: 'success',
        duration: 1600,
        isClosable: true,
      });
      res.status === 200 && dispatch(authAcountLocal(singUpData));
    }
  };

  const handleUploadImage = (url) => {
    setSingUpData({ ...singUpData, image: url });
  };

  return (
    <Box
      m={'1rem'}
      display="flex"
      flexDir={'column'}
      gap={'1rem'}
      overflow={'hidden'}
    >
      <FormControl isInvalid={errors.name}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BiUser />} />

          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.name}
            name="name"
            placeholder="Escribe tu nombre"
          />
        </InputGroup>
        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={errors.last_name}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BiUser />} />

          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.last_name}
            name="last_name"
            placeholder="Escribe tu apellido"
          />
        </InputGroup>
        {errors.last_name && (
          <FormErrorMessage>{errors.last_name}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.mail}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<AtSignIcon />} />
          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.mail}
            name="mail"
            placeholder="Escribe tu mail"
          />
        </InputGroup>
        {errors.mail && <FormErrorMessage>{errors.mail}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<LockIcon />} />
          <Input
            type={show ? 'text' : 'password'}
            onChange={handleChange}
            value={singUpData.password}
            name="password"
            placeholder="Escribe tu contraseña"
          />
          <InputRightElement>
            <IconButton
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShow(!show)}
            />
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Imagen</FormLabel>
        <UploadImage onUpload={handleUploadImage} value={singUpData.image} />
        
          <FormHelperText>Sube tu imagen aqui.</FormHelperText>
        
      </FormControl>

      <Button onClick={handleSubmit}>Registrarse</Button>

      <IconButton
        icon={<AiFillGoogleCircle />}
        color="brands.google"
        onClick={() => dispatch(authAcountGoogle())}
      />

      <Divider />

      <Text textAlign={'center'}>
        Ya estas registrado? <Link to="/login">Inicia sesión</Link>
      </Text>
      <Box h={'25rem'}></Box>
    </Box>
  );
};

export default SingUp;
