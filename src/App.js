import React, {Component} from 'react';
import UserProfile from './pages/Account/UserProfile';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import AuthPage from "./pages/Authentication/AuthPage";
import {AuthService} from "./services/services";
import {Employee} from "./pages/Employee";
import Home from "./pages/Home";
import DepList from "./pages/Department/DepList";
import DepEdit from "./pages/Department/DepEdit";
import ProjectList from "./pages/Project/ProjectList";
import ProjectEdit from "./pages/Project/ProjectEdit";
import ReportList from "./pages/Report/ReportList";
import ReportEdit from "./pages/Report/ReportEdit";
import MiniDrawer from "./component/Drawer";
import Group from "./pages/Group/Group";
import AccSettings from "./pages/Account/AccSettings";


export default class App extends Component {
    render() {
        if (!AuthService.isLoggedIn())
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={AuthPage}/>
                    </Switch>
                </BrowserRouter>
            )
        else
            return (
                <BrowserRouter>
                    <MiniDrawer contents={(
                        <div>
                            <Switch>
                                <PrivateRoute exact path="/" component={Link}> <Home/> </PrivateRoute>
                                <PrivateRoute exact path="/department" component={Link}> <DepList/> </PrivateRoute>
                                <PrivateRoute exact path="/department/:depId" component={Link}> <DepEdit/> </PrivateRoute>
                                <PrivateRoute exact path="/project" component={Link}><ProjectList/></PrivateRoute>
                                <PrivateRoute exact path="/project/:projectId" component={Link}><ProjectEdit/></PrivateRoute>
                                <PrivateRoute exact path="/report" component={Link}><ReportList/></PrivateRoute>
                                <PrivateRoute exact path="/report/:reportId" component={Link}><ReportEdit/></PrivateRoute>
                                <PrivateRoute exact path="/group" component={Link}><Group/></PrivateRoute>
                                <Route exact path="/profile/:userId" component={Link}><UserProfile/></Route>
                                <Route exact path="/settings" component={Link}><AccSettings/></Route>
                            </Switch>
                        </div>
                    )}/>
                </BrowserRouter>
        );
    }
}