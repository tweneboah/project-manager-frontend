import React from "react";
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

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <NavbarDashboard />
        <Switch>
          <Route exact path="/projects" component={ProjectLists} />

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

export default App;
