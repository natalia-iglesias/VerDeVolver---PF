import {
  Box,
  Button,
  Checkbox,
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

const Login = () => {
  const [logInData, setLogInData] = useState({ user: '', password: '' });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

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
          value={logInData.user}
          name="user"
          placeholder="Type your email or user name"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<LockIcon />} />
        <Input
          type={show ? 'text' : 'password'}
          onChange={handleChange}
          value={logInData.password}
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

      <Checkbox>Remember me?</Checkbox>

      <Button>LOGIN</Button>

      <Text alignSelf={'flex-end'}>
        <Link>Forgot Password?</Link>
      </Text>

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
        Need an account? <Link to="/singup">SIGN UP</Link>
      </Text>
    </Box>
  );
};

export default Login;
