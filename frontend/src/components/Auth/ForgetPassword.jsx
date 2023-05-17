import { Button, Container,  Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(forgetPassword(email));
    };

    const {loading, message, error} = useSelector(state=>state.profile)
    useEffect(() => {
      document.title = "Prakalpa - Forget Password";

      if(error){
        toast.error(error);
        dispatch({type: "clearError"});
      }
      if(message){
        toast.success(message);
        dispatch({type: "clearMessage"});
      }
    }, [dispatch, error, message]);
    
  return (
   <Container py={'16'}  h={'95vh'}>
        <form onSubmit={submitHandler} >
            <Heading my={'16'} textTransform={'uppercase'} textAlign={['center','left']}  children={'Forget Password'} />

            <VStack spacing={'8'}>          
                
                <Input id='email' required placeholder='abc@gmail.com' type={'email'} focusBorderColor='green.400' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Button type='submit' isLoading={loading} w={'full'} colorScheme={'whatsapp'} >Send Reset Link</Button>
            </VStack>
        </form>

   </Container>
  )
}

export default ForgetPassword