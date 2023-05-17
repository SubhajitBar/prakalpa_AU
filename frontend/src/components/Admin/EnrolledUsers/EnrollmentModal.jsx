import {
    Box,
    Button,
    Grid,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { RiDeleteBin7Fill } from 'react-icons/ri';

const EnrollmentModal = ({isOpen,onClose,Title,deleteButtonHandler,addUserHandler,uIds=[],loading}) => {
  const [regId, setRegId] = useState('');

  const handleClose = () => {
    setRegId('');
    onClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{Title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody p="16">
        <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={Title} />
              </Box>

              <Heading children={'IDs'} size="lg" />

                {
                  uIds.map((item,i)=>(
                    <IdCard                    
                    numCount={i+1}
                    Id={item._id}
                    registrationId={item.regId}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                  />
                   ))
                } 
              
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addUserHandler(e, regId)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Id"
                    size={'md'}
                    textTransform="uppercase"
                    py={'5'}
                  />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Registered ID"
                    value={regId}
                    onChange={e => setRegId(e.target.value)}
                  />

                  <Button                    
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                    isLoading={loading}
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>

          </Grid>
        </ModalBody>

        <ModalFooter >
          <Button onClick={handleClose} >Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EnrollmentModal;

function IdCard({registrationId,Id,deleteButtonHandler,loading,numCount}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${numCount} ${registrationId}`} />
        <Text children={Id} />
      </Box>

      <Button
        
        color={'purple.600'}
        onClick={() => deleteButtonHandler(Id)}
        isLoading={loading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}