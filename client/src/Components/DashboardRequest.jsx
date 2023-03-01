import React, { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

function DashboardRequest() {
  const Axios = axios.create({ baseURL: 'http://localhost:3001' });
  const [requestArray, setRequestArray] = useState();

  useEffect(() => {
    Axios.get('/vdv/pending').then((res) => {
      setRequestArray(res.data);
    });
  }, [requestArray]);

  const changeStatus = (id) => {
    Axios.put(`/vdv/status/${id}`).then(() => {
      window.alert('Entidad aprobada');
      Axios.get('/vdv/pending').then((res) => {
        setRequestArray(res.data);
      });
    });
  };

  const disapproveEntity = (id) => {
    Axios.delete(`/vdv/${id}`).then(() => {
      window.alert('La entidad ha sido borrada');
      Axios.get('/vdv/pending').then((res) => {
        setRequestArray(res.data);
      });
    });
  };

  const requestRender = (req) => {
    return (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {/* {req.cbu && 'Solicitud cambio de cbu'} */}
              'Solicitud nueva entidad'
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {`Nombre: ${req.name}`}
          <br></br>
          {req.mail && (
            <>
              {`E-mail: ${req.mail}`}
              <br />
            </>
          )}
          {req.cbu && (
            <>
              {`CBU: ${req.cbu}`}
              <br />
            </>
          )}
          {req.address && (
            <>
              {`Dirección: ${req.address}`}
              <br />
            </>
          )}
          {req.description && (
            <>
              {`Descripción: ${req.description}`}
              <br />
            </>
          )}
          Materiales:
          {req.Materials && (
            <>
              {req.Materials.map((mat) => (
                <p>{mat.name}</p>
              ))}
              <br />
            </>
          )}
          {req.img && (
            <>
              <Image src={req.img} />
              <br />
            </>
          )}
          <Button onClick={() => changeStatus(req.id)}>
            <CheckIcon />
          </Button>
          <Button onClick={() => disapproveEntity(req.id)}>
            <DeleteIcon />
          </Button>
        </AccordionPanel>
      </AccordionItem>
    );
  };
  return (
    <Accordion w="40vw">
      {requestArray?.map((req) => requestRender(req))}
    </Accordion>
  );
}

export default DashboardRequest;
