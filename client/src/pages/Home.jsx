import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchEntities } from '../redux/actions/entitiesActions';
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
/* import PostsCarousel from '../components/PostsCarousel'; */
import { MdOutlineAttachMoney } from 'react-icons/md';

import { InstagramEmbed } from 'react-social-media-embed';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  return (
    <Box justify="center" align="center">
      <Heading
        as="h1"
        size="l"
        bg="#2F855A"
        w="70%"
        h="100px"
        color="white"
        padding="2%"
        borderRadius="md"
      >
        Te brindamos información sobre los distintos lugares dedicados al
        reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
        experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
        cuidar el planeta junto a nosotrxs!
      </Heading>
      <Stack p={'4'}>
        <HStack>
          <Select placeholder="Colabora con el punto de reciclaje que te haya ayudado..">
            {entities?.map(({ id, name }) => (
              <option key={id}>{name}</option>
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

      {/* <PostsCarousel /> */}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          rowGap: '1rem',
          gap: '2rem',
          padding: '2%',
        }}
      >
        <InstagramEmbed
          url="https://www.instagram.com/p/CKTr02XgZMh/?utm_source=ig_web_copy_link"
          width={328}
          height={608}
        />
        <InstagramEmbed
          url="https://www.instagram.com/p/CIT3Hz2jDqh/?utm_source=ig_web_copy_link"
          width={328}
          // height={608}
        />
        <InstagramEmbed
          url="https://www.instagram.com/p/CIBswgBs1Ps/?utm_source=ig_web_copy_link"
          width={328}
          // height={608}
        />
        <InstagramEmbed
          url="https://www.instagram.com/p/CHpyNNYDUKq/?utm_source=ig_web_copy_link"
          width={328}
          // height={608}
        />
      </div>
    </Box>
  );
};

export default Home;
