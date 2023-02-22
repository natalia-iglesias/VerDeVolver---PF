import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import EntityCard from '../components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../Components/AsideFilters';
import { useEffect, useState } from 'react';
import {
  fetchEntities,
  getMaterials,
  // filterByMaterials,
} from '../redux/actions/entitiesActions';
import { Button } from '@chakra-ui/react';
import Paginated from '../Components/Paginated';

const Entities = () => {
  const [page, setPage] = useState(1);
  const byPage = 5;
  // const [update, setUpdate] = useState(0);

  const [update, setUpdate] = useState(0);
  const { entities, isLoading, filteredEntities } = useSelector(
    (state) => state.entitiesReducer
  );
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchEntities());
  }

  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());
  }, [dispatch]);

  let filters = filteredEntities;
  if (filters.length === 0) filters = entities;

  const max = Math.ceil(filters.length / byPage);

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
        Recargar entidades
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
              filters
                .slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                .map((e) => <EntityCard key={e.id} entity={e} />)
            )}
          </VStack>
          <Paginated page={page} setPage={setPage} max={max} />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
