import React from "react";
import { Switch, Route } from "react-router-dom";

//import components
import { HomePage, NotFoundPage, MainLayout } from "./components";

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/:page?" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MainLayout>
  );
}

export default App;
