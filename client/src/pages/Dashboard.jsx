import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import TabListPosts from '../Components/TabListPosts';
import DashboardScroll from '../Components/DashboardScroll';
import DashboardRequest from '../Components/DashboardRequest';

const Dashboard = () => {
  return (
    <Flex direction="row" justify="space-evenly">
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        <DashboardScroll type="comment" />
        <Heading align="center" m="3vh">
          Posts
        </Heading>
        <TabListPosts />
        <Heading align="center" m="3vh">
          Solicitudes
        </Heading>
        <DashboardRequest />
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <DashboardScroll type="donation" />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <DashboardScroll type="services" />
      </Flex>
    </Flex>
  );
};

export default Dashboard;

//-------------------------------------------------------------//
