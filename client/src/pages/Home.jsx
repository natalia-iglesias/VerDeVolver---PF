import { useSelector } from 'react-redux';
import {
  Button,
  Input,
  InputGroup,
  Select,
  Stack,
  Box,
  InputLeftElement,
  HStack,
} from '@chakra-ui/react';
import PostsCarousel from '../components/PostsCarousel';
import { MdOutlineAttachMoney } from 'react-icons/md';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  return (
    <Box>
      <Stack p={'4'}>
        <HStack>
          <Select placeholder="Entidad a donar">
            {entities?.map(({ uuid, name }) => (
              <option key={uuid}>{name}</option>
            ))}
          </Select>
          <InputGroup>
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input placeholder="Monto" type="number" />
          </InputGroup>
        </HStack>
        <Button color={'vdv.main'} colorScheme="green">
          Donar
        </Button>
      </Stack>

      <PostsCarousel />
    </Box>
  );
};

export default Home;
