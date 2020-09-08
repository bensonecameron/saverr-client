import React, { FormEvent, ChangeEvent } from "react";
import { Form, FormGroup, Label, Row, Col, Button, Input } from "reactstrap";
import { useHistory, BrowserRouter, Redirect } from "react-router-dom";
import reactRouter from "react-router-dom";
import {
  CollectionType,
  PostType,
  UserType,
} from "../../components/types/Types";

type AcceptedProps = {
  sessionToken: string;
  clearToken: () => void;
  fetchUser: () => void;

  user: UserType;
};

export default class User extends React.Component<AcceptedProps> {
  render() {
    return <div>User Info</div>;
  }
}
