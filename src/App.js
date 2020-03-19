import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavbarDashboard from "./components/Navbar/NavbarDashboard/NavbarDashboard";
import ProjectLists from "./components/Projects/ProjectLists";

function App() {
  return (
    <BrowserRouter>
      <NavbarDashboard />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={ProjectLists} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
