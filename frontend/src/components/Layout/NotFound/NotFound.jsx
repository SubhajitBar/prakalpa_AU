import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {

  useEffect(() => {
    document.title = "CourseBundler - Not Found";

  }, [])
  

  return (
    <Container h={'95vh'}>
      <VStack justifyContent={'center'} h="full" spacing={'4'}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading >Page Not Found</Heading>
        <Link to="/">
          <Button variant={'ghost'}> Go to home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
