import { users, materials } from '../db.json';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';

const SearchBar = () => {
  const [entityName, setEntityName] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [rankingSort, setRankingSort] = useState('-1');

  const handleInputChange = (ev) => {
    setEntityName(ev.target.value);
  };

  const onClickHandler = () => {
    console.log('onClickHandler:::', entityName);
    console.log('onClickHandler:::', materialFilter);
    console.log('onClickHandler:::', rankingSort);
    // TODO: llamado a action del redux getEntities(entityName, materialFilter, rankingSort)
  };
  const handleMaterialChange = (ev) => {
    console.log('handleMaterialChange::', ev.target.value);
    setMaterialFilter(ev.target.value);
  };
  const handleRankingChange = (ev) => {
    console.log('handleRankingChange::', ev.target.value);
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
