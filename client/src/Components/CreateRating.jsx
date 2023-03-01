import { HStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const CreateRating = () => {
  const [stars, setStars] = useState(1);
  const settingNumberOfStars = (event) => {
    setStars(event.target.value);
    console.log('value', event.target.value);
    console.log('stars', stars);
  };

  return (
    <HStack spacing={'2'}>
      {[...Array(5)].map((n, i) =>
        i <= stars ? (
          <Button
            name="Stars"
            value={i}
            onClick={(e) => settingNumberOfStars(e)}
          >
            <AiFillStar key={i.toString()} />
          </Button>
        ) : (
          <Button
            name="Stars"
            value={i}
            onClick={(e) => settingNumberOfStars(e)}
          >
            <AiOutlineStar key={i} />
          </Button>
        )
      )}
      <Text>{stars}</Text>
    </HStack>
  );
};

export default CreateRating;
