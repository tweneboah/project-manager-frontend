import React from "react";
import { Card, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#833471",
    marginTop: "10px",
    textAlign: "center"
  },
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
    <Card>
      <CardHeader
        title={project.title}
        subheader={<Moment format="DD/MM/YYYY">{project.createdAt}</Moment>}
      />

      <CardContent>
        {project.description}
        <Divider variant="fullWidth" className={classes.divider} />
        <div style={{ textAlign: "center" }}>
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={goToProjectDashboard}>
            View Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default withRouter(ProjectListItem);
