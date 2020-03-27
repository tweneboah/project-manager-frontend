import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { connect } from "react-redux";
import { incomeExpensesProjectCreator } from "../../redux/actions/users/usersActions";

//CSS
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "8px",
    marginRight: "30px",
    marginLeft: "30px",
    marginTop: "20px"
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

const ProjectIncomeListItem = (props) => {
  //CSS
  const classes = useStyles();
  const { income, author, incomeExpensesProjectCreator } = props;
  //Grab the user from store who created this income
  const authorName = author && author.username;
  //Grab user who created the income
  const userId = income && income.user;

  //USEFFECT
  useEffect(() => {
    fetchUser(userId);
  }, [incomeExpensesProjectCreator]);

  const fetchUser = async (id) => {
    await incomeExpensesProjectCreator(id);
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
            primary={income.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {income.description}
                </Typography>
                {/* Author */}
                <Typography
                  style={{
                    color: "#218c74"
                  }}>
                  Author: {authorName}
                </Typography>
                <Typography>
                  <Moment
                    style={{
                      color: "#8c7ae6"
                    }}
                    format="DD/MM/YYYY">
                    {income.createdAt}
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

const actions = {
  incomeExpensesProjectCreator
};

const mapStateToProps = (state) => {
  return {
    author: state.userAuth.incomeExpensesProjectCreator
  };
};

export default connect(mapStateToProps, actions)(ProjectIncomeListItem);
