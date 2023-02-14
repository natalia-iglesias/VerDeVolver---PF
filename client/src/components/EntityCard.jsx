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
} from '@chakra-ui/react';

const EntityCard = ({ entity }) => {
  return (
    <Card>
      <CardBody display="flex" flexDir="row" gap="1rem">
        <Image src="https://picsum.photos/300" />
        <VStack>
          <Heading>{entity.name}</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            molestie posuere consectetur. Curabitur vitae libero libero. Integer
            sit amet efficitur ex. Duis ut ligula ante. Proin aliquam cursus
            erat, eu condimentum felis pharetra sit amet. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Morbi lacus lorem, pretium et tempus at, luctus eu diam. Fusce
            aliquet vestibulum eros et dapibus.
          </Text>
        </VStack>
      </CardBody>

      <CardFooter>
        <InputGroup size="md">
          <InputLeftAddon children="$" />
          <Input pr="4.5rem" type="number" placeholder="Amout" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" m="0.5rem" size="sm" colorScheme={'green'}>
              Donate
            </Button>
          </InputRightElement>
        </InputGroup>
      </CardFooter>
    </Card>
  );
};

export default EntityCard;
