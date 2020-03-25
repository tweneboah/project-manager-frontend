import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  loginUser,
  setCurrentUser
} from "../../../redux/actions/users/usersActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright Ã‚Â© "}
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

const LoginUser = (props) => {
  const { loginUser, setCurrentUser } = props;
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      identifier: data.identifier,
      password: data.password
    };
    await loginUser(userData);
    await setCurrentUser();
    props.history.push(`/projects`);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
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
                id="identifier"
                label="Username"
                name="identifier"
                autoComplete="text"
                autoFocus
              />
            }
            name="identifier"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.identifier && (
            <span style={{ color: "red" }}>Username is required</span>
          )}

          {/* Password */}
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
            Login
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
  loginUser,
  setCurrentUser
};

export default connect(null, actions)(LoginUser);
