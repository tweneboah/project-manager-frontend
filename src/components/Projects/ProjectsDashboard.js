import React, { useEffect } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import {
  fetchAllProjects,
  fetchSingleProject
} from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Button, Grid, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import FooterComponent from "../Footer/FooterComponent";

const useStyles = makeStyles((theme) => {
  return {
    dashboardBg: {
      background: "#333333"
    },
    paper: {
      background: "#424242",
      padding: "10px",
      margin: "20px",
      textAlign: "center"
    },
    title: {
      color: "#90CAF9",
      fontSize: "1.2rem"
    },
    amount: {
      color: "#FFFFFF",
      fontSize: "2rem",
      marginTop: "30px"
    },
    projectBg: {
      background: "#535c68",
      color: "#95afc0"
    },
    projectTitle: {
      fontSize: "1.7rem",
      paddingTop: "10px",
      marginBottom: "2px"
    },
    projectDate: {
      marginTop: "-2px",
      color: "#ff7979"
    },
    income: {
      color: "#95afc0"
    },
    expenses: {
      color: "#eb4d4b"
    },
    moneyLeft: {
      color: "#7ed6df"
    }
  };
});

const ProjectsDashboard = (props) => {
  //CSS CLASS
  const classes = useStyles();
  //Props
  const { fetchSingleProject, project } = props;
  //Extract Params Id
  const projectId = props.match.params.projectId;
  //UseEffect
  useEffect(() => {
    fetchSingleProject(projectId);
  }, [projectId, fetchSingleProject]);

  const goToExpensesPage = () => {
    props.history.push(`/project/expenses/${projectId}`);
  };

  const goToIncomePage = () => {
    props.history.push(`/project/income/${projectId}`);
  };

  //Calc Total Income and Expense
  let totalExpenses = "0.0";
  let totalIncome = "0.0";
  let moneyLeft = "0.0";

  if (project !== null) {
    if (project.expenses.length > 0) {
      totalExpenses = project.expenses.reduce((acc, current) => {
        return acc + current.amount;
      }, 0);
    }
  }

  if (project !== null) {
    if (project.incomes.length > 0) {
      totalIncome = project.incomes.reduce((acc, current) => {
        return acc + current.amount;
      }, 0);
    }
  }
  moneyLeft = totalIncome - totalExpenses;

  const moneyLeftPercentage = (moneyLeft / totalIncome) * 100;
  const expensesInPercentage = (totalExpenses / totalIncome) * 100;
  console.log(expensesInPercentage);
  return (
    <div>
      <Grid
        alignItems="center"
        direction="column"
        container
        className={classes.projectBg}>
        <Grid item>
          {project && (
            <div>
              <h1 className={classes.projectTitle}>{project.title}</h1>
            </div>
          )}
          <hr />
        </Grid>
        <Grid item>
          <h1 className={classes.projectDate}>
            {project && (
              <div>
                <Moment fromNow>
                  {project.createdAt && project.createdAt}
                </Moment>
              </div>
            )}
          </h1>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.dashboardBg}>
        <Grid item style={{ flexGrow: 1 }} md={4} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <h1 className={classes.title}>Money Invested</h1>

            <h1 className={classes.income}>
              <NumberFormat
                thousandSeparator={true}
                thousandsGroupStyle="thousand"
                prefix={"GHS"}
                displayType="text"
                value={`${totalIncome}.0`}
              />
            </h1>
            <Button
              variant="contained"
              color="primary"
              onClick={goToIncomePage}>
              View Income
            </Button>
          </Paper>
        </Grid>

        <Grid item style={{ flexGrow: 1 }} md={4} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <h1 className={classes.title}>Total Expenses</h1>

            <h1 className={classes.expenses}>
              <NumberFormat
                thousandSeparator={true}
                thousandsGroupStyle="thousand"
                prefix={"GHS"}
                displayType="text"
                value={`${totalExpenses}.0`}
              />
            </h1>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "#ffbe76", fontSize: "1.1rem" }}>
                In Percentage: {`${expensesInPercentage.toFixed(1)} %`}
              </span>
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={goToExpensesPage}>
              View Expenses
            </Button>
          </Paper>
        </Grid>

        <Grid item style={{ flexGrow: 1 }} md={4} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <h1 className={classes.title}>Money Left</h1>
            <h1 className={classes.moneyLeft}>
              <NumberFormat
                thousandSeparator={true}
                thousandsGroupStyle="thousand"
                prefix={"GHS"}
                displayType="text"
                value={`${moneyLeft}.0`}
              />
            </h1>
            <span style={{ color: "#ffbe76", fontSize: "1.1rem" }}>
              In Percentage: {`${moneyLeftPercentage.toFixed(1)} %`}
            </span>
          </Paper>
        </Grid>
      </Grid>

      {project === null ? (
        <LoadingComponent />
      ) : (
        <Grid>
          <Paper>
            <h1>Project Description</h1>
            <p>{project.description}</p>
          </Paper>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.singleProject
  };
};
const actions = {
  fetchAllProjects,
  fetchSingleProject
};

export default connect(mapStateToProps, actions)(ProjectsDashboard);
