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
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  createExpensesComment,
  fetchExpensesComment
} from "../../../redux/actions/comments/expensesComments";
import { fetchAllProjectsByUser } from "../../../redux/actions/projects/projectsActions";
import {
  loginUser,
  setCurrentUser
} from "../../../redux/actions/users/usersActions";

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

const ExpensesCommentsForm = (props) => {
  console.log(props);
  const { expenseId } = useParams();
  const classes = useStyles();
  const {
    setCurrentUser,
    currentUser,
    createExpensesComment,
    fetchExpensesComment
  } = props;
  const { control, handleSubmit, errors } = useForm();

  const userId = currentUser && currentUser.id;
  const userToken = currentUser && currentUser.jwt;
  console.log("exp", expenseId);
  const onSubmit = async (data) => {
    const userData = {
      message: data.message,
      user: userId,
      expense: expenseId
    };

    await createExpensesComment(userData, userToken);
    await fetchExpensesComment(expenseId, userToken);
    props.history.push(`/project/expenses/${expenseId}`);
  };

  useEffect(() => {
    setCurrentUser();
  }, []);
  return (
    <div>
      <CssBaseline />

      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          placeholder="Enter comment and hit Enter"
          as={
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="identifier"
              label="Enter comment and hit Enter"
              autoComplete="text"
              autoFocus
            />
          }
          name="message"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.message && (
          <span style={{ color: "red" }}>Message is required</span>
        )}
        <Button type="submit">Add Comment</Button>
        <ToastContainer autoClose={2000} />
      </form>
    </div>
  );
};

const actions = {
  loginUser,
  setCurrentUser,
  createExpensesComment,
  fetchAllProjectsByUser,
  fetchExpensesComment
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userAuth.currentUser
  };
};
export default connect(mapStateToProps, actions)(ExpensesCommentsForm);
