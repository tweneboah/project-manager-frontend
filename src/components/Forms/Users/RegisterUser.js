import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  registerUser,
  setCurrentUser
} from "../../../redux/actions/users/usersActions";
import { API_URL } from "../../../config/URLs";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
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

const RegisterUser = (props) => {
  //css
  const classes = useStyles();
  const { registerUser, setCurrentUser } = props;
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password
    };
    const userResponse = await registerUser(userData);

    if (userResponse) {
      // Rember
      //Create profile picture
      const formData = new FormData();
      formData.append("files", data.picture[0]);

      //Required by strapi
      formData.append("source", "users-permissions");
      formData.append("ref", "user"); //name of content type
      formData.append("refId", userResponse.user._id); //id of content type
      formData.append("field", "picture"); //name of key for the content
      const res = await axios({
        method: "POST",
        url: `${API_URL}/upload`,
        data: formData
      });
      //Grab the image created and add it to the object
      const picture = res.data[0];
      const { jwt } = userResponse.jwt;
      const {
        username,
        id,
        email,
        role,
        code,
        projects,
        income,
        expenses,
        project_todos,
        createdAt,
        updatedAt
      } = userResponse.user;

      const userData = {
        jwt,
        username,
        id,
        email,
        role,
        projects,
        income,
        code,
        expenses,
        project_todos,
        picture,
        createdAt,
        updatedAt
      };

      localStorage.setItem("user", JSON.stringify(userData));
      await setCurrentUser();
      props.history.push(`/projects`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            placeholder="Username"
            as={
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="text"
                autoFocus
              />
            }
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.username && (
            <span style={{ color: "red" }}>Username is required</span>
          )}
          {/* Description */}
          <Controller
            placeholder="Email"
            as={
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
              />
            }
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>Email is required</span>
          )}
          {/* PROFILE PICTURE */}
          <Controller
            as={
              <DropzoneArea
                filesLimit={0}
                acceptedFiles={["image/jpeg", "image/png"]}
                maxFileSize={1000000}
              />
            }
            control={control}
            rules={{ required: true }}
            name="picture"
            type="file"
          />
          {errors.picture && (
            <span style={{ color: "red" }}>Profile Picture is required</span>
          )}
          {/* Description */}
          <Controller
            placeholder="Password"
            as={
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
              />
            }
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>Password is required</span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Register
          </Button>
          <ToastContainer autoClose={2000} />
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const actions = {
  registerUser,
  setCurrentUser
};

export default connect(null, actions)(RegisterUser);
