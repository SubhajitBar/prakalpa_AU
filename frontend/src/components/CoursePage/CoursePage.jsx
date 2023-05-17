import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    document.title = "Prakalpa - Lectures";

    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id,]);



  // if(user.role !== "guide" ){
  //   return <Navigate to={`/guideprofile`} />;
  // }
  
  if (user.role !== 'admin')
  {
    if(( user.enrolledProjectId === undefined || user.enrolledProjectId !== params.id))
        {
          return <Navigate to={`/enrollme/${params.id}`} />;
        }
  }




  return (
    loading?<Loader/>:(
      <Grid minH={'95vh'} templateColumns={['1fr', ' 3fr 1fr']}>
        {
          lectures && lectures.length > 0 ? (
            <>
            <Box>
            

            <Heading textAlign={"center"}
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
              m={'4'}
            />
            <Heading children="Description" m={'4'} />

            <Text m="4" children={`${lectures[lectureNumber].description}`} />
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>
          </Box>
              
          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => {
                  setLectureNumber(index);
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: '0',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
                key={element._id}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
            </>
          ):(
            <VStack justifyContent={"center"}>
              <Heading textAlign={"center"} >No Lectures Found</Heading>
            </VStack>
          )
        }

    </Grid>
    )
  );
};

export default CoursePage;
