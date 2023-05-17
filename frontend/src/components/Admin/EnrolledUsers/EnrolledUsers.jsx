import {
    Box,
    Button,
    Grid,
    Heading,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import cursor from '../../../assets/images/cursor.png';
  import Sidebar from '../Sidebar';
  import EnrollmentModal from './EnrollmentModal';
  import { useDispatch, useSelector } from 'react-redux';
  import { addRegisteredIds, cancelUserEnrollment, deleteRegisteredIds, getAllEnrolledUser, getAllRegisteredIds } from '../../../redux/actions/admin';
  import toast from "react-hot-toast";
  
  const EnrolledUsers = () => {
    const {uIds} = useSelector(state=>state.admin);
    const {loading, user, message, error} = useSelector(state => state.admin);
    const dispatch = useDispatch();
  
    const { isOpen, onClose, onOpen } = useDisclosure();
  
    const idDetailsHandler = () => {
      dispatch(getAllRegisteredIds());
      onOpen();
    };
  
    const cancelEnrollementHandler = (courseId) => {

      dispatch(cancelUserEnrollment(courseId));
    };
  
    const deleteRegIdButtonHandler = async (Id) => {
      await dispatch(deleteRegisteredIds(Id));
      dispatch(getAllRegisteredIds())
    };
  
    const addUserHandler = async (e, regId) => {
      e.preventDefault();
      await dispatch(addRegisteredIds(regId));
      dispatch(getAllRegisteredIds());
    };
  
    useEffect(() => {
      document.title = 'Prakalpa - Enrolled Students';
  
      if(error){
        toast.error(error);
        dispatch({type: "clearError"});
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
  
      dispatch(getAllEnrolledUser());
    }, [dispatch,message,error,onClose]);
  
  
    return (
      <Grid
        css={{
          cursor: `url(${cursor}), default `,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
       
          <Box p={['0', '8']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            children="Enrolled Users"
            my="16"
            textAlign={['center', 'left']}
          />
           <EnrollmentModal
            isOpen={isOpen}
            onClose={onClose}
            Title="List of Registered ID"
            deleteButtonHandler={deleteRegIdButtonHandler}
            addUserHandler={addUserHandler}
            uIds={uIds}
            loading={loading}
          />
  
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All available enrollments in the database</TableCaption>
  
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>ENROLLMENT ID</Th>
                  <Th>ENROLLED PROJECT ID</Th>
                  <Th>ENROLLMENT STATUS</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
  
              <Tbody>
                {user && user.map(item => (
                  <Row
                    cancelEnrollementHandler={cancelEnrollementHandler}
                    key={item._id}
                    item={item}
                    loading = {loading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
                    
          <Button
              onClick={() => idDetailsHandler()}
              variant={'outline'}
              color="purple.500"
             
            >
            Registered IDs
            </Button>
         
        </Box>

  
        <Sidebar />
      </Grid>
    );
  };
  
  function Row({ item, cancelEnrollementHandler, loading }) {
    return (
      <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.enrollmentId}</Td>
        <Td>{item.enrolledProjectId}</Td>
        <Td>{item.enrollmentStatus && item.enrollmentStatus === 'active' ? 'Active':'Not Active'}</Td>
        
  
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
  
            <Button
            onClick={() => cancelEnrollementHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Cancel Enrollment
          </Button>
          </HStack>
        </Td>
      </Tr>
    );
  }
  export default EnrolledUsers;
  