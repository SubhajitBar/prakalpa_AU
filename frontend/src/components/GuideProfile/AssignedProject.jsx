import { Avatar, Box, Grid, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledProjectUser } from '../../redux/actions/guideprofile';
import { toast } from 'react-hot-toast';
import Loader from '../Layout/Loader/Loader';


const AssignedProject = ({user}) => {

    const dispatch = useDispatch();
    const {loading,project, enrolledUsers} = useSelector(state=>state.guideprofile)

    useEffect(() => {
      
      document.title = "Prakalpa - Assigned Project Details"
     
      dispatch(getEnrolledProjectUser());

    }, [dispatch])
    
  return (
    <>
    {
      loading?<Loader/>:(
        <Grid minH={'95vh'} templateColumns={['1fr', ' 3fr 1fr']}>
        <Box>           
        <Heading textAlign={"center"}
          children={`${project.title}`}
          m={'4'}
          mt={["","10"]}
        />
        <VStack m={'4'} alignItems={['center',"flex-start"]} >
            <Avatar m={'4'} boxSize={'48'} src={user.avatar.url} />
            <HStack>
                <Text fontWeight={"bold"} fontSize={'1rem'} children={`Project Guide: ` }/>
                <Text fontSize={'1rem'} children={`${project.guide} ` }/>
            </HStack>
        </VStack>
        <Heading m={'4'} fontSize={'1.5rem'} children={"Project Description"}/>
        <Text children={`${project.description}`} m={'4'} />

        <Text m="4" children={""} />
        
      </Box>
          
      <VStack>
        <Heading m={'4'} mt={["10",""]} fontSize={'1.2rem'} children={"Enrolled Students"} />
        {enrolledUsers.map((element, index) => (
          <button
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: '0',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              cursor:'default'
            }}
          >
            <Text noOfLines={1}>
              {index + 1}. {element.name}
            </Text>
          </button>
        ))}
      </VStack>
</Grid>
      )
    }
    </>
  )
}

export default AssignedProject