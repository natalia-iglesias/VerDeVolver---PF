import React from 'react';
import {
  Text,
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Link,
  Image,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';

function RenderDevCard({ dev }) {
  const { colorMode } = useColorMode();
  const { name, img, linkedin, ig, mail } = dev;
  return (
    <Card
      bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
      //border="solid 3px"
      boxShadow="2xl"
      fontFamily="lato"
      w="20%"
      m="1vh"
      h="45vh"
      p="0.5rem"
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Image
        src={img}
        alt="Dev Photo"
        borderRadius="full"
        boxSize="100px"
        m="auto"
      />
      <CardHeader m="1px" p="1px" align="center">
        <Heading size="md">{name}</Heading>
      </CardHeader>

      <CardBody mt="1px">
        <Stack divider={<StackDivider />} spacing="1">
          <Link href={ig} isExternal m="auto">
            Instagram <ExternalLinkIcon mx="2px" />
          </Link>
          <Link href={linkedin} isExternal m="auto">
            LinkedIn <ExternalLinkIcon mx="2px" />
          </Link>
          <Text pt="2" fontSize="md" m="auto">
            {mail} <CopyIcon mx="2px" />
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RenderDevCard;
