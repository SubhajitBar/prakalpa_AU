import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import termsAndCondition from '../../assets/docs/termsAndCondition'

const Founder =()=>(
    <Stack direction={['column','row']} spacing={['4','16']} padding={'8'} >
        <VStack>
            <Avatar src='https://avatars.githubusercontent.com/u/55270770?s=400&u=56069ebdd9e5356fec825cc5dab2e2b11a3dc462&v=4' boxSize={['40','48']} />
            <Text children={'Co-Founder'} opacity={'0.7'} />
        </VStack> 

        <VStack alignItems={['center', 'flex-start']} justifyContent={'center'}>
            <Heading children='Subhajit Bar' size={['md','xl']} />    
            <Text textAlign={['center','left']} children="Hi I am currently pursuing my bachelor's degree in Computer Science and Engineering. I am also a full-stack developer.
            I have work experience in many web based projects like LMS, E-Commerce, etc. Get in touch if you would like to join us. Thank you." />
        </VStack> 
    </Stack>
)

const VideoPlayer=()=>(
    <Box>
       <video
           autoPlay
           muted
           controls
           controlsList='nodownload nofullscreen noremoteplayback'
           disablePictureInPicture
           disableRemotePlayback
           src={introVideo}
           >
            
          </video>
    </Box>
)

const TandC =({termsAndCondition})=>(
    
    <Box>
        <Heading
        size={'md'}
        children="Terms & Condition"
        textAlign={['center', 'left']}
        my="4"
        />

        <Box h="sm" p="4" overflowY={'scroll'}>
        <Text
            fontFamily={'heading'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
        >
            {termsAndCondition}
        </Text>
        <Heading
            my="4"
            size={'xs'}
            children="Refund only applicable for cancellation within 7 days."
        />
    </Box>
  </Box>
)



const About = () => {

    useEffect(() => {
      document.title = "CourseBundler - About Us"
    }, [])
    

  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'} >
        <Heading children='About Us' textAlign={['center', 'left']} />
        
        <Founder/>

        <Stack m='8' direction={['column', 'row']} alignItems={'center'} >
            <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
            We are a project allocation and management platform with some premium projects available
            only for enrolled users.
            </Text>
            <Link to="/projects">

            <Button variant={'ghost'} colorScheme="whatsapp">
                Enroll Now
            </Button>
        </Link>
        </Stack>
        <VideoPlayer/>

        <TandC  termsAndCondition={termsAndCondition} />

        <HStack my={'4'} py={'4'}>
        <RiSecurePaymentFill/>
        <Heading textTransform={'uppercase'} fontFamily={'sans-serif'} fontSize={'xs'} children='t & c applied' />
        </HStack>
    </Container>
    
  )
}

export default About