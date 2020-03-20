import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ProjectExpensesListItem from "./ProjectExpensesListItem";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const useStyles = makeStyles((theme) => {
  return {
    parentOne: {
      background: "#218c74",
      paddingTop: "20px"
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
  const { project, fetchSingleProject } = props;
  const { projectId } = useParams();
  useEffect(() => {
    fetchSingleProject(projectId);
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
              <h1>
                You are adding expenses to {project.singleProject.title} project
              </h1>
              <Button
                variant="contained"
                color="primary"
                onClick={goToCreateExpensePage}>
                Add Expenses
              </Button>
            </Grid>
            {/* Child 1 */}
            <Grid item className={classes.parentOneChild2}>
              <p>{project.singleProject.description}</p>
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
    project: state.projects
  };
};
export default connect(mapStateToProps, actions)(ProjectExpensesList);
