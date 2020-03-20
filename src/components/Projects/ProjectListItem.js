import React from "react";
import { Grid, Card, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   maxWidth: 345
  // },
  // media: {
  //   height: 0,
  //   paddingTop: "56.25%" // 16:9
  // },

  // btn: {
  //   backgroundColor: red[500],
  //   marginTop: "10px"
  // },
  divider: {
    marginTop: "10px"
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
        title={project.title}
        subheader={<Moment format="DD/MM/YYYY">{project.createdAt}</Moment>}
      />

      <CardContent>
        {project.description}
        <Divider variant="fullWidth" className={classes.divider} />
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={goToProjectDashboard}>
          View Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};
export default withRouter(ProjectListItem);
