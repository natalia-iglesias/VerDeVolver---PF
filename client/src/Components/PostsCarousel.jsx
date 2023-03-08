import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';
import ItemsCarousel from 'react-items-carousel';
import { InstagramEmbed } from 'react-social-media-embed';

import axios from 'axios';

const PostsCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 20;
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get(`/instagram`).then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <ItemsCarousel
      requestToChangeActive={setActiveItemIndex}
      activeItemIndex={activeItemIndex}
      numberOfCards={1}
      gutter={20}
      leftChevron={<IconButton icon={<AiOutlineArrowLeft />} />}
      rightChevron={<IconButton icon={<AiOutlineArrowRight />} />}
      outsideChevron
      chevronWidth={chevronWidth}
    >
      {posts?.map((pos) => (
        <InstagramEmbed
          url={pos.url}
          key={pos.id}
          style={{ maxHeight: '70vh', maxWidth: '50vh', overflowY: 'scroll' }}
        />
      ))}
    </ItemsCarousel>
  );
};

export default PostsCarousel;
