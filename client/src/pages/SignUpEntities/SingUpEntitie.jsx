import { useState } from 'react';

import Form1 from '../../Components/SignUpEntity/Form1';
import Form2 from '../../Components/SignUpEntity/Form2';
import Form3 from '../../Components/SignUpEntity/Form3';
import { Progress, Box, useColorMode } from '@chakra-ui/react';

const SingUpEntitiePrueba = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const { colorMode } = useColorMode();

  const handleProgressAndStep = (obj) => {
    setStep(obj.step);
    setProgress(progress + obj.progress);
  };
  return (
    <>
      <Box bg={colorMode === 'light' ? '#b4c4ac' : '#212933'} pt="7rem">
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="auto"
          as="form"
          bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
          boxShadow="dark-lg"
        >
          <Progress
            colorScheme="green"
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Form1 setProgressAndStep={handleProgressAndStep} />
          ) : step === 2 ? (
            <Form2 setProgressAndStep={handleProgressAndStep} />
          ) : (
            <Form3 setProgressAndStep={handleProgressAndStep} />
          )}
        </Box>
        <Box h={'22rem'}></Box>
      </Box>
    </>
  );
};
export default SingUpEntitiePrueba;
