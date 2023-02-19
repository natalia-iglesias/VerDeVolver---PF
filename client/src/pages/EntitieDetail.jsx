import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../components/RankingStars';

const ent = {
  name: 'Lorem ipsum dolor',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium dignissim eros, tincidunt tempor tortor egestas quis. Duis pretium, orci nec porta commodo, urna ante lobortis purus, ac mollis lacus magna malesuada dolor. Fusce id sem euismod metus dapibus egestas. Pellentesque eget nisi quis diam vehicula facilisis. Nulla efficitur sollicitudin sagittis. Sed volutpat urna non pretium mollis. Praesent est libero, consequat vel scelerisque quis, suscipit vel urna. Sed urna tellus, pretium a felis vel, tristique porta leo. Nam mattis odio id velit tristique ullamcorper.Vivamus at bibendum dui. Vestibulum vestibulum metus eget quam malesuada, vel tincidunt nisi placerat. Nam quis libero consequat, lacinia velit sed, porta erat. Vivamus tristique porta ex vestibulum cursus. Praesent et lacus augue. Curabitur bibendum nunc nec mi sollicitudin, et hendrerit mauris efficitur. Fusce ex eros, consequat sed arcu vel, luctus auctor leo. Fusce vel erat euismod, rutrum diam quis, facilisis felis. Donec mattis felis dolor, id dignissim dui porta ut. Aenean rutrum quam in massa lobortis auctor. Aliquam enim quam, posuere ut dapibus at, fringilla sed metus. Donec volutpat, nisi in tincidunt dictum, elit odio dapibus sapien, nec lobortis ante libero at nisi. Mauris sagittis convallis lorem in lobortis. Fusce mattis metus vitae eros consequat, sed feugiat tellus tempus. Quisque in molestie mauris, vitae pharetra nibh.',
  image: 'https://picsum.photos/600',
  materials: ['Glass', 'Non-ferrous metals', 'Tires', 'Electronic', 'Carton'],
  feedback: [
    {
      user: 'Isla Robertson',
      ranking: 5,
      comment:
        'Fusce sagittis felis eget commodo consequat. Nunc nec nisl velit.',
    },
    {
      user: 'Milo Patel',
      ranking: 3,
      comment:
        'Sed malesuada libero vitae orci bibendum, at interdum ex rutrum.',
    },
    {
      user: 'Nadia Sullivan',
      ranking: 4,
      comment:
        'Donec scelerisque felis nec sapien tempus, sed ullamcorper mauris imperdiet. Phasellus tempor neque fringilla ornare tempus.',
    },
    {
      user: 'Kieran Cooper',
      ranking: 1,
      comment:
        'Etiam convallis facilisis lacus, eu pulvinar leo vehicula sit amet.',
    },
    {
      user: 'Ava Reynolds',
      ranking: 2,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dapibus semper est, quis euismod massa lacinia nec. In maximus nisi sed quam suscipit maximus.',
    },
    {
      user: 'Maddox Sanders',
      ranking: 5,
      comment:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      user: 'Hazel Cox',
      ranking: 3,
      comment:
        'Vivamus vestibulum ullamcorper nisi, non posuere nisi mattis vel. Sed efficitur euismod quam, at fermentum nunc dictum sit amet.',
    },
    {
      user: 'Landon Kim',
      ranking: 4,
      comment:
        'Pellentesque quis sollicitudin massa. Fusce bibendum nulla eu libero blandit, eget consequat massa gravida. Fusce euismod purus felis.',
    },
    {
      user: 'Audrey Ortiz',
      ranking: 1,
      comment:
        'Phasellus lobortis aliquet sapien, eget tincidunt ex. Donec quis dolor euismod, lobortis ipsum at, tincidunt risus. Sed vehicula feugiat ipsum, sit amet maximus eros venenatis a.',
    },
    {
      user: 'Owen Lee',
      ranking: 2,
      comment:
        'Aliquam nec dolor in leo dignissim suscipit. Ut at dolor eu massa euismod ullamcorper. Integer porta libero lectus, vel viverra nulla accumsan ac.',
    },
  ],
};

const EntityDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { entity } = useSelector((state) => state.entitiesReducer);

  useEffect(() => {
    // dispatch(getEntityById(id))
  }, [id]);

  if (!ent) return <PropagateLoader color="#1c5738" />;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
        <Image src={ent.image} />
        <InputGroup>
          <InputLeftElement children={<MdOutlineAttachMoney />} />
          <Input placeholder="Monto" type={'number'} />
          <Button>Donar</Button>
        </InputGroup>
      </GridItem>
      <GridItem>
        <Heading>{ent.name}</Heading>
        <HStack my="1rem">
          {ent.materials.map((m) => (
            <Badge key={m} variant="solid" colorScheme="green">
              {m}
            </Badge>
          ))}
        </HStack>
        <Text fontSize={'lg'} lineHeight="8">
          {ent.description}
        </Text>

        <Stack mt="1rem">
          <Heading fontSize={'lg'}>Reseñas</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            overflowY={'scroll'}
            maxH="25vh"
            divider={<StackDivider />}
          >
            {ent.feedback.map(({ user, ranking, comment }, i) => (
              <Box key={i}>
                <HStack>
                  <Avatar name={user} size="sm" />
                  <RankingStars stars={ranking} />
                </HStack>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default EntityDetail;
