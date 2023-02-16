import {
  // Checkbox,
  Grid,
  GridItem,
  // IconButton,
  // Input,
  // InputGroup,
  // InputRightElement,
  VStack,
} from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector } from 'react-redux';
import EntityCard from '../components/EntityCard';
// import { SearchIcon } from '@chakra-ui/icons';

const Entities = () => {
  const entities = useSelector((state) => state.entitiesReducer.entities);

  return (
    <VStack>
      <Grid>
        <GridItem>
          {/* <VStack>
            {materials?.map((m) => (
              <Checkbox key={m} colorScheme="green">
                {m}
              </Checkbox>
            ))}
          </VStack> */}
          <SearchBar />
        </GridItem>

        <GridItem>
          {/* <InputGroup m={'2'}>
            <Input placeholder="Type the entity name" type="text" />
            <InputRightElement>
              <IconButton colorScheme={'blue'} icon={<SearchIcon />} />
            </InputRightElement>
          </InputGroup> */}

          <VStack spacing="4">
            {entities?.length > 0 ? (
              entities.map((e) => <EntityCard key={e.uuid} entity={e} />)
            ) : (
              <p>Cargando...</p>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
