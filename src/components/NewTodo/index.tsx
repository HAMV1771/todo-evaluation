import React, { useContext, useState } from 'react';
import NewTodoModal from './NewTodoModal';
import NewTodoFAB from './NewTodoFAB';
import { Box, Stack, TextField } from '@mui/material';
import { TodoContext } from '../../App';
import { v4 as uuidv4 } from 'uuid';

interface INewTodo {
  title: string;
  description: string;
}

const blankTodo:INewTodo = {
  title: "",
  description: "",
};

const NewTodo = () => {
  const ctx = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<INewTodo>(blankTodo);

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleSave = () => {
    ctx?.newTodo({
      id: uuidv4(),
      status: false,
      ...formData
    });

    setIsOpen(false);
    setFormData(blankTodo);
  }

  const updateFormData = (prop:string, val:any) => {
    setFormData((prevState:INewTodo) => ({
      ...prevState,
      [prop]: val
    }));
  }

  return (
    <Box sx={{p: 2}}>
      <NewTodoModal isOpen={isOpen} onClose={handleCloseModal} onSave={handleSave}>
        <Stack spacing={2}>
          <TextField
            required
            label="Title"
            value={formData.title}
            onChange={(e:any) => updateFormData("title", e.target.value)}
            />
          <TextField
            label="Description"
            multiline
            minRows={4}
            value={formData.description}
            onChange={(e:any) => updateFormData("description", e.target.value)}
          />
        </Stack>
      </NewTodoModal>

      <NewTodoFAB onClick={handleOpenModal} />

    </Box>
  );
};

export default NewTodo;