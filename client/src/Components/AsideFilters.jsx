import axios from 'axios';
import { VStack, Select, Badge, useColorMode, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterEntitiesByMaterial,
  listOfMaterialsToFilter,
} from '../redux/actions/entitiesActions.js';

//axios.defaults.baseURL = 'http://localhost:3001/'

const AsideFilters = ({ filters, setPage, setInput }) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const { materials, listOfMaterialsToFilterState, entities } = useSelector(
    (state) => state.entitiesReducer
  );

  const handleClikMaterials = (e) => {
    const newFilters = filters.filter((ent) => {
      return ent.Materials.some((mat) => mat.name === e.target.value);
    });
    if (newFilters.length == 0) return window.alert('No hubo coincidencias');
    listOfMaterialsToFilterState.push(e.target.value);
    dispatch(filterEntitiesByMaterial(newFilters));

    dispatch(listOfMaterialsToFilter(listOfMaterialsToFilterState));
    setPage(1);
    setInput(1);
  };

  const handleRanking = (e) => {
    if (e.target.value !== 'none') {
      axios
        .post('http://localhost:3001/feedback/rating', {
          order: 'Ascendente',
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent2) => {
            filters.forEach((ent1) => {
              ent1.name === ent2.name && newFilters.push(ent1);
            });
          });

          dispatch(filterEntitiesByMaterial(newFilters));
        });
    } else {
      axios
        .post('http://localhost:3001/feedback/rating', {
          order: 'Descendente',
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent1) => {
            filters.forEach((ent2) => {
              if (ent1.name === ent2.name) newFilters.push(ent2);
            });
          });
          dispatch(filterEntitiesByMaterial(newFilters));
          setPage(1);
          setInput(1);
        });
    }
    document.getElementById('select_ranking').selectedIndex = 0;
  };

  const deleteMaterialFilter = (e) => {
    const otherFilters = listOfMaterialsToFilterState.filter(
      (mat) => mat !== e.target.value
    );
    const newFilters = entities.filter((ent) => {
      return otherFilters.every((mat) =>
        ent.Materials.some((ent2) => ent2.name === mat)
      );
    });
    dispatch(listOfMaterialsToFilter(otherFilters));
    dispatch(filterEntitiesByMaterial(newFilters));
  };

  return (
    <VStack>
      <Select
        id="select_materials"
        borderWidth="0.2rem"
        borderColor="gray.300"
        placeholder="Selecciona un material"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        //width="-moz-fit-content"
        width="14vw"
        onChange={(e) => handleClikMaterials(e)}
      >
        {materials.map((m, i) => (
          <option key={i} value={m.name}>
            {m.name}
          </option>
        ))}
      </Select>
      {listOfMaterialsToFilterState?.map((mat, i) => {
        return (
          // <Badge key={i} variant="solid" colorScheme="green">
          //   {mat}
          // </Badge>
          <Button
            key={i + 54618641635}
            value={mat}
            onClick={deleteMaterialFilter}
          >
            {mat}
          </Button>
        );
      })}
      <Select
        id="select_ranking"
        borderWidth="0.2rem"
        borderColor="gray.300"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        onClick={(e) => {
          handleRanking(e);
        }}
        //width="-moz-fit-content"
        width="14vw"
      >
        <option value="none">Puntuación</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
