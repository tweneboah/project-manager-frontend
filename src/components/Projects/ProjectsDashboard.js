import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  fetchSingleProject,
  fetchAllProjectsByUser
} from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import { API_URL } from "../../config/URLs";
import FooterComponent from "../Footer/FooterComponent";
import { fetchProjectTodosByProject } from "../../redux/actions/Todos/projectTodos";
import Todos from "../Todos";

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
      marginTop: "-40px",
      background: "#2d3436",
      color: "#95afc0"
    },
    projectTitle: {
      fontSize: "2.7rem",
      paddingTop: "10px",
      marginBottom: "2px"
    },
    projectDate: {
      marginTop: "-3px",
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
    },
    profilePicture: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginTop: "5px"
    }
  };
});

const ProjectsDashboard = (props) => {
  //CSS CLASS
  const classes = useStyles();

  //Props
  const {
    fetchSingleProject,
    project,
    currentUser,
    fetchAllProjectsByUser
  } = props;
  //Grab image url of the user
  const url = currentUser && currentUser.picture.url;
  const createdBy = currentUser && currentUser.username;
  const createdAt = currentUser && currentUser.createdAt;
  const userToken = currentUser && currentUser.jwt;
  const userId = currentUser && currentUser.id;
  const expenses = project && project.expenses;
  const moneyInvested = project && project.incomes;
  const projectTodos = project && project.project_todos;
  //Extract Params Id
  const projectId = props.match.params.projectId;
  //UseEffect
  useEffect(() => {
    fetchSingleProject(projectId, userToken);
    fetchAllProjectsByUser(userId, userToken);
  }, []);

  const goToExpensesPage = () => {
    props.history.push(`/project/expenses/${projectId}`);
  };

  //Direct to different Page
  const goToCreateProjectTodoPage = () => {
    props.history.push(`/create-todo/${projectId}`);
  };
  const goToIncomePage = () => {
    props.history.push(`/project/income/${projectId}`);
  };

  //Calc Total Income and Expense
  let totalExpenses = "0.0";
  let totalIncome = "0.0";
  let moneyLeft = "0.0";

  //Calc Expenses
  if (expenses !== null && expenses.length > 0) {
    totalExpenses = project.expenses.reduce((acc, current) => {
      return acc + current.amount;
    }, 0);
  }

  //Calc Money Invested
  if (moneyInvested !== null && moneyInvested.length > 0) {
    totalIncome = project.incomes.reduce((acc, current) => {
      return acc + current.amount;
    }, 0);
  }
  moneyLeft = totalIncome - totalExpenses;

  const moneyLeftPercentage = (moneyLeft / totalIncome) * 100;
  const expensesInPercentage = (totalExpenses / totalIncome) * 100;

  //Data for the chart
  const data = [
    {
      name: "Money Invested",

      amount: `${totalIncome}`
    },
    {
      name: "Money Left",
      amount: `${moneyLeft}`
    },
    {
      name: "Money Spent",
      amount: `${totalExpenses}`
    }
  ];

  return (
    <div>
      {/* First Container for project details */}
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
        <Grid item>
          <Button
            variant="outlined"
            color="inherit"
            onClick={goToCreateProjectTodoPage}>
            Add Todo
          </Button>
        </Grid>
      </Grid>
      {/* End of container 1 */}

      {/* Second Container for money details */}
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
            <div
              style={{
                marginBottom: "10px"
              }}>
              <span
                style={{
                  color: "#ffbe76",
                  fontSize: "1.1rem"
                }}>
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
            <span
              style={{
                color: "#ffbe76",
                fontSize: "1.1rem"
              }}>
              In Percentage: {`${moneyLeftPercentage.toFixed(1)} %`}
            </span>
          </Paper>
        </Grid>
      </Grid>
      {/*End of  Second Container for money details */}
      {project === null ? (
        <LoadingComponent />
      ) : (
        // Third container
        <Grid
          container
          direction="row"
          justify="center"
          style={{
            backgroundColor: "#356359"
          }}>
          <Grid
            item
            style={{
              backgroundColor: "#2d3436"
            }}>
            {/* Draggable */}
            <Grid item>
              <h2
                style={{
                  textAlign: "center",
                  color: "#dfe6e9"
                }}>
                Drag your todos to arrange
              </h2>
            </Grid>
            <Grid
              item
              style={{
                textAlign: "center",
                marginBottom: "10px"
              }}>
              <Button
                variant="outlined"
                style={{
                  color: "#dfe6e9",
                  border: "1px solid white"
                }}
                onClick={goToCreateProjectTodoPage}>
                Add Todo
              </Button>
              <p style={{ color: "white" }}>
                Please try to refresh the page after adding your todo, we are
                working to fix this bug
              </p>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                height: "50%"
              }}>
              {/*DRAGGABLE COMPONENT*/}
              <Todos
                projectTodos={projectTodos}
                url={url}
                createdBy={createdBy}
                createdAt={createdAt}
              />
            </Grid>
          </Grid>
          {/* Graph */}
          <Grid
            style={{
              height: "20rem",
              width: "30rem",
              marginTop: "30px",
              marginBottom: "200px"
            }}>
            <h2
              style={{
                textAlign: "center",
                color: "#81ecec"
              }}>
              Graphical view of your expenses and money invested
            </h2>
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#81ecec" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="yellow" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="green"
                  fill="#e84393"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
        // End of charts  container
      )}
      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.singleProject,
    currentUser: state.userAuth.currentUser
  };
};
const actions = {
  fetchSingleProject,
  fetchAllProjectsByUser
};

export default connect(
  mapStateToProps,
  actions
)(PrivateRoute(ProjectsDashboard));
