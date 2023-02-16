import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector } from 'react-redux';
import EntityCard from '../components/EntityCard';

const Entities = () => {
  const entities = useSelector((state) => state.entitiesReducer.entities);

  return (
    <VStack>
      <SearchBar />
      {/* <GridItem textAlign={'center'}> */}
      {/* <VStack>
            {materials?.map((m) => (
              <Checkbox key={m} colorScheme="green">
              {m}
              </Checkbox>
              ))}
            </VStack> */}
      {/* </GridItem> */}
      <Grid>
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
