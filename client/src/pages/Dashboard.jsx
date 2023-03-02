import React, { useEffect, useState } from 'react';
import { Flex, Heading, Select } from '@chakra-ui/react';
import TabListPosts from '../Components/TabListPosts';
import OverflowScroll from '../Components/OverflowScroll';
import DashboardRequest from '../Components/DashboardRequest';
import axios from 'axios';

const Dashboard = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [feedbackId, setFeedbackId] = useState();
  const [feedbackVdVFilters, setFeedbackVdVFilters] = useState();
  const [feedbackUsersFilters, setFeedbackUsersFilters] = useState();
  let feedbackVdVs = [];
  let feedbackUsers = [];
  const Axios = axios.create({ baseURL: 'http://localhost:3001' });

  useEffect(() => {
    Axios.get(`/feedback`).then((res) => {
      res.data.forEach((feed) => {
        if (!feedbackUsers.some((f) => f.User.name === feed.User.name))
          feedbackUsers.push(feed);
        if (!feedbackVdVs.some((f) => f.VdV.name === feed.VdV.name))
          feedbackVdVs.push(feed);
      });
      setFeedbackUsersFilters([...feedbackUsers]);
      setFeedbackVdVFilters([...feedbackVdVs]);
    });
  }, []);

  const userSearch = (event) => {
    if (event.target.value === 'none') {
      setFeedbackType('feedback');
    } else {
      setFeedbackType('userFeedback');
      setFeedbackId(event.target.value);
    }
  };

  const vdvSearch = (event) => {
    if (event.target.value === 'none') {
      setFeedbackType('feedback');
    } else {
      setFeedbackType('vdvFeedback');
      setFeedbackId(event.target.value);
    }
  };

  const renderOverFlow = () => {
    return <OverflowScroll type={feedbackType} id={feedbackId} />;
  };

  return (
    <Flex direction="row" justify="space-evenly">
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        {renderOverFlow()}
        <Select onClick={vdvSearch}>
          <option value="none">Entidades</option>
          {feedbackVdVFilters?.map((vdv, i) => {
            return (
              <option key={i} value={vdv.VdVId}>
                {vdv.VdV.name}
              </option>
            );
          })}
        </Select>
        <Select onClick={userSearch}>
          <option value="none">Usuarios</option>
          {feedbackUsersFilters?.map((user, i) => {
            return (
              <option key={i} value={user.UserId}>
                {user.User.name}
              </option>
            );
          })}
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
        <OverflowScroll type="allDonation" />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <OverflowScroll type="allServices" />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
