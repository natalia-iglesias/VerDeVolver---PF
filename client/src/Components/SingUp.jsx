import {
  Box,
  Button,
  Divider,
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
import axios from 'axios';
import { authAcountLocal } from '../redux/actions/acountActions';
import { useDispatch } from 'react-redux';

const validate = ({ mail, password }) => {
  const errors = {};

  if (!mail) {
    errors.mail = 'Email is required';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail)) {
    errors.mail = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const SingUp = () => {
  const dispatch = useDispatch();

  const [singUpData, setSingUpData] = useState({ mail: '', password: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingUpData({ ...singUpData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async () => {
    const errors = validate(singUpData);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      const res = await axios.post('http://localhost:3001/user', {
        ...singUpData,
        name: 'John',
        last_name: 'Doe',
        image:
          'https://thumbs.dreamstime.com/b/portrait-smart-intelligent-middle-aged-man-use-cellphone-professional-social-network-user-wear-stylish-spectacles-isolated-over-165720119.jpg',
        address: 'Anchorena 545',
        role: 1,
      });
      res.status === 200 && dispatch(authAcountLocal(singUpData));
    }
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
          value={singUpData.mail}
          name="mail"
          placeholder="Type your email"
        />
      </InputGroup>
      {errors.mail && <Text color="red.500">{errors.mail}</Text>}
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

      <Button onClick={handleSubmit}>SIGN UP</Button>

      <IconButton
        icon={<AiFillGoogleCircle />}
        color="brands.google"
        onClick={() => dispatch(authAcountGoogle())}
      />

      <Divider />

      <Text textAlign={'center'}>
        Already a user? <Link to="/login">LOGIN</Link>
      </Text>
    </Box>
  );
};

export default SingUp;
