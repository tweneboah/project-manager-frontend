import React, { useEffect } from "react";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ProjectIncomeListItem from "./ProjectIncomeListItem";
import { Button, Grid, Paper } from "@material-ui/core";
import Trying from "./Trying";

const ProjectIncomeList = (props) => {
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
    <React.Fragment>
      {project === null ? (
        <LoadingComponent />
      ) : (
        <React.Fragment>
          {/* Grid for project details */}
          <Grid container direction="row" justify="center">
            <Grid>
              <h1>Income Dashboard</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={goToCreateIncomePge}>
                Add Income
              </Button>
            </Grid>
ldzz@8355787
            <Grid>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </Grid>
          </Grid>
          {/* Grid for income List */}
          <Grid
            container
            direction="row"
            justify="center"
            style={{ background: "pink" }}>
            {project.incomes.map((pr) => {
              return (
                <Grid item style={{ background: "pink", margin: "5px" }}>
                  <Trying />
                </Grid>
              );
            })}
          </Grid>
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
