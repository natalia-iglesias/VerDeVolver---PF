import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import EntityCard from '../components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../Components/AsideFilters';
import { useEffect } from 'react';
import {
  fetchEntities,
  getMaterials,
  // filterByMaterials,
} from '../redux/actions/entitiesActions';
import { Button } from '@chakra-ui/react';

const Entities = () => {
  // const [update, setUpdate] = useState(0);
  const { filteredEntities, isLoading } = useSelector(
    (state) => state.entitiesReducer
  );
  const dispatch = useDispatch();
  console.log(filteredEntities);
  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchEntities());
  }

  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());
  }, []);

  // let filters = filterbymaterial;
  // if (filters.length === 0) filters = entities;

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
              filteredEntities?.map((e) => {
                return <EntityCard key={e.id} entity={e} />;
              })
            )}
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
