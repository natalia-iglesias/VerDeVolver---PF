import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {
  authAcountLocal,
  authAcountGoogle,
} from '../redux/actions/acountActions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acount } = useSelector((state) => state.acountReducer);

  useEffect(() => {
    Object.entries(acount).length && navigate('/home');
  }, [acount]);

  const [logInData, setLogInData] = useState({
    mail: '',
    password: '',
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  const handleLogin = async () => {
    dispatch(authAcountLocal(logInData));
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
          value={logInData.mail}
          name="mail"
          placeholder="Type your email"
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

      <Button onClick={handleLogin}>LOGIN</Button>

      <IconButton
        icon={<AiFillGoogleCircle />}
        color="brands.google"
        onClick={() => dispatch(authAcountGoogle())}
      />

      <Text alignSelf={'flex-end'}>
        <Link>Forgot Password?</Link>
      </Text>

      <Divider />

      <Text textAlign={'center'}>
        Need an account? <Link to="/singup">SIGN UP</Link>
      </Text>
    </Box>
  );
};

export default Login;
