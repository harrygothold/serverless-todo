import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import Button from '../Button';
import Input from '../Input';
import { StyledForm } from './FormStyles';

type FormData = {
  title: string;
  description: string;
};

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>, formData: FormData) => void;
}

const Form: FC<Props> = ({ handleSubmit }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
      <Input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
        value={formData.title}
        label="Title"
      />
      <Input
        label="Description"
        type="text"
        name="description"
        onChange={handleChange}
        placeholder="description"
        value={formData.description}
      />
      <Button type="submit">Add Todo</Button>
    </StyledForm>
  );
};

export default Form;
