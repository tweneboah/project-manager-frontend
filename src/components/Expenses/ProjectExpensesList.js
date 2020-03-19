import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import ProjectExpensesListItem from "./ProjectExpensesListItem";
import { fetchSingleProject } from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const ProjectExpensesList = (props) => {
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
    <div>
      {project.singleProject === null ? (
        <LoadingComponent />
      ) : (
        <div>
          <h1>Expenses Dashboard</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={goToCreateExpensePage}>
            Add Expenses
          </Button>
          <h1>{project.singleProject.title}</h1>
          <p>{project.singleProject.description}</p>
          <hr></hr>
          {project.singleProject.expenses.length <= 0 ? (
            <h1>No Expenses</h1>
          ) : (
            <div>
              {project.singleProject.expenses.map((expense) => {
                return (
                  <div key={expense._id}>
                    <ProjectExpensesListItem expense={expense} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
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
