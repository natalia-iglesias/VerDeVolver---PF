import { HStack, Text } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RankingStars = ({ stars, setStars }) => {
  return (
    <HStack spacing={'2'}>
      {[...Array(5)].map((n, i) =>
        i <= stars - 1 ? (
          <AiFillStar key={i.toString()} />
        ) : (
          <AiOutlineStar key={i} />
        )
      )}
      <Text>{stars}</Text>
    </HStack>
  );
};

export default RankingStars;
