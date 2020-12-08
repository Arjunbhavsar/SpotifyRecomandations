import React,{ Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import AboutUs from "views/Components/Sections/Aboutus.js"
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Commonplots from "views/Components/Sections/Commonplots.js";
import UserDataPlots from "./Components/Sections/UserDataPlots.js";

var hist = createBrowserHistory();

export default function Routes(props) {

    
    const { ...rest } = props;      
    return (
        <Router history={hist}>
            <Header
                brand="Spotify Recomendation System"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />
            <Switch>
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/login-page"   component={LoginPage} />
            <Route path="/aboutus"      component={AboutUs} />
            <Route path="/commonPlots"  component={Commonplots} />
            <Route path="/userVisuals"  component={UserDataPlots} />
            <Route path="/"             component={Components} />
            </Switch>

        </Router>
    );
}


// export default Routes