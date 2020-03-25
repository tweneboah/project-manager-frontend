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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright � "}
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
      //Create profile picture
      const formData = new FormData();
      formData.append("files", data.picture[0]);

      //Required by strapi
      formData.append("source", "users-permissions");
      formData.append("ref", "user"); //name of content type
      formData.append("refId", userResponse._id); //id of content type
      formData.append("field", "picture"); //name of key for the content
      const res = await axios({
        method: "POST",
        url: "http://localhost:1337/upload",
        data: formData
      });
      //Grab the image created and add it to the object
      const picture = res.data[0];
      const { _id, username, email, role, projects, jwt } = userResponse;

      console.log(userResponse.data);
      const userData = {
        jwt,
        _id,
        username,
        email,
        role,
        picture,
        projects
      };
      console.log("WOOO", userData);
      console.log("Picture", res.data[0]);
      console.log("form", userResponse);
      localStorage.setItem("user", JSON.stringify(userData));

      props.history.push(`/login`);
    }
    // const { _id } = userResponse && userResponse.data.user;
    //Grab the user id from axios
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
