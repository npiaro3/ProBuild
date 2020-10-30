import { Container } from "@material-ui/core";
import React from "react";
import Header from "./Header";
import Introduction from "./Introduction";
import Services from "./Services";
import StickyFooter from "./StickyFooter";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Introduction />
      <Services />
      <StickyFooter />
    </React.Fragment>
  );
}

export default App;
