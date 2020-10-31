import React from "react";
import Introduction from "./Introduction";
import Services from "./Services";
import StickyFooter from "./StickyFooter";
import Importances from "./Importances";
import Menu from "./Menu";

function App() {
  return (
    <React.Fragment>
      <Menu />
      <Introduction />
      <Services />
      <Importances />
      <StickyFooter />
    </React.Fragment>
  );
}

export default App;
