import React, { useEffect } from "react";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ProjectIncomeListItem from "./ProjectIncomeListItem";
import { Button, Grid, makeStyles } from "@material-ui/core";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";

const useStyles = makeStyles((theme) => {
  return {
    parentOne: {
      background: "#34495e",
      paddingTop: "20px",
      marginTop: "-40px"
    },
    parentOneChild: {
      textAlign: "center"
    },
    parentOneChild2: {
      textAlign: "center",
      margin: "20px"
    },
    parentTwo: {
      background: "red"
    }
  };
});

const ProjectIncomeList = (props) => {
  //css
  const classes = useStyles();
  const { fetchSingleProject, project, currentUser } = props;
  const { projectId } = useParams();

  const userJwt = currentUser && currentUser.jwt;

  useEffect(() => {
    fetchSingleProject(projectId, userJwt);
  }, [fetchSingleProject, projectId]);

  //Go to create Income page
  const goToCreateIncomePge = () => {
    props.history.push(`/projects/create-income/${projectId}`);
  };
  return (
    <React.Fragment>
      {project === null ? (
        <LoadingComponent />
      ) : (
        <React.Fragment>
          {/* First Container */}
          <Grid container justify="center" className={classes.parentOne}>
            <Grid item className={classes.parentOneChild}>
              <h1>
                <Grid>
                  <h1 style={{ color: "#dcdde1", fontSize: "2.5rem" }}>
                    You are adding expenses to {project.title} project
                  </h1>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "10px", fontSize: "1rem" }}
                    onClick={goToCreateIncomePge}>
                    Add Income
                  </Button>
                  <Grid>
                    <Button
                      style={{
                        padding: "10px",
                        fontSize: "1rem",
                        marginTop: "20px",
                        border: "1px solid yellow",
                        color: "white"
                      }}
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        props.history.push(`/project/dashboard/${projectId}`)
                      }>
                      Go to Dashboard
                    </Button>
                  </Grid>
                </Grid>
              </h1>
            </Grid>
            {/* Child 1 */}
            <Grid item className={classes.parentOneChild2}>
              <p>{project.description}</p>
            </Grid>
          </Grid>

          {project.incomes.length <= 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1>No Income Create one</h1>
            </div>
          ) : (
            // Second Container
            <Grid container direction="column" justify="center">
              {project.incomes.map((income) => {
                return (
                  <Grid item key={income._id}>
                    <ProjectIncomeListItem income={income} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const actions = {
  fetchSingleProject
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.singleProject,
    currentUser: state.userAuth.currentUser
  };
};

export default connect(
  mapStateToProps,
  actions
)(PrivateRoute(ProjectIncomeList));
