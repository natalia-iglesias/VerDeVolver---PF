import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import {
  searchEntities,
  filterEntitiesByMaterial,
} from '../redux/actions/entitiesActions';

const SearchBar = ({ filters, setPage, setInput }) => {
  const [search, setSearch] = useState('');
  let dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    const newFilters = filters.filter((ent) =>
      ent.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    dispatch(filterEntitiesByMaterial(newFilters));
    setInput(1);
    setPage(1);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleClick(e);
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <InputGroup>
      <Input
        placeholder="Entidad VdV"
        type="text"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        colorScheme={'green'}
        icon={<SearchIcon />}
        onClick={handleClick}
      />
    </InputGroup>
  );
};

export default SearchBar;
