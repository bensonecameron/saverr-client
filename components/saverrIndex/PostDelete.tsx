import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CollectionType, PostType } from "../types/Types";
import Collections from "../../pages/collections/Collections";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  fetchUser: () => void;
};

type PostDelState = {
  id: any;
};

export default class PostDelete extends React.Component<
  AcceptedProps,
  PostDelState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/post/${this.state.id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDg2NDgyLCJleHAiOjE2MDAxNzI4ODJ9.CSXjRYS4Bz4Zo-Fdlags5h-Lf8Nxp7Kp9LNtxklalUE",
      },
      body: JSON.stringify({
        id: this.state.id,
      }),
    }).then((res) => res.json());
  }

  render() {
    return (
      <div className="auth-page">
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <fieldset>
            <fieldset>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Post ID To Delete"
                onChange={(e) => {
                  this.setState({ id: e.target.value });
                }}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
            >
              Delete Post
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}