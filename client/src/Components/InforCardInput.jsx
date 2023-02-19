import React, { useState } from 'react';
import { Flex, Card, CardBody, Text, Button, Input } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function InfoCardInput({
  name,
  mail,
  password,
  adress,
  cbu,
  setInput,
  setSaveButton,
}) {
  const [textOrInput, setTextOrInput] = useState('text');
  let data;
  let inputName;
  if (name) {
    data = name;
    inputName = 'name';
  }
  if (mail) {
    data = mail;
    inputName = 'mail';
  }
  if (password) {
    data = password;
    inputName = 'password';
  }
  if (adress) {
    data = adress;
    inputName = 'adress';
  }
  if (cbu) {
    data = cbu;
    inputName = 'cbu';
  }

  const onChange = (e) => {
    setInput((prevObj) => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
    setSaveButton(true);
  };

  const modifyText = () => {
    setTextOrInput('input');
  };
  return (
    <Flex direction="row">
      <Card w="20vw">
        <CardBody>
          {textOrInput === 'text' && <Text>{data}</Text>}{' '}
          {textOrInput === 'input' && (
            <Input
              name={inputName}
              value={data}
              onChange={(e) => onChange(e)}
            />
          )}
        </CardBody>
      </Card>
      <Button onClick={modifyText} mt="2vh">
        <EditIcon />
      </Button>
    </Flex>
  );
}

export default InfoCardInput;
