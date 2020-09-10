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

  fetchUserInfo() {
    let user = this.state.user;
    this.setState({ user: user });

    fetch(`${APIURL}/user/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NTg2NzcxLCJleHAiOjE1OTk2NzMxNzF9.73IVxTxJ8WT7VV8yo_n42EAzGH70HezON3iEV0ZEEfw",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("User Info fetch res", res);
        console.log("User Info fetch res", res);
        if (res.id) {
          this.setState({
            user: {
              userName: res.user.userName,
            },
          });
          console.log("props from user index:", this.props);
          console.log("props from user index:", this.props);
        }
      });
  }

  componentWillMount() {
    this.fetchUserInfo();
  }

  render() {
    return (
      <div className="">
        <div className="">{this.state.user.userName}</div>
      </div>
    );
  }
}
