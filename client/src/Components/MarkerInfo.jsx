import React from 'react';
import { Flex, Text, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function MarkerInfo({ data }) {
  return (
    <div>
      <Text fontSize="2xl">{data.name}</Text>
      <p>{data.description}</p>
      <img src={data.img} alt={data.name} width="100vw" height="100vh" />
      <Flex>
        {data.Materials.map((mat, i) => (
          <Badge
            key={i}
            variant="solid"
            colorScheme="green"
            w="5vw"
            align="center"
            borderRadius="2px"
            m="1vw"
          >
            {mat.name}
          </Badge>
        ))}
      </Flex>
      <Link to={`/entitie/${data.id}`}>Detalles de la entidad</Link>
    </div>
  );
}

export default MarkerInfo;
