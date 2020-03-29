import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Theme from "./config/Theme";

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
import {
  setCurrentUser,
  getMyProfile
} from "./redux/actions/users/usersActions";
import { connect } from "react-redux";
import ProjectTodosForm from "./components/Forms/ProjectTodos/ProjectTodosForm";
import AboutMe from "./components/Pages/AboutMe";
import MenuDashboard from "./components/Navbar/MenuDashboard";
import WhatWeCanDoForYou from "./components/Pages/WhatWeCanDoForYou";
import CustomeSoftwareDevelopment from "./components/Pages/CustomeSoftwareDevelopment";
import StudyWithMe from "./components/Pages/StudyWithMe";
import ExpensesCommentsForm from "./components/Forms/Comments/ExpensesCommentsForm";

const App = (props) => {
  const { setCurrentUser, getMyProfile, userAuth } = props;
  const id = userAuth && userAuth._id;

  useEffect(() => {
    setCurrentUser();

    // getMyProfile(id);
  }, [setCurrentUser, id, getMyProfile]);

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        {/* <NavbarDashboard /> */}
        <MenuDashboard />
        <Switch>
          <Route exact path="/" component={Home} />
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

          <Route
            exact
            path="/create-todo/:projectId"
            component={ProjectTodosForm}
          />
          <Route exact path="/about-me" component={AboutMe} />
          <Route
            exact
            path="/what-this-app-can-do"
            component={WhatWeCanDoForYou}
          />
          <Route
            exact
            path="/customsoftware"
            component={CustomeSoftwareDevelopment}
          />
          <Route exact path="/study" component={StudyWithMe} />
          <Route exact path="/aboutme" component={AboutMe} />

          <Route
            exact
            path="/project/expenses/:expenseId/create-comment"
            component={ExpensesCommentsForm}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const actions = {
  setCurrentUser,
  getMyProfile
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userAuth.currentUser
  };
};
export default connect(mapStateToProps, actions)(App);
