import React, { useEffect } from "react";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ProjectIncomeListItem from "./ProjectIncomeListItem";
import { Button, Grid } from "@material-ui/core";

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
        <Grid direction="row" alignItems="center" style={{ background: "red" }}>
          <Grid item>
            <h1>Income Dashboard</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={goToCreateIncomePge}>
              Add Income
            </Button>
          </Grid>
          <Grid item>
            <h1>Wooooop</h1>
          </Grid>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {project.incomes.length <= 0 ? (
            <h1>No Income</h1>
          ) : (
            <Grid>
              <h1>Income List</h1>
              {project.incomes.map((income) => {
                return (
                  <Grid item key={income._id}>
                    <ProjectIncomeListItem income={income} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
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
