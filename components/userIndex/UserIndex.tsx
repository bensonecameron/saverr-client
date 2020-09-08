import React, { FormEvent } from "react";
import sessionToken from "../Topbar";
import { UserType } from "../types/Types";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  Row,
  Col,
} from "reactstrap";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
};

type UserState = {
  user: UserType;
};

export default class UserIndex extends React.Component<
  AcceptedProps,
  UserState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      user: {
        userName: "",
      },
    };
  }

  fetchUser() {
    let user = this.state.user;
    this.setState({ user: user });

    fetch(`${APIURL}/user/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res:", res);
        if (res.id) {
          this.setState({
            user: {
              userName: res.user.userName,
            },
          });
        }
      });
  }

  componentWillMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page"></div>
      </div>
    );
  }
}
