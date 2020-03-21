import React, { useEffect } from "react";
import ProjectListItem from "./ProjectListItem";
import { connect } from "react-redux";
import { fetchAllProjects } from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import StoreIcon from "@material-ui/icons/Store";
import { Button, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";

const useStyles = makeStyles((theme) => {
  return {
    parentOne: {
      background: "#3c6382"
    },
    icon: {
      marginTop: "30px",
      fontSize: "3rem",
      borderRadius: "50px",
      border: "2px solid white",
      padding: "10px",
      color: "pink"
    },
    parentOneChild: {
      textAlign: "center"
    },
    parentTwo: {
      background: "#60a3bc"
    },
    parentTwoChild: {
      margin: "10px",
      minWidth: "30%"
    }
  };
});

const ProjectLists = (props) => {
  //Css
  const classes = useStyles();
  //Props
  const { fetchAllProjects, projects, fetchAllExpenses } = props;
  //UseEffect

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects, fetchAllExpenses]);

  // Go to Add project page
  const goToCreateProject = () => {
    props.history.push("/projects/create-project");
  };
  return (
    <div>
      {projects.projects === [] ? (
        <LoadingComponent />
      ) : (
        <React.Fragment>
          {/* First Container */}
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.parentOne}>
            <Grid item>
              <div className={classes.parentOneChild}>
                <StoreIcon color="primary" className={classes.icon} />
                <h1>Your Projects</h1>

                <hr />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={goToCreateProject}>
                  Add Project
                </Button>
              </div>
            </Grid>
          </Grid>

          {/* Second Container */}
          <Grid
            container
            direction="row"
            justify="space-between"
            className={classes.parentTwo}>
            {projects.projects.map((project) => {
              return (
                <Grid
                  item
                  key={project.id}
                  md={3}
                  sm={12}
                  className={classes.parentTwoChild}>
                  <ProjectListItem project={project} />
                </Grid>
              );
            })}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  };
};
const actions = {
  fetchAllProjects
};

export default withRouter(
  connect(mapStateToProps, actions)(PrivateRoute(ProjectLists))
);
