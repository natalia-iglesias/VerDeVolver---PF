import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BsFacebook, BsGithub } from 'react-icons/bs';

const validate = (singUpData) => {
  const errors = {};

  if (!singUpData.user) {
    errors.user = 'Email or username is required';
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(singUpData.user)
  ) {
    errors.user = 'Invalid email format';
  }

  if (!singUpData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const SingUp = () => {
  const [singUpData, setSingUpData] = useState({ user: '', password: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingUpData({ ...singUpData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(singUpData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      //hacer el axios
    }
  };

  console.log(singUpData.user, singUpData.password);

  return (
    <Box
      m={'1rem'}
      display="flex"
      flexDir={'column'}
      gap={'1rem'}
      overflow={'hidden'}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AtSignIcon />} />
        <Input
          type="text"
          onChange={handleChange}
          value={singUpData.user}
          name="user"
          placeholder="Type your email or user name"
        />
      </InputGroup>
      {errors.user && <Text color="red.500">{errors.user}</Text>}
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<LockIcon />} />
        <Input
          type={show ? 'text' : 'password'}
          onChange={handleChange}
          value={singUpData.password}
          name="password"
          placeholder="Type your password"
        />
        <InputRightElement>
          <IconButton
            icon={show ? <ViewOffIcon /> : <ViewIcon />}
            onClick={() => setShow(!show)}
          />
        </InputRightElement>
      </InputGroup>
      {errors.password && <Text color="red.500">{errors.password}</Text>}
      <Button onSubmit={handleSubmit}>SIGN UP</Button>

      <Divider />

      <HStack justifyContent={'center'} gap={'1rem'}>
        <IconButton
          icon={<AiFillGoogleCircle />}
          color="brands.google"
          variant={'ghost'}
        />
        <IconButton
          icon={<BsFacebook />}
          color="brands.facebook"
          variant={'ghost'}
        />
        <IconButton
          icon={<BsGithub />}
          color="brands.github"
          variant={'ghost'}
        />
      </HStack>

      <Text textAlign={'center'}>
        Already a user? <Link to="/login">LOGIN</Link>
      </Text>
    </Box>
  );
};

export default SingUp;
