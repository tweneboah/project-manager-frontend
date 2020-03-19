import React, { useEffect } from "react";
import ProjectListItem from "./ProjectListItem";
import { connect } from "react-redux";
import { fetchAllProjects } from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Button, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const ProjectLists = (props) => {
  const { fetchAllProjects, projects, fetchAllExpenses } = props;
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
            style={{ background: "green" }}>
            <Grid item>
              <h1>Project List</h1>
              <hr />
              <Button
                variant="outlined"
                color="primary"
                onClick={goToCreateProject}>
                Add Project
              </Button>
            </Grid>
          </Grid>

          {/* Second Container */}
          <Grid container direction="row" justify="center">
            {projects.projects.map((project) => {
              return (
                <Grid
                  item
                  md={3}
                  key={project.id}
                  style={{ background: "red", margin: "1px", flexGrow: 1 }}>
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
