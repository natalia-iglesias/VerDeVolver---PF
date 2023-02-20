import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import EntityCard from '../components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../Components/AsideFilters';
import { useEffect } from 'react';
import { fetchEntities, getMaterials } from '../redux/actions/entitiesActions';
import { fetchEntities } from '../redux/actions/entitiesActions';
import { Button } from '@chakra-ui/react';

const Entities = () => {
  const { entities, isLoading, filterbymaterial } = useSelector(
    (state) => state.entitiesReducer
  );
  const dispatch = useDispatch();

  console.log(entities);

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchEntities());
  }

  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());
  }, [dispatch]);

  let filters = filterbymaterial;

  if (filters.length === 0) filters = entities;

  return (
    <VStack mx="1rem">
      <SearchBar />
      <Button
        colorScheme="green"
        size="sm"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all
      </Button>
      <Grid templateColumns="1fr 4fr">
        <GridItem>
          <AsideFilters />
        </GridItem>
        <GridItem>
          <VStack spacing="4">
            {isLoading ? (
              <PropagateLoader color="#1c5738" />
            ) : (
              filters.map((e) => <EntityCard key={e.id} entity={e} />)
            )}
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
