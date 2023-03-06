import React, { useEffect, useState } from 'react';
import { Flex, Heading, Select, Box, Button } from '@chakra-ui/react';
import TabListPosts from '../../Components/TabListPosts';
import OverflowScroll from '../../Components/OverFlowScroll/OverflowScroll';
import DashboardRequest from '../../Components/DashboardRequest';
import {
  setDataToRender,
  userSearchFeedback,
  vdvSearchFeedback,
  userSearchDonation,
  vdvSearchDonation,
  optionsSelectArray,
} from './DashboardFunctions';

const Dashboard = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [feedbackId, setFeedbackId] = useState(['all', 'all']);
  const [feedbackVdVFilters, setFeedbackVdVFilters] = useState();
  const [feedbackUsersFilters, setFeedbackUsersFilters] = useState();
  const [donationType, setDonationType] = useState('donation');
  const [donationId, setDonationId] = useState(['all', 'all']);
  const [donationVdVFilters, setDonationVdVFilters] = useState();
  const [donationUsersFilters, setDonationUsersFilters] = useState();
  const [pendingOrDelivered, setPendingOrDelivered] = useState('Pending');

  useEffect(() => {
    setDataToRender(
      setDonationUsersFilters,
      setDonationVdVFilters,
      setFeedbackUsersFilters,
      setFeedbackVdVFilters
    );
  }, []);

  const renderOverFlowFeedback = () => {
    return <OverflowScroll type={feedbackType} id={feedbackId} />;
  };

  const renderOverFlowDonation = () => {
    return (
      <OverflowScroll
        type={donationType}
        id={donationId}
        pendingOrDelivered={pendingOrDelivered}
      />
    );
  };

  const viewStatusDonation = (status) => {
    setPendingOrDelivered(status);
  };

  return (
    <Flex direction="row" justify="space-evenly" mb={'5rem'}>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        {renderOverFlowFeedback()}
        <Select
          onClick={(event) =>
            vdvSearchFeedback(event, setFeedbackType, setFeedbackId)
          }
        >
          <option value="none">Entidades</option>
          {optionsSelectArray(feedbackVdVFilters, 'vdv')}
        </Select>
        <Select
          onClick={(event) =>
            userSearchFeedback(event, setFeedbackType, setFeedbackId)
          }
        >
          <option value="none">Usuarios</option>
          {optionsSelectArray(feedbackUsersFilters)}
        </Select>
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
        {renderOverFlowDonation()}
        <Select
          onClick={(event) =>
            vdvSearchDonation(event, setDonationType, setDonationId)
          }
        >
          <option value="none">Entidades</option>
          {optionsSelectArray(donationVdVFilters, 'vdv')}
        </Select>
        <Select
          onClick={(event) =>
            userSearchDonation(event, setDonationType, setDonationId)
          }
        >
          <option value="none">Usuarios</option>
          {optionsSelectArray(donationUsersFilters)}
        </Select>
        <Button onClick={() => viewStatusDonation('Pending')}>
          Pendientes
        </Button>
        <Button onClick={() => viewStatusDonation('Delivered')}>
          Entregadas
        </Button>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
