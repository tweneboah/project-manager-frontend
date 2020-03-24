import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { connect } from "react-redux";
import { incomeExpensesProjectCreator } from "../../redux/actions/users/usersActions";

//CSS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: "20px"
  },
  inline: {
    display: "inline",
    color: "#485460",
    lineHeight: "1.5rem"
  },
  title: {
    color: "red",
    fontWeight: "bold"
  }
}));

const ProjectExpensesListItem = (props) => {
  //CSS
  const classes = useStyles();
  const { expense, user, incomeExpensesProjectCreator } = props;
  const userId = expense && expense.user;
  const author = user && user.username;

  useEffect(() => {
    incomeExpensesProjectCreator(userId);
  }, [incomeExpensesProjectCreator]);
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
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary">
                  {expense.description}
                </Typography>
                {/* <Divider /> */}
                {/* Author */}
                <Typography style={{ color: "#218c74" }}>
                  Author: {author}
                </Typography>
                {/* <Divider /> */}
                {/* Merchant Name */}
                <Typography style={{ color: "#218c74" }}>
                  Merchant's name: {expense.merchant_name}
                </Typography>
                {/* Merchant's contact */}
                <Typography style={{ color: "#218c74" }}>
                  Merchant's name: {expense.merchant_contact}
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
              </React.Fragment>
            }
          />
        </ListItem>
      </Paper>
    </List>
  );
};

const mapStateToprops = (state) => {
  return {
    user: state.userAuth.incomeExpensesProjectCreator
  };
};

const actions = {
  incomeExpensesProjectCreator
};
export default connect(mapStateToprops, actions)(ProjectExpensesListItem);
