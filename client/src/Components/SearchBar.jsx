import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { searchEntities } from '../redux/actions/entitiesActions';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  let dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(searchEntities(search));
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
