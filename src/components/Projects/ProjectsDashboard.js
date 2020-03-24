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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import {
  fetchAllProjects,
  fetchSingleProject
} from "../../redux/actions/projects/projectsActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import { API_URL } from "../../config/URLs";
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
  //Props
  const { fetchSingleProject, project, profile } = props;
  //Grab image url of the user
  const url = profile && profile.image[0].url;
  //Extract Params Id
  const projectId = props.match.params.projectId;
  //UseEffect
  useEffect(() => {
    fetchSingleProject(projectId);
  }, [projectId, fetchSingleProject]);

  // Draggable
  //Grab the project Todos and put them into state
  const itemsFromBackend = project && project.project_todos;

  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      items: itemsFromBackend
        ? itemsFromBackend
        : [{ id: "533", content: "Loading" }]
    },
    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Done",
      items: []
    }
  };
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  //CSS CLASS
  const classes = useStyles();

  // const [todos, settodos] = useState(projectTodos);
  // const [columns, setColumns] = useState(columnsFromBackend);

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
            variant="contained"
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
          style={{ backgroundColor: "#356359" }}>
          <Grid
            item
            style={{
              backgroundColor: "#F39C9E"
            }}>
            {/* Draggable */}
            <Grid item>
              <h2 style={{ textAlign: "center" }}>
                Drag your todos to arrange
              </h2>
            </Grid>
            <Grid item style={{ textAlign: "center", marginBottom: "10px" }}>
              <Button
                variant="contained"
                style={{ color: "#dfe6e9", background: "#d63031" }}
                onClick={goToCreateProjectTodoPage}>
                Add Todo
              </Button>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                height: "50%"
              }}>
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#035449"
                      }}
                      key={columnId}>
                      <h2 style={{ color: "#81ecec" }}>{column.name}</h2>
                      <div style={{ margin: 8 }}>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  background: snapshot.isDraggingOver
                                    ? "#F39C9E"
                                    : "#5F7974",
                                  padding: 4,
                                  width: 250,
                                  minHeight: "30rem"
                                }}>
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}>
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",
                                              paddingTop: 20,
                                              margin: "0 0 8px 0",
                                              minHeight: "3rem",
                                              backgroundColor: snapshot.isDragging
                                                ? "#263B4A"
                                                : "#456C86",
                                              color: "white",
                                              textAlign: "center",
                                              ...provided.draggableProps.style
                                            }}>
                                            {/* Draggable items */}
                                            {item.content}
                                            <div>
                                              <img
                                                className={
                                                  classes.profilePicture
                                                }
                                                alt="profile"
                                                src={`${API_URL}/${url}`}
                                              />
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </Grid>
          </Grid>
          <Grid
            style={{
              height: "20rem",
              width: "30rem",
              marginTop: "30px"
            }}>
            <h1 style={{ textAlign: "center", color: "#81ecec" }}>
              Project Description
            </h1>
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
    profile: state.userAuth.myProfile
  };
};
const actions = {
  fetchAllProjects,
  fetchSingleProject
};

export default connect(
  mapStateToProps,
  actions
)(PrivateRoute(ProjectsDashboard));
