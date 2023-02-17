import { useSelector } from 'react-redux';
import { Button, Input, InputGroup, Select, Stack } from '@chakra-ui/react';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  return (
    <Stack p={'4'}>
      <InputGroup>
        <Select placeholder="Entidad a donar">
          {entities?.map(({ uuid, name }) => (
            <option key={uuid}>{name}</option>
          ))}
        </Select>
        <Input placeholder="Monto" type="number" />
      </InputGroup>
      <Button color={'vdv.main'} colorScheme="green">
        Donar
      </Button>
    </Stack>
  );
};

export default Home;
