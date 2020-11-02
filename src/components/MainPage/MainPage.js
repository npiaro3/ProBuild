import React from "react";
import Introduction from "./Introduction";
import Services from "./Services";
import Footer from "../Footer";
import Importances from "./Importances";
import Menu from "./Menu";
import GetStarted from "./GetStarted";
import ContactInfo from "./ContactInfo";

function MainPage() {
    return (
        <React.Fragment>
            <Menu />
            <Introduction />
            <Services />
            <Importances />
            <GetStarted />
            <ContactInfo />
            <Footer />
        </React.Fragment>
    );
}

export default MainPage;
