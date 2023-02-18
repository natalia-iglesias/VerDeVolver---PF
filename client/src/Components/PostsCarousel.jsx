import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';
import IgPost from './Post';
import ItemsCarousel from 'react-items-carousel';

const PostsCarousel = () => {
  const posts = [
    { user: 'hannahbronfman', url: 'https://picsum.photos/200' },
    { user: 'jvn', url: 'https://picsum.photos/200' },
    { user: 'chrisburkard', url: 'https://picsum.photos/200' },
    { user: 'joansmalls', url: 'https://picsum.photos/200' },
    { user: 'juliamichaels', url: 'https://picsum.photos/200' },
  ];

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<IconButton icon={<AiOutlineArrowLeft />} />}
        rightChevron={<IconButton icon={<AiOutlineArrowRight />} />}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {posts?.map(({ user, url }, index) => (
          <IgPost user={user} url={url} key={index} />
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default PostsCarousel;
