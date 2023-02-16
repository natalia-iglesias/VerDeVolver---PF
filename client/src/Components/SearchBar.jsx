import { materials } from '../db.json';
import { fetchEntities } from '../redux/actions/entitiesActions';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, Select } from '@chakra-ui/react';

const SearchBar = () => {
  const [entityName, setEntityName] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [rankingSort, setRankingSort] = useState('-1');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEntities(entityName, materialFilter, rankingSort));
  }, [dispatch]);

  const handleInputChange = (ev) => {
    setEntityName(ev.target.value);
  };

  const onClickHandler = () => {
    dispatch(fetchEntities(entityName, materialFilter, rankingSort));
  };
  const handleMaterialChange = (ev) => {
    setMaterialFilter(ev.target.value);
  };
  const handleRankingChange = (ev) => {
    setRankingSort(ev.target.value);
  };
  return (
    <InputGroup m={'4'}>
      <Input
        placeholder="Entidad VdV"
        type="text"
        value={entityName}
        onChange={handleInputChange}
        width="800"
      />

      <Select
        placeholder="Selecciona un material"
        width="-moz-fit-content"
        onChange={handleMaterialChange}
      >
        {materials.map((element, i) => (
          <option key={i}>{element}</option>
        ))}
      </Select>
      <Select
        placeholder="Puntuación"
        onChange={handleRankingChange}
        width="-moz-fit-content"
      >
        <option>Ascendente</option>
        <option>Descendente</option>
      </Select>

      <IconButton
        colorScheme={'green'}
        icon={<SearchIcon />}
        onClick={onClickHandler}
      />
    </InputGroup>
  );
};

export default SearchBar;
