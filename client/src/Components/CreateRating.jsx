import { HStack, Text, Button } from '@chakra-ui/react';
import { StarIcon, AddIcon } from '@chakra-ui/icons';

const CreateRating = ({stars, setStars}) => {

  const numberOfStars = (value) => {
    if (value + 1 !== stars) {
      setStars(value + 1);
    }
  };

  return (
    <HStack spacing={'2'}>
      {[...Array(5)].map((n, i) => (
        <Button key={i} onClick={() => numberOfStars(i)}>
          {i <= stars - 1 ? <StarIcon /> : <AddIcon />}
        </Button>
      ))}
      <Text>{stars}</Text>
    </HStack>
  );
};

export default CreateRating;

