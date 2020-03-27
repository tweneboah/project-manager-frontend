import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import { MenuItem, Select } from "@material-ui/core";
import { createProject } from "../../../redux/actions/projects/projectsActions";
import { setCurrentUser } from "../../../redux/actions/users/usersActions";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright Ãƒâ€šÃ‚Â© "}
      <Link color="inherit" href="https://github.com/tweneboah">
        <span>Tek-Linco Project Manager</span>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const CreateProjectForm = (props) => {
  const classes = useStyles();
  const { projectId } = useParams();

  const { createProject, currentUser } = props;
  const { control, handleSubmit, errors } = useForm();

  const userId = currentUser && currentUser.id;
  const userToken = currentUser && currentUser.jwt;

  const onSubmit = async (data) => {
    const incomeData = {
      title: data.title,
      description: data.description,
      amount: data.amount,
      project: projectId,
      category: data.category,
      user: userId
    };
    console.log(data);
    await createProject(incomeData, userToken);
    props.history.push("/projects");
  };

  return (
    <div style={{ background: "#f1f2f6", marginTop: "-50px", height: "90vh" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Project
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <Controller
              placeholder="Project Title"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="title"
                  label="Project Title"
                  name="title"
                  autoComplete="text"
                  autoFocus
                />
              }
              defaultValue=""
              name="title"
              control={control}
              rules={{ required: true }}
            />
            {errors.title && (
              <span style={{ color: "red" }}>Project Title is required</span>
            )}
            {/* Description */}
            <Controller
              placeholder="Description"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="text"
                  autoFocus
                />
              }
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.title && (
              <span style={{ color: "red" }}>Description is required</span>
            )}

            {/* Category */}
            <Controller
              placeholder="Project Title"
              as={
                <Select
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: "10px" }}>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Estate">Estate</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              }
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.category && "Your input is required"}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}>
              Create Project
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

const actions = {
  createProject,
  setCurrentUser
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    currentUser: state.userAuth.currentUser
  };
};
export default connect(mapStateToProps, actions)(CreateProjectForm);
