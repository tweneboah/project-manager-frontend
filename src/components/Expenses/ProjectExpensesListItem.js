import React from "react";
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
  const { expense } = props;
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
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {expense.description}
                </Typography>
                {/* Author */}
                <Typography style={{ color: "#218c74" }}>
                  Author: Unknown
                </Typography>
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

export default ProjectExpensesListItem;
