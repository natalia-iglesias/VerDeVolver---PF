import { useParams } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import axios from 'axios';

const EntityDetail = () => {
  const { id } = useParams();
  const [input, setInput] = useState(false);
  const [feedBacks, setFeedBacks] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      setInput({
        ...res.data,
        /* image:
          'https://i.pinimg.com/564x/0e/60/c7/0e60c7fcd2d898873fc7d1a5060cc232.jpg', */
      });
    });
    axios.get(`http://localhost:3001/feedback/vdv/${id}`).then((res) => {
      setFeedBacks(res.data);
    });
  }, [id]);

  if (!input) return <PropagateLoader color="#1c5738" />;
  if (!feedBacks) return <PropagateLoader color="#1c5738" />;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
      <VStack
        ml="1rem"
      >
        <Image 
          src={input.img} 
          maxHeight="35%"
          maxWidth="50%"
        />
        <InputGroup>
          <InputLeftElement children={<MdOutlineAttachMoney />} />
          <Input placeholder="Monto" type={'number'} />
          <Button>Donar</Button>
        </InputGroup>
      </VStack>

      </GridItem>
      <GridItem>
        <Heading>{input.name}</Heading>
        <HStack my="1rem">
          {input.Materials.map((m, i) => (
            <Badge key={i} variant="solid" colorScheme="green">
              {m.name}
            </Badge>
          ))}
        </HStack>
        <Text fontSize={'lg'} lineHeight="8">
          {input.description}
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
            {feedBacks?.map(({ User, rating, comment }, i) => (
              <Box key={i}>
                <HStack>
                  <Avatar name={User.name} size="sm" />
                  <RankingStars stars={rating} />
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
