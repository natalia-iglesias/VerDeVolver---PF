import { Link as ReachLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';

const EntityCard = ({ entity }) => {
  return (
    <Card display="flex" justifyContent="center">
      <CardBody display="flex" flexDir="row" gap="1.5rem" width="80vw">
        <Image src={entity.img} maxHeight="30vh" maxWidth="40vw" />

        <VStack alignItems="flex-start">
          <Link as={ReachLink} to={`/entitie/${entity.id}`}>
            <Heading>{entity.name}</Heading>
          </Link>
          <Text fontSize="xl">{entity.description}</Text>
        </VStack>
        {entity.Materials.map((mat, i) => (
          <Text
            key={i}
            bg="green"
            borderRadius="1vh"
            h="5vh"
            color="white"
            p="1vh"
            fontSize="12px"
          >
            {mat.name}
          </Text>
        ))}
      </CardBody>

      <CardFooter>
        <InputGroup size="md">
          <InputLeftAddon children="$" />
          <Input pr="4.5rem" type="number" placeholder="Amout" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" m="0.5rem" size="sm" colorScheme={'green'}>
              Donar
            </Button>
          </InputRightElement>
        </InputGroup>
      </CardFooter>
    </Card>
  );
};

export default EntityCard;
