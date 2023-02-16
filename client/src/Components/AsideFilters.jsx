import { materials } from '../db.json';
import { useEffect, useState } from 'react';
import { VStack, Select } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const AsideFilters = () => {
  const dispatch = useDispatch();
  const [materialFilter, setMaterialFilter] = useState('');
  const [rankingSort, setRankingSort] = useState('');

  const handleMaterialChange = (ev) => {
    setMaterialFilter(ev.target.value);
    //dispatch(filterEntitiesByMaterials(ev.target.value));
  };

  const handleRankingChange = (ev) => {
    setRankingSort(ev.target.value);
    //dispatch(sortEntitiesByRanking(ev.target.value));
  };

  return (
    <VStack>
      <Select
        placeholder="Selecciona un material"
        width="-moz-fit-content"
        onChange={handleMaterialChange}
      >
        {materials.map((m, i) => (
          <option key={i} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Puntuación"
        onChange={handleRankingChange}
        width="-moz-fit-content"
      >
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
