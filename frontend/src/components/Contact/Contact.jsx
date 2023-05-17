import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {contactUs} from "../../redux/actions/other";
import  toast from 'react-hot-toast';

const Contact = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');

    const dispatch = useDispatch();
    const {loading, error, message:contactMessage} = useSelector(state=>state.other);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(contactUs(name,email,message));
    }

    useEffect(() => {
        document.title = "CourseBundler - Contact Us"
      if(error){
        toast.error(error);
        dispatch({type: "clearError"});
      }
      if(contactMessage){
        toast.success(contactMessage);
        dispatch({type: "clearMessage"});
      }
    }, [dispatch,error,contactMessage]);
    

  return (
    <Container h={'95vh'}>
        <VStack h='full' justifyContent={'center'} >
        <Heading children={'Contact Us'} />

        <form onSubmit={submitHandler} style={{width:'100%', margin:"0" }}>
       

        <Box my={'4'}>
            <FormLabel htmlFor='name' children="Name" />
            <Input id='name' required placeholder='John' type={'text'} focusBorderColor='green.400' value={name} onChange={(e)=>setName(e.target.value)}/>
        </Box>

        <Box my={'4'}>
            <FormLabel htmlFor='email' children="Email Address" />
            <Input id='email' required placeholder='abc@gmail.com' type={'email'} focusBorderColor='green.400' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Box>

        <Box  my={'4'}>
            <FormLabel htmlFor='message' children="Message" />
            <Textarea resize={'none'} id='message' required placeholder='Your Message...' focusBorderColor='green.400' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        </Box>

       


        <Button colorScheme='whatsapp' type="submit" isLoading={loading}>
            Send Mail
        </Button>


        <Box my={'4'}>
            Request a Course ? {' '}
            <Link to='/request'>
                <Button variant={'link'} colorScheme='whatsapp'>
                    Click
                </Button> {' '}
                here
            </Link>
        </Box>           
    </form> 
        </VStack>

    </Container>
  )
}

export default Contact