import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { connect } from "react-redux";
import { incomeExpensesProjectCreator } from "../../redux/actions/users/usersActions";
import { API_URL } from "../../config/URLs";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import ExpensesCommentsForm from "../Forms/Comments/ExpensesCommentsForm";
import CommentsList from "../Comments/CommentsList";
import { fetchExpensesComment } from "../../redux/actions/comments/expensesComments";
import { withRouter } from "react-router-dom";

//CSS
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px"
  },
  inline: {
    display: "inline",
    color: "#485460",
    lineHeight: "1.5rem"
  },
  title: {
    color: "red",
    fontWeight: "bold"
  },
  receiptImage: {
    width: "20%",
    height: "10%"
  }
}));

const ProjectExpensesListItem = (props) => {
  //CSS
  const classes = useStyles();
  console.log(props);
  const {
    expense,
    currentUser,
    incomeExpensesProjectCreator,
    fetchExpensesComment
  } = props;
  const userToken = currentUser && currentUser.jwt;
  const username = currentUser && currentUser.username;
  const expeseId = expense && expense.id;

  const goToCreateCommentPage = () => {
    props.history.push(`/project/expenses/${expeseId}/create-comment`);
  };

  return (
    <List className={classes.root}>
      <Paper>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Project Title" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            className={classes.title}
            primary={expense.title}
            secondary={
              <div>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary">
                  {expense.description}
                </Typography>
                <div>
                  <img
                    className={classes.receiptImage}
                    alt="There is no receipt for this expense"
                    src={`${API_URL}/${
                      expense.receipt
                        ? expense.receipt.url
                        : "There is no receipt for this expense"
                    }`}
                  />
                </div>
                {/* <Divider /> */}
                {/* Author */}
                <Typography style={{ color: "#218c74" }}>
                  Author: {username}
                </Typography>
                {/* <Divider /> */}
                {/* Merchant Name */}
                <Typography style={{ color: "#218c74" }}>
                  Merchant's name: {expense.merchant_name}
                </Typography>
                {/* Merchant's contact */}
                <Typography style={{ color: "#218c74" }}>
                  Merchant's Contact: {expense.merchant_contact}
                </Typography>
                {/* <Divider /> */}
                {/* Amount */}
                {/* Merchant's contact */}
                <Typography style={{ color: "#218c74" }}>
                  Amount GHS: {expense.amount}
                </Typography>
                {/* <Divider /> */}
                <Typography>
                  <Moment style={{ color: "#8c7ae6" }} format="DD/MM/YYYY">
                    {expense.createdAt}
                  </Moment>
                </Typography>
              </div>
            }
          />
        </ListItem>
      </Paper>
    </List>
  );
};

const mapStateToprops = (state) => {
  return {
    currentUser: state.userAuth.currentUser
  };
};

const actions = {
  incomeExpensesProjectCreator,
  fetchExpensesComment
};

export default connect(
  mapStateToprops,
  actions
)(PrivateRoute(withRouter(ProjectExpensesListItem)));
