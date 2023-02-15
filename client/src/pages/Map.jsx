import React from 'react';
import { Box, Flex, Image, Select } from '@chakra-ui/react';
import { materials } from '../db.json';
import { useState } from 'react';

const Map = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('');

  return (
    <Flex justifyContent="center">
      <Flex justifyContent="space-between">
        <Select
          borderColor="green"
          value={selectedMaterial}
          onChange={(event) => setSelectedMaterial(event.target.value)}
        >
          <option value="">Select a material</option>
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </Select>
      </Flex>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mr={'10rem'}
      >
        <Image
          boxSize="600px"
          src="https://mundogeo.com/wp-content/uploads/2015/07/google-maps-interface1.jpg"
          alt="placeholder"
        />
      </Box>
    </Flex>
  );
};

export default Map;
