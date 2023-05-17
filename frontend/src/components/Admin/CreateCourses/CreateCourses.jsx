import { Button, Container, Grid, Heading, Image, Input, Select, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fileUploadCss } from '../../Auth/Register';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';



const CreateCourses = () => {

  const[title,setTitle] = useState('');
  const[description,setDescription] = useState('');
  const[createdBy,setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const categories = [
    'Web Development',
    'AIML',
    'App Development',
    'Cloud Computing',
    'System Designing',
    'Data Science ',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);


  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    document.title = "Prakalpa - Create Courses";

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error ,message]);

  return (
    <Grid css={{
        cursor: `url(${cursor}), default `,
    }} 
    minH={'100vh'}
    templateColumns={['1fr','5fr 1fr']}
    >
       <Container py="16">
        <form onSubmit={submitHandler} >
          <Heading
            textTransform={'uppercase'}
            children="Create Project"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300"
            />{' '}
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300"
            />
             <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
                <option value="">Category</option>
                {
                  categories.map((item)=>(
                    <option key={item} value={item}>{item}</option>
                  ))
                }

            </Select>
            <Input
              accept="image/*"
              required
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}
            <Button
              w="full"
              colorScheme={'purple'}
              type="submit"
              isLoading={loading}
            >
              Create
            </Button>
            
          </VStack>
        </form>
      </Container> 


        <Sidebar/>
    </Grid>
  )
}

export default CreateCourses