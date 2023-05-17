import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

    const { loading, message, error } = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const submitHandler = e => {
      e.preventDefault();
      dispatch(resetPassword(params.token, password));
    };

    useEffect(() => {
      document.title = "Prakalpa - Reset Password";

      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
        navigate('/login');
      }
    }
    , [dispatch, navigate, error, message]);
  

  return (
    <Container py={'16'} h={'95vh'}>
      <form onSubmit={submitHandler} >
        <Heading
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
          children={'Reset Password'}
        />

        <VStack spacing={'8'}>
          <Input
            required
            placeholder="New Password..."
            type={'password'}
            focusBorderColor="green.400"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button isLoading={loading} type="submit" w={'full'} colorScheme={'whatsapp'}>
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
