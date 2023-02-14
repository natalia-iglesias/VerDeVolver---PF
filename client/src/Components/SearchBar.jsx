import { Select } from '@chakra-ui/react';

const SearchBar = () => {
  return (
    <Select
      placeholder="Selecciona una opción"
      bg="green"
      borderColor="green"
      color="white"
    >
      <option value="option1">Entidad VdV 1</option>
      <option value="option2">Entidad VdV 2</option>
      <option value="option3">Entidad VdV 3</option>
    </Select>
  );
};
