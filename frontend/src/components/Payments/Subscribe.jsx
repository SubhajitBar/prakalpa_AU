import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { enrollment, enrollmentVerification } from '../../redux/actions/course';
import { loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import Loader from "../Layout/Loader/Loader";


const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { course,error, message, loading } = useSelector(state => state.enroll);
  const {error:courseError} = useSelector(state=>state.course)

  const subscribeHandler = async () => {

    await dispatch(enrollmentVerification(params.id))
   setTimeout(()=>{
    dispatch(loadUser());
   },500)
    
  };

  useEffect(() => {
    document.title = 'Prakalpa - Enroll';
    if(error){
      toast.error(error);
      dispatch({type : "clearError"});
    }
    if(courseError){
      toast.error(courseError);
      dispatch({type : "clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type: "clearMessage"});
    }
    
    dispatch(enrollment(params.id));
  }, [dispatch,courseError,error, message, params.id]);


  if (user.enrolledProjectId === params.id )
  {
   return <Navigate to={`/project/${params.id}`} />;
 }

  return (
      loading?<Loader/>:(
        <Container h={'100%'} py="10">
          <Heading children="Welcome" my={'8'} textAlign={'center'} />
          <VStack
            boxShadow={'lg'}
            alignItems="stretch"
            spacing="0"
            borderRadius={'lg'}
          >
            <Box
              background={'green.400'}
              p={'4'}
              css={{ borderRadius: '8px 8px 0 0' }}
            >
              <Text>Project Description</Text>
            </Box>

            <Box p="4">
              <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
                <Heading size="md" children={course.title} />
                <Text children={course.description} />
              </VStack>

              <Button
                my="8"
                w="full"
                colorScheme={'whatsapp'}
                onClick={subscribeHandler}
                isLoading={loading}
              >
                Enroll Now
              </Button>
            </Box>

            <Box
              bg="blackAlpha.600"
              p="4"
              css={{ borderRadius: '0 0 8px 8px' }}
            >
              <Heading
                color={'white'}
                textTransform="uppercase"
                size="sm"
                children={'Cancellation Policy'}
              />

              <Text
                fontSize={'xs'}
                color="white"
                children={'*Terms & Conditions Apply'}
              />
            </Box>
          </VStack>

    </Container>
      )
  );
};

export default Subscribe;
