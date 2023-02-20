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
  Heading,
} from '@chakra-ui/react';
import PostsCarousel from '../components/PostsCarousel';
import { MdOutlineAttachMoney } from 'react-icons/md';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  return (
    <Box>
      <Heading
        as="h1"
        size="l"
        display="flex"
        align="center"
        justify="center"
        bg="#68D391"
        w="auto"
        h="100px"
        color="white"
        padding="2%"
      >
        Te brindamos información sobre los distintos lugares dedicados al
        reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
        experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
        cuidar el planeta junto a nosotrxs!
      </Heading>

      <Stack p={'4'}>
        <HStack>
          <Select placeholder="Colabora con el punto de reciclaje que te haya ayudado ">
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
