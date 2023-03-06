import { useEffect, useState } from 'react';

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
import typeOfDataToRender from './OverFlowScrollFunctions';
import axios from 'axios';
//axios.defaults.baseURL = 'https://verdevolver-pf-production.up.railway.app/';
axios.defaults.baseURL = 'http://localhost:3001/';

function DashboardScroll({ type, id }) {
  const [arrayToRender, setArrayToRender] = useState();
  const [deleteFeedbackIcon, setdeleteFeedbackIcon] = useState();
  const axios = axios.create({ baseURL });

  useEffect(() => {
    typeOfDataToRender(type, id, setArrayToRender, setdeleteFeedbackIcon);
  }, [type, id]);

  const deleteFeedback = (id) => {
    axios.delete(`/feedback/${id}/delete`).then(() => {
      window.alert('La reseña fue borrada');
      axios.get(`/feedback`).then((res) => {
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
            stars = new Array(item.rating)
              .fill()
              .map((_, index) => <StarIcon key={`star-${index}`} />);
          }

          return (
            <div key={i + 94652}>
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
                    <Divider m="0.5rem" />
                    {item.comment && item.comment}
                    <Divider m="0.5rem" />
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
