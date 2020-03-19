import React from "react";

const ProjectExpensesListItem = (props) => {
  const { expense } = props;
  return (
    <div>
      <h2>{expense.title}</h2>
      <p>{expense.description}</p>
      <h3>Amount GHS {expense.amount}</h3>
    </div>
  );
};

export default ProjectExpensesListItem;
