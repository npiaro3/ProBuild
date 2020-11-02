import React from "react";
import Footer from "../Footer";
import DatabaseMenu from "./DatabaseMenu";
import DatabasePageLayout from "./DatabasePageLayout";

export default function DatabasePage() {
    return (
        <React.Fragment>
            <DatabaseMenu />
            <DatabasePageLayout />
            <Footer />
        </React.Fragment>
    );
}
