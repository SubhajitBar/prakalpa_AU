import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { guideLogin } from '../../redux/actions/guide';

const GuideLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(guideLogin(email,password));
        
    }

    useEffect(() => {
        document.title = "Prakalpa - Guide Login";

    }, [])
    

  return (
   <Container h={'95vh'}>
    <VStack h={'full'} justifyContent={"center"} spacing={'7'}>
        <Heading fontFamily={'mono'} children='Welcome to Prakalpa' />
        <Heading textAlign={'center'} fontFamily={'mono'} fontSize={'1.2rem'} children='Guide Login' />

        <form onSubmit={submitHandler} style={{width:'100%'}}>
            <Box my={'4'}>
                <FormLabel htmlFor='email' children="Email Address" />
                <Input id='email' required placeholder='abc@gmail.com' type={'email'} focusBorderColor='green.400' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Box>
            <Box  my={'4'}>
                <FormLabel htmlFor='password' children="Password" />
                <Input id='password' required placeholder='Enter your password' type={'password'} focusBorderColor='green.400' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Box>


            <Box  my={'4'}>
                <Link to='/forgetpasswordguide'>
                    <Button variant={'link'} fontSize={'sm'} >
                        Forget Password?
                    </Button>
                </Link>
            </Box>

            <Button my="4" colorScheme={'whatsapp'} type="submit">
                Login
            </Button>


            <Box my={'4'}>
                New User ? {' '}
                <Link to='/guideregister'>
                    <Button variant={'link'} colorScheme={'whatsapp'}>
                        Sign Up
                    </Button> {' '}
                    here
                </Link>
            </Box>           
        </form>
    </VStack>
   </Container>
  )
}

export default GuideLogin;