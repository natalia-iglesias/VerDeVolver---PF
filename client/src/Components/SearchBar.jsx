import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [entityName, setEntityName] = useState('');

  useEffect(() => {
    //entityName && dispatch(getEntityByName(entityName))
  }, [entityName]);

  const handleChange = (ev) => {
    setEntityName(ev.target.value);
  };

  const handleClick = () => {
    //entityName && dispatch(getEntityByName(entityName))
  };

  return (
    <InputGroup>
      <Input
        placeholder="Entidad VdV"
        type="text"
        value={entityName}
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
