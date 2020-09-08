import React from "react";
import { NavLink, Link, Route } from "react-router-dom";
import Logout from "../pages/auth/Logout";

type AcceptedProps = {
  clearToken: () => void;
};

export default class Topbar extends React.Component<AcceptedProps> {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Saverr
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                onClick={() => this.props.clearToken()}
                id="logout"
              >
                Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <Route path="/logout">
                <Logout clearToken={this.props.clearToken} />
              </Route>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
