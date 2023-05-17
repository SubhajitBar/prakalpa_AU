import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import { updateGuideProfilePicture } from '../../redux/actions/guideprofile';
import { loadGuide } from '../../redux/actions/guide';

// export const user={
//   avatar: {
//       public_id: "tnwxojg6cerfkyy6egqg",
//       url: "https://res.cloudinary.com/dembva3cu/image/upload/v1682348627/tnwxojg6cerfkyy6egqg.jpg"
//   },
//   _id: "64469a53e13fc517039a3c37",
//   name: "Subha",
//   email: "subha@gmail.com",
//   employeeId:"1234",
//   createdAt: String( new Date().toISOString()),
//   role: "guide",
//   assignmentStatus: "active",
//   assignedProjectId:"abcd",
//   assignedProject:[
//     {
//     course: "kjdfhsksd",
//     poster: "https://miro.medium.com/v2/resize:fit:1400/1*c_fiB-YgbnMl6nntYGBMHQ.jpeg",
//   }
// ],
// }

const GuideProfile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { loading, message, error } = useSelector(state => state.guideprofile);

  const dispatch = useDispatch();

  const removeFromPlaylistHandler = async (id) => {
    //   await dispatch(removeFromPlaylist(id));
    //   dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateGuideProfilePicture(myForm));
    dispatch(loadGuide());
  };

  const cancelSubscriptionHandler = () => {
    // dispatch(cancelSubscription());
  };

  useEffect(() => {
    document.title = 'Prakalpa - Profile';
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    // if (subscriptionMessage) {
    //   toast.success(subscriptionMessage);
    //   dispatch({ type: 'clearMessage' });
    //   dispatch(loadUser());
    // }

    // if (subscriptionError) {
    //   toast.error(subscriptionError);
    //   dispatch({ type: 'clearError' });
    // }
  }, [dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={'8'}>
      <Heading children="Profile" textTransform={'uppercase'} m="8" />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        p={'8'}
        spacing={['8', '16']}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={'whatsapp'} variant={'ghost'}>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing="4" alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'} children="Name" />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text fontWeight={'bold'} children="Email" />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text fontWeight={'bold'} children="Employee Id" />
            <Text children={user.employeeId} />
          </HStack>
          <HStack>
            <Text fontWeight={'bold'} children="CreatedAt" />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateguideprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changeguidepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Assigned Project" size={'md'} my="8" />
      {user.assignedProject.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p="4"
        >
          {user.assignedProject.map(element => (
            <VStack w={'48'} m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />

              <HStack>
                <Link to={`/assignedproject`}>
                  <Button variant={'ghost'} colorScheme="whatsapp">
                    View Details
                  </Button>
                </Link>

                {/* <Button 
                  isLoading={loading}
                    onClick={() => removeFromPlaylistHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button> */}
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      {/* <Heading children="Bookmarks" size={'md'} my="8" />
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p="4"
        >
          {user.playlist.map(element => (
            <VStack w={'48'} m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />

              <HStack>
                <Link to={`/project/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="whatsapp">
                    View Details
                  </Button>
                </Link>

                <Button
                  isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )} */}

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
      />
    </Container>
  );
};
export default GuideProfile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(5px)'} />
      <ModalContent>
        <ModalHeader> Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />
                <Button
                  isLoading={loading}
                  type="submit"
                  w={'full'}
                  colorScheme="whatsapp"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler} mr="3">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
