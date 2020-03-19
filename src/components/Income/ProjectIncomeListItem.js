import React from "react";
import { Grid, Paper } from "@material-ui/core";

const ProjectIncomeListItem = (props) => {
  const { income } = props;
  return (
    <React.Fragment>
      <h1>{income.title}</h1>
      <p>{income.description}</p>
      <h3>{income.amount}</h3>
    </React.Fragment>
  );
};

export default ProjectIncomeListItem;
