import React, { useEffect } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {Stack, VStack, HStack, Heading, Text, Button, Image, Box,} from '@chakra-ui/react';
import vg from '../../assets/images/bg.png';
import introVideo from '../../assets/videos/intro.mp4'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiUdemy, SiCoursera } from 'react-icons/si'
import { DiAws} from 'react-icons/di'

function Home() {

  useEffect(() => {
    document.title = "Prakalpa - Home"
  }, [])
  

  return (
    <section className='Home'>
      <div className='container' >

        <Stack
        direction={['column','column', 'row']}
        height={"100%"}
        justifyContent={['center','center', 'flex-end']}
        alignItems={'center'}
        spacing={['16','53']}
        >

        <VStack
        width={'full'}
        alignItems={['center','center','flex-end']}
        spacing={'5'}
        >
          <Heading children="LEARN FORM THE EXPERTS" size={'2xl'} />
          <Text textAlign={['center', 'left']} fontSize={'2xl'} fontFamily='cursive' children="Get Hands on Project & Boost up Your Skills" />

          <Link to="/projects" >
            <Button size={'lg'} colorScheme='whatsapp'>
              Explore Now
            </Button >
          </Link>
        </VStack>
          
        <Image className='vectorGraphics' boxSize={'md'} src={vg} objectFit={'contain'}/>
        </Stack>
      </div>


      <Box padding={'5'} bg={'blackAlpha.800'} >
          <Heading 
          color={"green.400"}
          textAlign={'center'}
          fontFamily={'body'}
          children="OUR BRANDS"
           />
          <HStack className='brandsBanner' justifyContent={'space-evenly'} mt={'4'} mb={'2'}>
            <CgGoogle/>
            <CgYoutube/>
            <SiUdemy/>
            <SiCoursera/>
            <DiAws/>
          </HStack>

        </Box>

        <div className="container2">

          <video
          //  autoPlay
           controls
           controlsList='nodownload nofullscreen noremoteplayback'
           disablePictureInPicture
           disableRemotePlayback
           src={introVideo}
           >
            
          </video>
        </div>

    </section>
  )
}

export default Home;