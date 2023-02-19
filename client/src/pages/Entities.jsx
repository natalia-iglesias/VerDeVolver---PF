import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector } from 'react-redux';
import EntityCard from '../components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../components/AsideFilters';

const Entities = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  return (
    <VStack mx="1rem">
      <SearchBar />

      <Grid templateColumns="1fr 4fr">
        <GridItem>
          <AsideFilters />
        </GridItem>
        <GridItem>
          <VStack spacing="4">
            {entities?.length > 0 ? (
              entities.map((e) => <EntityCard key={e.uuid} entity={e} />)
            ) : (
              <PropagateLoader color="#1c5738" />
            )}
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
