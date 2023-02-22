import axios from 'axios';
import { VStack, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEntitiesByMaterial } from '../redux/actions/entitiesActions.js';

const AsideFilters = ({ filters }) => {
  const dispatch = useDispatch();

  const { materials } = useSelector((state) => state.entitiesReducer);

  const handleClikMaterials = (e) => {
    const newFilters = filters.filter((ent) => {
      return ent.Materials.some((mat) => mat.name === e.target.value);
    });
    dispatch(filterEntitiesByMaterial(newFilters));
  };

  const handleRanking = (e) => {
    if (e.target.value === 'Ascendente') {
      axios
        .post('http://localhost:3001/feedback/rating', {
          order: 'Ascendente',
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent1) => {
            filters.forEach((ent2) => {
              if (ent1.name === ent2.name) newFilters.push(ent2);
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
        });
    }
  };

  return (
    <VStack>
      <Select
        placeholder="Selecciona un material"
        width="-moz-fit-content"
        onChange={(e) => handleClikMaterials(e)}
      >
        {materials.map((m, i) => (
          <option key={i} value={m.name}>
            {m.name}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Puntuación"
        onClick={(e) => handleRanking(e)}
        width="-moz-fit-content"
      >
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
