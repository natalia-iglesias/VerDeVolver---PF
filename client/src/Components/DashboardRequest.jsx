import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

function DashboardRequest() {
  /*  const axios = axios.create({
    baseURL: 'https://verdevolver-pf-production.up.railway.app/',
  }); */
  const [requestArray, setRequestArray] = useState();
  const toast = useToast();

  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = () => {
    axios.get('/vdv/pending').then((res) => {
      axios.get('/cbuRequest').then((res2) => {
        setRequestArray([...res.data, ...res2.data]);
      });
    });
  };

  const changeStatus = (id) => {
    try {
      axios.put(`/vdv/status/${id}`).then(() => {
        toast({
          title: 'Aprobada',
          description: 'La entidad ha sido aprobada',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
        getDataBase();
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al aprobar la entidad',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const disapproveEntity = (id) => {
    axios.delete(`/vdv/${id}`).then(() => {
      try {
        toast({
          title: 'Borrado exitoso',
          description: 'La entidad ha sido borrada exitosamente',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
        getDataBase();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Ha ocurrido un error al borrar la entidad',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      }
    });
  };

  const approveCbu = (id, cbu, idVdV) => {
    axios.put(`/vdv/${idVdV}`, { cbu }).then(() => {
      axios.delete(`/cbuRequest/${id}?idVdV=${idVdV}&cbu=${cbu}`).then(() => {
        try {
          toast({
            title: 'CBU aprovado',
            description: 'el cambio de CBU ha sido aprobado',
            status: 'success',
            duration: 1500,
            isClosable: true,
          });

          getDataBase();
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Ha ocurrido un error al actualizar el CBU',
            status: 'error',
            duration: 1500,
            isClosable: true,
          });
        }
      });
    });
  };

  const disapproveCbu = (id) => {
    axios.delete(`/cbuRequest/${id}?status=disapproved`).then(() => {
      toast({
        title: 'CBU no aprovado',
        description: 'el cambio de CBU NO ha sido aprobado',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });

      getDataBase();
    });
  };

  const requestRender = (req, i) => {
    return (
      <AccordionItem key={i + 5648}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {req.vdvName ? (
                <p>Solicitud de cambio de cbu</p>
              ) : (
                <p>Solicitud de nueva entidad</p>
              )}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <p>Nombre: </p>
          {req.name && req.name}
          {req.vdvName && req.vdvName}
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
          {req.name && <p>Materiales: </p>}
          {req.Materials && (
            <>
              {req.Materials.map((mat, i) => (
                <p key={`${i + 1673}`}>{mat.name}</p>
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
          <Button
            onClick={
              req.vdvName
                ? () => approveCbu(req.id, req.cbu, req.idVdV)
                : () => changeStatus(req.id)
            }
          >
            <CheckIcon />
          </Button>
          <Button
            onClick={
              req.vdvName
                ? () => disapproveCbu(req.id)
                : () => disapproveEntity(req.id)
            }
          >
            <DeleteIcon />
          </Button>
        </AccordionPanel>
      </AccordionItem>
    );
  };
  return (
    <Accordion w="40vw">
      {requestArray?.map((req, i) => requestRender(req, i))}
    </Accordion>
  );
}

export default DashboardRequest;
