//import { useEffect, useState } from 'react';
import { VStack, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEntitiesByMaterial } from '../redux/actions/entitiesActions.js';

const AsideFilters = ({ filters }) => {
  // recibo entidades filtradas
  const dispatch = useDispatch();

  const { materials } = useSelector((state) => state.entitiesReducer);

  const handleClikMaterials = (e) => {
    dispatch(filterEntitiesByMaterial(e.target.value));
  };

  const handleRanking = (e) => {
    console.log('handleRanking', e.target.value);
    //
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
        <option value="1">Ascendente</option>
        <option value="-1">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
