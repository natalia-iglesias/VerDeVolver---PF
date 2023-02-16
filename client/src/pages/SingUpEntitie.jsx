import { materials } from '../db.json';

import {
  FormControl,
  FormLabel,
  Input,
  // FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
  Textarea,
  Button,
  GridItem,
  Grid,
} from '@chakra-ui/react';

const SingUpEntitie = () => {
  // const [form, setForm] = useState({
  //   name: '',
  //   email: '',
  //   adress: '',
  //   image: '',
  //   cbu: '',
  //   alias: '',
  //   material: [],
  //   description: '',
  // });

  return (
    <FormControl isRequired>
      <FormLabel>Nombre</FormLabel>
      <Input type="name" />
      <FormLabel>Email</FormLabel>
      <Input type="email" />
      <FormLabel>Dirección</FormLabel>
      <Input type="adress" />
      <FormLabel>Imagen</FormLabel>
      <Input type="image" />
      <FormLabel requiredIndicator>CBU</FormLabel>
      <Input type="cbu" />
      <FormHelperText>
        Completa este campo si estás de acuerdo en recibir donaciones.
      </FormHelperText>
      <FormLabel requiredIndicator>Alias</FormLabel>
      <Input type="alias" />
      <FormLabel>Materiales Reciclables</FormLabel>
      <RadioGroup defaultValue="Paper">
        <HStack>
          <Grid templateColumns="repeat(4, 7fr)" gap={6}>
            {materials?.map((m, i) => (
              <GridItem key={i} w="100%" h="10" width={'auto'}>
                <Radio key={i} colorScheme="green">
                  {m}
                </Radio>
              </GridItem>
            ))}
          </Grid>
        </HStack>
      </RadioGroup>
      <FormHelperText>
        Selecciona únicamente los materiales que recibirás.
      </FormHelperText>
      <FormLabel>Descripción</FormLabel>
      <Textarea placeholder="Ingresa una descripción..." />
      <Button colorScheme="green" type="submit">
        Enviar
      </Button>
    </FormControl>
  );
};

export default SingUpEntitie;
