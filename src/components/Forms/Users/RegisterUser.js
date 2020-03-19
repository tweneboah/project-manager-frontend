import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";

const RegisterUser = () => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          placeholder="Project Title"
          as={TextField}
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.title && "Your input is required"}

        <Controller
          placeholder="Project Description"
          as={TextField}
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.description && "Your input is required"}

        <Controller
          placeholder="Project Title"
          as={
            <Select>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="estate">Estate</MenuItem>
              <MenuItem value="business">Business</MenuItem>

              <MenuItem value="other">Other</MenuItem>
            </Select>
          }
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.category && "Your input is required"}

        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default RegisterUser;
