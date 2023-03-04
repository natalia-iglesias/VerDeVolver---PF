import { useDispatch } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, Box, Button } from '@chakra-ui/react';
import {
  searchEntities,
  filterEntitiesByMaterial,
} from '../redux/actions/entitiesActions';

const SearchBar = ({ entities, setPage, setInput, setSearch, search }) => {
  let dispatch = useDispatch();

  const handleClick = (e) => {
    const newFilters = entities.filter((ent) => {
      console.log(typeof ent.name);
      console.log(e);

      return ent.name.toUpperCase().includes(e.target.value.toUpperCase());
    });
    if (newFilters.length === 0)
      return window.alert('No se encontró ninguna entidad con ese nombre');
    dispatch(filterEntitiesByMaterial(newFilters));
    setInput(1);
    setPage(1);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchEntities(e.target.value));
  };

  const handleKeyDown = (e) => e.keyCode === 13 && handleClick(e);

  return (
    <Box>
      <InputGroup>
        <Input
          placeholder="Entidad VdV"
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      <IconButton
        value={search}
        colorScheme={'green'}
        onClick={handleClick}
        icon={SearchIcon}
      />
      <Button value={search} colorScheme={'green'} onClick={handleClick}>
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
