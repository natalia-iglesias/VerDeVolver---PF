import React from 'react';
import { Flex } from '@chakra-ui/react';

function MarkerInfo({ data }) {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <img src={data.img} alt={data.name} width="50px" height="50px" />
      <Flex>
        {data.Materials.map((mat, index) => (
          <p key={index}>{`${mat.name}--`}</p>
        ))}
      </Flex>
    </div>
  );
}

export default MarkerInfo;
