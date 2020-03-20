import React, { useEffect } from "react";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ProjectIncomeListItem from "./ProjectIncomeListItem";
import { Button, Grid, makeStyles } from "@material-ui/core";

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

const ProjectIncomeList = (props) => {
  //css
  const classes = useStyles();
  const { fetchSingleProject, project } = props;
  const { projectId } = useParams();

  useEffect(() => {
    fetchSingleProject(projectId);
  }, [fetchSingleProject, projectId]);

  //Go to create Income page
  const goToCreateIncomePge = () => {
    props.history.push(`/projects/create-income/${projectId}`);
  };
  return (
    // <React.Fragment>
    //   {project === null ? (
    //     <LoadingComponent />
    //   ) : (
    //     <React.Fragment>
    //       {/* Grid for project details */}
    //       <Grid container direction="row" justify="center">
    //         <Grid>
    //           <h1>Income Dashboard</h1>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={goToCreateIncomePge}>
    //             Add Income
    //           </Button>
    //         </Grid>

    //         <Grid>
    //           <h1>{project.title}</h1>
    //           <p>{project.description}</p>
    //         </Grid>
    //       </Grid>
    //       {/* Grid for income List */}
    //       <Grid
    //         container
    //         direction="row"
    //         justify="center"
    //         style={{ background: "pink" }}>
    //         {project.incomes.map((pr) => {
    //           return (
    //             <Grid item style={{ background: "pink", margin: "5px" }}>
    //               <Trying />
    //             </Grid>
    //           );
    //         })}
    //       </Grid>
    //     </React.Fragment>
    //   )}
    // </React.Fragment>

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
                  <h1>You are adding expenses to {project.title} project</h1>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={goToCreateIncomePge}>
                    Add Income
                  </Button>
                </Grid>
              </h1>
            </Grid>
            {/* Child 1 */}
            <Grid item className={classes.parentOneChild2}>
              <p>{project.description}</p>
            </Grid>
          </Grid>

          {project.incomes.length <= 0 ? (
            <React.Fragment>
              <h1>No Income</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={goToCreateIncomePge}>
                Add Income
              </Button>
            </React.Fragment>
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
    project: state.projects.singleProject
  };
};
export default connect(mapStateToProps, actions)(ProjectIncomeList);
