import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Divider,
  Link,
  Button,
} from '@chakra-ui/react';
import { StarIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link as ReachLink } from 'react-router-dom';

function DashboardScroll({ type, id }) {
  const [arrayToRender, setArrayToRender] = useState();
  const [deleteFeedbackIcon, setdeleteFeedbackIcon] = useState();
  const Axios = axios.create({ baseURL: 'http://localhost:3001' });
  useEffect(() => {
    switch (type) {
      case 'userDonation':
        Axios.get(`/donation/user/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.User = false));
          setArrayToRender(res.data);
        });
        break;
      case 'userService':
        Axios.get(`/service/user/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.User = false));
          setArrayToRender(res.data);
        });
        break;
      case 'entityDonation':
        Axios.get(`/donation/vdv/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.VdV = false));
          setArrayToRender(res.data);
        });
        break;
      case 'allDonation':
        Axios.get(`/donation`).then((res) => {
          res.data.forEach((obj) => (obj.VdV = false));
          setArrayToRender(res.data);
        });
        break;
      case 'feedback':
        Axios.get(`/feedback`).then((res) => {
          setdeleteFeedbackIcon(true);
          setArrayToRender(res.data);
        });
        break;
      case 'userFeedback':
        Axios.get(`/feedback/user/${id}`).then((res) => {
          setdeleteFeedbackIcon(true);
          setArrayToRender(res.data);
        });
        break;
      case 'vdvFeedback':
        Axios.get(`/feedback/vdv/${id}`).then((res) => {
          setdeleteFeedbackIcon(true);
          setArrayToRender(res.data);
        });
        break;
      case 'allServices':
        Axios.get(`/service`).then((res) => {
          res.data.forEach((obj) => (obj.VdV = false));
          setArrayToRender(res.data);
        });
        break;
    }
  }, [type, id]);

  const deleteFeedback = (id) => {
    Axios.delete(`/feedback/${id}/delete`).then(() => {
      window.alert('La reseña fue borrada');
      Axios.get(`/feedback`).then((res) => {
        res.data.forEach((obj) => (obj.VdV = false));
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
      });
    });
  };

  return (
    <Box w="40vw" h="40vh" overflow="auto">
      <Flex overflowY="scroll" flexDirection="column" gap={'1rem'}>
        {arrayToRender?.map((item, i) => {
          let stars;
          if (item.rating) {
            stars = new Array(item.rating).fill(<StarIcon />);
          }

          return (
            <div key={i}>
              <Flex direction="row">
                <Card w="full">
                  <CardBody>
                    <Text>
                      {item.name && `${item.name} /`}
                      {item.amount && `$${item.amount} /`}
                      {item.User && `${item.User.name} ${item.User.last_name}/`}
                      {item.date && `${item.date} /`}
                      {item.VdV && (
                        <Link as={ReachLink} to={`/entitie/${item.VdVId}`}>
                          {item.VdV.name}
                        </Link>
                      )}

                      {item.serviceType && `${item.serviceType} /`}
                      {item.content && item.content}
                    </Text>
                    {item.rating && stars}
                  </CardBody>
                </Card>
                {deleteFeedbackIcon && (
                  <Button onClick={() => deleteFeedback(item.id)}>
                    <DeleteIcon />
                  </Button>
                )}
              </Flex>
              <Divider />
            </div>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DashboardScroll;
