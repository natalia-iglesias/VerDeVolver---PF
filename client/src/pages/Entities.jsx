import { users, materials } from '../db.json';
import {
  Checkbox,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import EntityCard from '../components/EntityCard';
import { SearchIcon } from '@chakra-ui/icons';

const Entities = () => {
  const entities = users.filter((u) => u.role === 'entity');

  return (
    <VStack>
      <Grid templateColumns="1fr 4fr" m={'2'}>
        <GridItem>
          <VStack>
            {materials?.map((m) => (
              <Checkbox key={m} colorScheme="green">
                {m}
              </Checkbox>
            ))}
          </VStack>
        </GridItem>

        <GridItem>
          <InputGroup m={'2'}>
            <Input placeholder="Type the entity name" type="text" />
            <InputRightElement>
              <IconButton colorScheme={'blue'} icon={<SearchIcon />} />
            </InputRightElement>
          </InputGroup>

          <VStack spacing="4">
            {entities?.map((e) => (
              <EntityCard key={e.uuid} entity={e} />
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
