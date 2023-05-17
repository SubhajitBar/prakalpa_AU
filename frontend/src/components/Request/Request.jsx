import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {courseRequest} from "../../redux/actions/other";
import  toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Request = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[course, setCourse] = useState('');

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector(state=>state.other);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(courseRequest(name,email,course));
    }

    useEffect(() => {
        document.title = "Prakalpa - Request"
        if(error){
          toast.error(error);
          dispatch({type: "clearError"});
        }
        if(message){
          toast.success(message);
          dispatch({type: "clearMessage"});
        }
      }, [dispatch,error,message]);

  return (
    <Container h={'95vh'}>
        <VStack h='full' justifyContent={'center'} spacing={'8'}>
        <Heading children={'Request New Project'} />

        <form onSubmit={submitHandler} style={{width:'100%' }}>
       

        <Box my={'4'}>
            <FormLabel htmlFor='name' children="Name" />
            <Input id='name' required placeholder='John' type={'text'} focusBorderColor='green.400' value={name} onChange={(e)=>setName(e.target.value)}/>
        </Box>

        <Box my={'4'}>
            <FormLabel htmlFor='email' children="Email Address" />
            <Input id='email' required placeholder='abc@gmail.com' type={'email'} focusBorderColor='green.400' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Box>

        <Box  my={'4'}  >
            <FormLabel htmlFor='course' children="Project" />
            <Textarea resize={'none'} id='course' required placeholder='Explain the Project...' focusBorderColor='green.400' value={course} onChange={(e)=>setCourse(e.target.value)}/>
        </Box>


        <Button  my="4" colorScheme='whatsapp' type="submit" isLoading={loading}>
            Send Mail
        </Button>


        <Box my={'4'}>
            See Available Courses ! {''}
            <Link to='/projects'>
                <Button variant={'link'} colorScheme='whatsapp'>
                    Click
                </Button> {''}
                here
            </Link>
        </Box>           
    </form> 
        </VStack>

    </Container>
  )
}

export default Request