import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';
import { guideLogout } from '../../../redux/actions/guide';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({isAuthenticated = false, user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler =()=>{
    onClose();
    dispatch(logout());
  }
  const logoutGuideHandler=()=>{
    onClose();
    dispatch(guideLogout());
  }

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme='whatsapp'
        zIndex={'overlay'}
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top={'6'}
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>PRAKALPA</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/projects" title="Browse All Projects" />
              <LinkButton onClose={onClose} url="/request" title="Request a Project" />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About Us" />

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        {(user && user.role) === 'guide' &&(
                          <Link onClick={onClose} to="/guideprofile">
                          <Button variant={'ghost'} colorScheme={'whatsapp'}>
                            Profile
                          </Button>
                        </Link>
                        )}
                        {(user && user.role) === 'user' &&(
                          <Link onClick={onClose} to="/profile">
                          <Button variant={'ghost'} colorScheme={'whatsapp'}>
                            Profile
                          </Button>
                        </Link>
                        )}
                        {(user && user.role) === 'admin' &&(
                          <Link onClick={onClose} to="/profile">
                          <Button variant={'ghost'} colorScheme={'whatsapp'}>
                            Profile
                          </Button>
                        </Link>
                        )}
                        {(user && user.role) === 'user' && (
                          <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                        )}
                        {(user && user.role) === 'admin' && (
                          <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                        )}
                        {(user && user.role) === 'guide' && (
                         <Button variant={'ghost'} onClick={logoutGuideHandler}>
                         <RiLogoutBoxLine />
                        Guide Logout
                       </Button>
                        )}
                        
                      </HStack>

                      {(user && user.role) === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                        <Button colorScheme={'purple'} variant="ghost">
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                      )}  
                    </VStack>
                  </>
                ) : (
                  <>
                    <VStack spacing={'1rem'}>
                      <HStack >
                      <Link onClick={onClose} to="/login">
                      <Button colorScheme='whatsapp'>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme='whatsapp'>Sign Up</Button>
                    </Link>
                      </HStack>
                      <HStack>
                      
                      <Link onClick={onClose} to="/guidelogin">
                      <Button variant={"outline"} colorScheme='whatsapp'>Guide Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to="/guideregister">
                      <Button variant={"outline"} colorScheme='whatsapp'>Guide Register</Button>
                    </Link>
                  
                      </HStack>
                    </VStack>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
