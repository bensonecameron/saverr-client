import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  updateToken: (newToken: string) => void;
};

type SigninInfo = {
  pageTitle: string;
  descriptionLink: string;
  descriptionText: string;
  signUpURL: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  isLoading?: any; // I don't know what type it is if we mark as null so I used any
};

export default class Signup extends React.Component<AcceptedProps, SigninInfo> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      pageTitle: "Sign Up",
      descriptionLink: "/signin",
      descriptionText: "Have an account?",
      signUpURL: `${APIURL}/user/signup`,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      isLoading: "",
    };
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`${APIURL}/user/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          userName: this.state.userName,
          password: this.state.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.sessionToken) {
          this.props.updateToken(res.sessionToken);
        }
      });
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{this.state.pageTitle}</h1>
              <p className="text-xs-center">
                <Link to="/signin">{this.state.descriptionText}</Link>
              </p>
              <form
                onSubmit={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={(e) => {
                        this.setState({ lastName: e.target.value });
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={this.state.userName}
                      onChange={(e) => {
                        this.setState({ userName: e.target.value });
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    {this.state.pageTitle}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
