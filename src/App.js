import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Theme from "./config/Theme";
import NavbarDashboard from "./components/Navbar/NavbarDashboard/NavbarDashboard";
import ProjectLists from "./components/Projects/ProjectLists";
import ProjectExpensesList from "./components/Expenses/ProjectExpensesList";
import ProjectsDashboard from "./components/Projects/ProjectsDashboard";
import ProjectIncomeList from "./components/Income/ProjectIncomeList";
import CreateIncomeForm from "./components/Forms/Income/CreateIncomeForm";
import CreateExpensesForm from "./components/Forms/Expenses/CreateExpensesForm";
import CreateProjectForm from "./components/Forms/Projects/CreateProjectForm";
import Home from "./components/HomePage/Home";
import RegisterUser from "./components/Forms/Users/RegisterUser";
import LoginUser from "./components/Forms/Users/LoginUser";
import { setCurrentUser } from "./redux/actions/users/usersActions";
import { connect } from "react-redux";
import Uploader from "./components/Uploader";

const App = (props) => {
  const { setCurrentUser } = props;
  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <NavbarDashboard />
        <Switch>
          <Route exact path="/" component={Uploader} />
          <Route exact path="/projects" component={ProjectLists} />

          <Route exact path="/register" component={RegisterUser} />

          <Route exact path="/login" component={LoginUser} />

          <Route
            exact
            path="/project/expenses/:projectId"
            component={ProjectExpensesList}
          />

          <Route
            exact
            path="/project/income/:projectId"
            component={ProjectIncomeList}
          />

          <Route
            exact
            path="/project/dashboard/:projectId"
            component={ProjectsDashboard}
          />

          <Route
            exact
            path="/projects/create-project"
            component={CreateProjectForm}
          />

          <Route
            exact
            path="/projects/create-income/:projectId"
            component={CreateIncomeForm}
          />

          <Route
            exact
            path="/projects/create-expense/:projectId"
            component={CreateExpensesForm}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const actions = {
  setCurrentUser
};

export default connect(null, actions)(App);
