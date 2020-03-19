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
      <h1>Projects</h1>
      {projects == null ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h1>Loaded 2</h1>
        </div>
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
