import React, { useEffect } from "react";
import ProjectListItem from "./ProjectListItem";
import { connect } from "react-redux";
import {
  fetchAllProjects,
  fetchProjectByUserCode
} from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import StoreIcon from "@material-ui/icons/Store";
import { Button, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";

const useStyles = makeStyles((theme) => {
  return {
    parentOne: {
      background: "#196362",
      marginTop: "-40px",
      paddingTop: "40px"
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
      background: "#196362",
      minHeight: "55vh"
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

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects, fetchAllExpenses]);
  console.log(props);
  // Go to Add project page
  const goToCreateProject = () => {
    props.history.push("/projects/create-project");
  };

  // if (!currentUser) {
  //   return <LoadingComponent />;
  // }
  console.log(props);
  return (
    <div style={{ marginTop: "-50px" }}>
      {projects.projects.length <= 0 ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.parentOne}>
          <Grid item>
            <div className={classes.parentOneChild}>
              <StoreIcon color="primary" className={classes.icon} />
              <h1 style={{ color: "#b2bec3" }}>
                Your don't have any Projects. Create one
              </h1>

              <hr />
              <Button
                variant="outlined"
                color="primary"
                style={{
                  border: "1px solid yellow",
                  marginTop: 20,
                  marginBottom: 20,
                  color: "#b2bec3"
                }}
                onClick={goToCreateProject}>
                Add Project
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          {/* First Container */}
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.parentOne}>
            <Grid item>
              <div className={classes.parentOneChild}>
                <StoreIcon color="primary" className={classes.icon} />
                <h1 style={{ color: "#b2bec3" }}>
                  Your total Projects is {projects.projects.length}
                </h1>

                <hr />
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    border: "1px solid yellow",
                    marginTop: 20,
                    marginBottom: 20,
                    color: "#b2bec3"
                  }}
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
            justify="center"
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

export default withRouter(connect(mapStateToProps, actions)(ProjectLists));
