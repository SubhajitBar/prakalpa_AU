import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { guideRegister } from '../../redux/actions/guide';
export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#22c35e',
    backgroundColor: 'white',
  };
const fileUploadStyle={
    '&::file-selector-button': fileUploadCss,
}

const GuideRegister = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

    const changeImageHandler=(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader(); 
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setImagePrev(reader.result);
            setImage(file)
        }
    }

    const dispatch = useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        myForm.append('employeeId', employeeId);
        myForm.append('file', image);
    
        dispatch(guideRegister(myForm));
    }

    useEffect(() => {
        document.title = "Prakalpa - Guide Register";

    }, [])
    


  return (

    <Container h={'100%'} py={'20'} >
    <VStack justifyContent={"center"} alignItems={'center'} spacing={'16'}  >
    <Heading textTransform={'uppercase'} fontFamily={'mono'} children={'Guide Registration'} />

    <form onSubmit={submitHandler} style={{width:'100%', margin:"0" }}>
        <Box my={'6'} display={'flex'} justifyContent="center">
            <Avatar src={imagePrev} size={'2xl'} />
        </Box>

        <Box my={'4'}>
            <FormLabel htmlFor='name' children="Name" />
            <Input id='name' required placeholder='abc' type={'text'} focusBorderColor='green.400' value={name} onChange={(e)=>setName(e.target.value)}/>
        </Box>

        <Box my={'4'}>
            <FormLabel htmlFor='email' children="Email Address" />
            <Input id='email' required placeholder='abc@adamasuniversity.ac.in' type={'email'} focusBorderColor='green.400' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Box>

        <Box  my={'4'}>
            <FormLabel htmlFor='password' children="Password" />
            <Input id='password' required placeholder='Enter your password' type={'password'} focusBorderColor='green.400' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Box>

        <Box  my={'4'}>
            <FormLabel htmlFor='employeeId' children="Employee Id" />
            <Input id='employeeId' required placeholder='Enter your Employee Id' type={'text'} focusBorderColor='green.400' value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}/>
        </Box>

        <Box  my={'4'}>
            <FormLabel htmlFor='chooseAvatar' children="Avatar" />
            <Input id='chooseAvatar' required placeholder='Choose Your Avatar' css={fileUploadStyle} accept='image/*' type={'file'} onChange={changeImageHandler} focusBorderColor='green.400' />
        </Box>


        <Button my="4" colorScheme={'whatsapp'} type="submit">
            Sign Up
        </Button>


        <Box my={'4'}>
            Already Signed Up ? {' '}
            <Link to='/guidelogin'>
                <Button variant={'link'} colorScheme={'whatsapp'}>
                    Login
                </Button> {' '}
                here
            </Link>
        </Box>           
    </form> 
    </VStack>
   </Container>

  )
}

export default GuideRegister













// import React from 'react'

// const GuideRegister = () => {
//   return (
//     <div>GuideRegister</div>
//   )
// }

// export default GuideRegister