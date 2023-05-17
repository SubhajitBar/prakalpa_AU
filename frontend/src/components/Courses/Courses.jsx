import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader/Loader';



const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToWishlistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" width={['100%', '35%']} alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize=" 60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description}/>
      <HStack>
        <Text
        fontWeight={'bold'}
        textTransform='uppercase'
        children='creator'
        />
        

        <Text
        fontFamily={'body'}
        textTransform='uppercase'
        children={creator}
        />
       
      </HStack>

      <Heading 
        alignItems={'center'}
        size='sm' 
        children={`Lectures - ${lectureCount}`}
        textTransform='uppercase'
        />
        <Heading 
        size='xs' 
        children={`Views - ${views}`}
        textTransform='uppercase'
        />

        <Stack direction={['column','row']}>
          <Link to={`/project/${id}`}>
            <Button colorScheme='whatsapp'>
              View Details 
            </Button>
          </Link>
          <Button
          isLoading={loading}
          variant={"ghost"}
          colorScheme={"whatsapp"}
          onClick={()=>addToWishlistHandler(id)}
          >
            Add to Bookmark
          </Button>
        </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const categories = [
    'Web Development',
    'AIML',
    'App Development',
    'Cloud Computing',
    'System Designing',
    'Data Science ',
  ];

  const addToWishlistHandler = async (couseId) => {
    
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };


  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    document.title = "Prakalpa - Browse All Projects"
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, category, keyword, error, message]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Projects" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a Projects..."
        type={'text'}
        focusBorderColor="green.400"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'7'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      {

        loading?<Loader/>:(
          <Stack
        direction={['column', 'row']}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
        flexWrap="wrap"
      >
         {courses.length > 0 ? (
          courses.map(item => (
            <Course
              
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToWishlistHandler={addToWishlistHandler}
              loading={loading}
            />
           ))
        ) : (
          <Heading mt="4" children="Project Not Found" />
        )} 
      </Stack>
        )
      }
    </Container>
  );
};

export default Courses;
