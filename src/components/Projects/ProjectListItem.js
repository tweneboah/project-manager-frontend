// import React from "react";
// import { Button } from "@material-ui/core";
// import { withRouter } from "react-router-dom";

// const ProjectListItem = (props) => {
//   const { project, history } = props;

//   const goToProjectDashboard = () => {
//     history.push(`/project/dashboard/${project.id}`);
//   };
//   return (
//     <React.Fragment>
//       <h1>{project.title}</h1>
//       <p>{project.description}</p>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={goToProjectDashboard}>
//         View Dashboard
//       </Button>
//     </React.Fragment>
//   );
// };

// export default withRouter(ProjectListItem);

import React from "react";
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  avatar: {
    backgroundColor: red[500]
  }
}));

const ProjectListItem = (props) => {
  const { project, history } = props;
  const classes = useStyles();

  const goToProjectDashboard = () => {
    history.push(`/project/dashboard/${project.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            PR
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <h1>Pro</h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={goToProjectDashboard}>
            View Dashboard
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default withRouter(ProjectListItem);
