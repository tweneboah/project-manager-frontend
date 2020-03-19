import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";
import { createProject } from "../../../redux/actions/projects/projectsActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const EditProjectForm = (props) => {
  const { createProject } = props;
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    await createProject(data);
    props.history.push("/projects");
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
const actions = {
  createProject
};
export default withRouter(connect(null, actions)(EditProjectForm));
