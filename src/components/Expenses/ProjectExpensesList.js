import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ProjectExpensesListItem from "./ProjectExpensesListItem";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import { setCurrentUser } from "../../redux/actions/users/usersActions";

const useStyles = makeStyles((theme) => {
  return {
    parentOne: {
      background: "#591422",
      marginTop: "-40px",
      color: "white",
      paddingTop: "40px"
    },
    parentOneChild: {
      textAlign: "center"
    },
    parentOneChild2: {
      textAlign: "center",
      margin: "20px"
    }
  };
});

const ProjectExpensesList = (props) => {
  //css
  const classes = useStyles();
  const { project, fetchSingleProject, currentUser } = props;
  const { projectId } = useParams();
  console.log("expnselist", project);
  const jwt = currentUser && currentUser.jwt;
  useEffect(() => {
    fetchSingleProject(projectId, jwt);
  }, [fetchSingleProject, projectId]);

  //Go to create Income page
  const goToCreateExpensePage = () => {
    props.history.push(`/projects/create-expense/${projectId}`);
  };

  return (
    <React.Fragment>
      {project.singleProject === null ? (
        <LoadingComponent />
      ) : (
        <React.Fragment>
          {/* First Container */}
          <Grid container justify="center" className={classes.parentOne}>
            <Grid item className={classes.parentOneChild}>
              <h1 style={{ color: "#bdc3c7" }}>
                You are adding expenses to {project.singleProject.title} project
              </h1>
              <Button
                variant="contained"
                color="primary"
                onClick={goToCreateExpensePage}>
                Add Expenses
              </Button>
              <Grid>
                <Button
                  style={{ marginTop: "20px" }}
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    props.history.push(`/project/dashboard/${projectId}`)
                  }>
                  Go to Dashboard
                </Button>
              </Grid>
            </Grid>
            {/* Child 1 */}
            <Grid item className={classes.parentOneChild2}>
              <p style={{ color: "#bdc3c7", lineHeight: "1.4rem" }}>
                {project.singleProject.description}
              </p>
            </Grid>
          </Grid>

          {project.singleProject.expenses.length <= 0 ? (
            <h1>No Expenses</h1>
          ) : (
            // Second Container
            <Grid container direction="column" justify="center">
              {project.singleProject.expenses.map((expense) => {
                return (
                  <Grid item key={expense._id}>
                    <ProjectExpensesListItem expense={expense} />
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
    project: state.projects,
    currentUser: state.userAuth.currentUser
  };
};
export default connect(
  mapStateToProps,
  actions
)(PrivateRoute(ProjectExpensesList));
