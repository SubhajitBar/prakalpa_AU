import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from "../../redux/actions/profile"
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = ({user}) => {

  const[name,setName] = useState(user.name)
  const[email,setEmail] = useState(user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const submitHandler = async (e)=>{
  e.preventDefault();
  await dispatch(updateProfile(name,email));
  dispatch(loadUser());
  navigate("/profile");
}

useEffect(() => {
  document.title = "Prakalpa - Update Profile"
}, [])


const {loading} = useSelector(state=>state.profile)

  return (
    <Container py="16" minH={'90vh'}>
    <form onSubmit={submitHandler} >
      <Heading
        textAlign={['center', 'left']}
        my="16"
        textTransform={'uppercase'}
        children="Update Profile"
      />
      <VStack spacing={'8'}>
        <Input        
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        type={'text'}
        focusBorderColor="green.400"
        />
        
        <Input          
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type={'email'}
          focusBorderColor="green.400"
        />

        <Button isLoading={loading} w="full" colorScheme={'whatsapp'} type="submit">
          Update
        </Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile