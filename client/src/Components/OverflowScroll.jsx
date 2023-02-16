import React from 'react';
import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Button,
  Divider,
  Link,
} from '@chakra-ui/react';
import { StarIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link as ReachLink } from 'react-router-dom';

function DashboardScroll({ type }) {
  let newArray;

  //En esta seccion deberia ir el fetch para pedir los datos y asignarlos a newArray
  if (type == 'donation') newArray = donationArray;
  if (type == 'services') newArray = servicesArray;
  if (type == 'comment') newArray = commentArray;
  return (
    <Box w="40vw" h="40vh" overflow="auto">
      <Flex overflowX="scroll" px={4} py={2} flexDirection="column">
        {newArray.map((item) => {
          let arreglo;
          if (item.rating) {
            arreglo = new Array(item.rating).fill(<StarIcon />);
          }

          return (
            <>
              <Flex direction="row">
                <Card w="90vw">
                  <CardBody>
                    <Text>
                      {item.name && `${item.name} /`}
                      {item.date && `${item.date} /`}
                      {item.entity && (
                        <Link as={ReachLink} to="/entitie/1">
                          {item.entity}
                        </Link>
                      )}
                      {item.serviceType && `${item.serviceType} /`}
                      {item.content && item.content}
                    </Text>
                    {item.rating && arreglo}
                  </CardBody>
                </Card>
                <Button mt="2vh">
                  <DeleteIcon />
                </Button>
              </Flex>
              <Divider />
            </>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DashboardScroll;

const commentArray = [
  {
    content: 'UNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNO',
    rating: 3,
  },
  {
    content: 'DOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOS',
    rating: 1,
  },
  {
    content:
      'TRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRES',
    rating: 5,
  },
];

const donationArray = [
  {
    name: 'Pepito Sanchez',
    date: '22/7/22',
    entity: 'Entidad 1111',
  },
  {
    name: 'Carlos Carlos',
    date: '12/2/21',
    entity: 'Entidad 22222',
  },
  {
    name: 'Shakira',
    date: '4/12/20',
    entity: 'Entidad 333333',
  },
  {
    name: 'Carola Reina',
    date: '8/1/19',
    entity: 'Entidad 22222',
  },
  {
    name: 'Andrea del Boca',
    date: '1/3/23',
    entity: 'Entidad 444444',
  },
];

const servicesArray = [
  {
    name: 'Pepito Sanchez',
    date: '22/7/22',
    serviceType: 'Semanal',
  },
  {
    name: 'Carlos Carlos',
    date: '12/2/21',
    serviceType: 'Individual',
  },
  {
    name: 'Shakira',
    date: '4/12/20',
    serviceType: 'Semanal',
  },
  {
    name: 'Carola Reina',
    date: '8/1/19',
    serviceType: 'Individual',
  },
  {
    name: 'Andrea del Boca',
    date: '1/3/23',
    serviceType: 'Individual',
  },
];
